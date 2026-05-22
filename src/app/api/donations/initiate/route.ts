import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const ESPEES_API_KEY = process.env.ESPEES_API_KEY;
const ESPEES_MERCHANT_WALLET = process.env.ESPEES_MERCHANT_WALLET;

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, phone, country, amount, currency, method, campaignId, frequency } = await req.json();

    if (!email || !amount || !method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. User Management: Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const temporaryPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
      
      user = await prisma.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
          password: hashedPassword,
          role: 'USER',
          isTemporary: true,
          profile: {
            create: {
              firstName,
              lastName,
              phone,
              country,
              status: 'Pending',
            }
          }
        },
      });
    }

    // 2. Initiate Payment with Provider
    let paymentData: any = null;
    let reference = `VMC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    let finalAmount = parseFloat(amount);
    let finalCurrency = currency || 'USD';

    if (method === 'PAYSTACK') {
      const conversionRate = 1500;
      finalAmount = finalAmount * conversionRate;
      finalCurrency = 'NGN';

      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: Math.round(finalAmount * 100), // Paystack expects amount in kobo
          currency: 'NGN',
          reference,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/give/verify`,
          metadata: {
            campaignId,
            userId: user.id,
            frequency,
            original_amount: amount,
            original_currency: currency || 'USD',
          }
        }),
      });

      const result = await response.json();
      if (!result.status) {
        throw new Error(result.message || 'Paystack initialization failed');
      }
      paymentData = result.data;
      reference = result.data.reference;
    } else if (method === 'ESPEES' || method === 'KINGSPAY') {
      const response = await fetch('https://api.espees.org/v2/payment/product', {
        method: 'POST',
        headers: {
          'x-api-key': ESPEES_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_wallet: ESPEES_MERCHANT_WALLET,
          product_sku: reference,
          narration: `Donation to ${campaignId || 'VMC Project'}`,
          price: amount, // Espees expects price in ESP
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/give/verify?ref=${reference}`,
          fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/give?error=payment_failed`,
        }),
      });

      const result = await response.json();
      if (result.status !== 'success' && !result.payment_ref) {
        throw new Error(result.message || 'Espees initialization failed');
      }
      paymentData = {
        authorization_url: `https://payment.espees.org/pay/${result.payment_ref}`,
        reference: result.payment_ref
      };
      reference = result.payment_ref;
    } else {
      return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
    }

    // 3. Create Pending Donation Record
    await prisma.donation.create({
      data: {
        userId: user.id,
        campaignId: campaignId || null,
        amount: finalAmount,
        currency: finalCurrency,
        status: 'PENDING',
        method: method,
        reference: reference,
        metadata: {
          frequency,
          provider_data: paymentData,
          original_amount: amount,
          original_currency: currency || 'USD',
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      authorization_url: paymentData.authorization_url,
      reference 
    });

  } catch (error: any) {
    console.error('Donation initiation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

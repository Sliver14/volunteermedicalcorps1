import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const ESPEES_API_KEY = process.env.ESPEES_API_KEY;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('ref');

    if (!reference) {
      return NextResponse.json({ error: 'Reference required' }, { status: 400 });
    }

    // Find the pending donation
    const donation = await prisma.donation.findUnique({
      where: { reference },
      include: { user: true, campaign: true }
    });

    if (!donation) {
      return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
    }

    if (donation.status === 'SUCCESS') {
      return NextResponse.json({ success: true, status: 'SUCCESS' });
    }

    let isSuccess = false;
    let providerResponse: any = null;

    if (donation.method === 'PAYSTACK') {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      });
      const result = await response.json();
      providerResponse = result;
      if (result.status && result.data.status === 'success') {
        isSuccess = true;
      }
    } else if (donation.method === 'ESPEES' || donation.method === 'KINGSPAY') {
      const response = await fetch('https://api.espees.org/v2/payment/confirm/', {
        method: 'POST',
        headers: {
          'x-api-key': ESPEES_API_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_ref: reference }),
      });
      const result = await response.json();
      providerResponse = result;
      if (result.status === 'APPROVED') {
        isSuccess = true;
      }
    }

    if (isSuccess) {
      // Update Donation status
      await prisma.donation.update({
        where: { reference },
        data: {
          status: 'SUCCESS',
          metadata: {
            ...((donation.metadata as any) || {}),
            verification_response: providerResponse,
            verified_at: new Date().toISOString()
          }
        }
      });

      // Update Campaign raised amount
      if (donation.campaignId) {
        await prisma.campaign.update({
          where: { id: donation.campaignId },
          data: {
            raised: {
              increment: donation.amount
            }
          }
        });
      }

      return NextResponse.json({ success: true, status: 'SUCCESS' });
    }

    return NextResponse.json({ success: false, status: providerResponse?.status || 'PENDING' });

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

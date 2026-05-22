import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

const PAYSTACK_WEBHOOK_SECRET = process.env.PAYSTACK_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature || !PAYSTACK_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const { reference, metadata } = event.data;

      // Update Donation status
      const donation = await prisma.donation.update({
        where: { reference },
        data: {
          status: 'SUCCESS',
          metadata: {
            ...event.data,
            webhook_processed_at: new Date().toISOString()
          }
        },
        include: {
          campaign: true
        }
      });

      // Update Campaign raised amount
      if (donation.campaignId && donation.campaign) {
        await prisma.campaign.update({
          where: { id: donation.campaignId },
          data: {
            raised: {
              increment: donation.amount
            }
          }
        });
      }

      console.log(`Payment successful for reference: ${reference}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

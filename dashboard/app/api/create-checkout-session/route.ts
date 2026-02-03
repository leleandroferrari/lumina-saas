import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover' as any,
})

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { priceId } = await req.json()

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${req.headers.get('origin')}/dashboard?success=true`,
            cancel_url: `${req.headers.get('origin')}/dashboard/subscription?canceled=true`,
            metadata: {
                userId: user.id,
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error: any) {
        console.error('Stripe checkout error:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Sparkles, Zap, Loader2 } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

const plans = [
    {
        name: 'Free',
        price: 'CHF 0',
        period: 'forever',
        description: 'Perfect for getting started',
        features: [
            { text: '10 tasks per month', included: true },
            { text: '5 notes per month', included: true },
            { text: '3 avatar options', included: true },
            { text: '2 theme options', included: true },
            { text: 'Basic support', included: true },
            { text: 'Unlimited tasks', included: false },
            { text: 'Unlimited notes', included: false },
            { text: 'All avatars', included: false },
            { text: 'All themes', included: false },
            { text: 'Priority support', included: false },
            { text: 'Advanced analytics', included: false },
            { text: 'Export data', included: false }
        ],
        cta: 'Current Plan',
        highlighted: false,
        current: true
    },
    {
        name: 'Pro',
        price: 'CHF 17',
        period: 'per month',
        description: 'Unlock your full potential',
        features: [
            { text: 'Unlimited tasks', included: true },
            { text: 'Unlimited notes', included: true },
            { text: 'All 9 avatar options', included: true },
            { text: 'All 6 premium themes', included: true },
            { text: 'Priority support', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'Export to PDF/CSV', included: true },
            { text: 'Collaboration features', included: true },
            { text: 'Custom branding', included: true },
            { text: 'API access', included: true },
            { text: 'Early access to features', included: true },
            { text: 'No ads', included: true }
        ],
        cta: 'Upgrade to Pro',
        highlighted: true,
        current: false
    }
]

export default function SubscriptionPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
    const [loading, setLoading] = useState(false)
    const { themeGradient } = useTheme()

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: 'price_1SwjxtRl2WlFryYdb1RPRW69'
                }),
            })

            const { url } = await response.json()

            if (url) {
                window.location.href = url
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Failed to start checkout. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getProPrice = () => {
        if (billingCycle === 'annual') {
            return { price: 'CHF 170', period: 'per year', savings: 'Save CHF 34/year' }
        }
        return { price: 'CHF 17', period: 'per month', savings: null }
    }

    const proPrice = getProPrice()

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Upgrade Your Experience
                </div>
                <h1 className="text-4xl font-bold">Choose Your Plan</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Unlock unlimited productivity with Lumina Pro. Get access to all features and premium support.
                </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'monthly'
                            ? 'bg-background shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('annual')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'annual'
                            ? 'bg-background shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Annual
                        <span className="ml-2 text-xs text-green-600 font-semibold">Save 17%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <Card className="relative">
                    <CardHeader>
                        <CardTitle className="text-2xl">{plans[0].name}</CardTitle>
                        <CardDescription>{plans[0].description}</CardDescription>
                        <div className="pt-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold">{plans[0].price}</span>
                                <span className="text-muted-foreground">/{plans[0].period}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            {plans[0].features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${feature.included ? 'text-green-600' : 'text-muted-foreground'}`}>
                                        {feature.included ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <span className="w-5 h-5 flex items-center justify-center text-xs">—</span>
                                        )}
                                    </div>
                                    <span className={feature.included ? 'text-foreground' : 'text-muted-foreground line-through'}>
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full" disabled>
                            Current Plan
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card
                    className="relative border-2 shadow-xl"
                    style={{
                        borderColor: themeGradient.from,
                        background: `linear-gradient(135deg, ${themeGradient.from}08 0%, ${themeGradient.to}08 100%)`
                    }}
                >
                    <div
                        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold flex items-center gap-1"
                        style={{
                            background: `linear-gradient(135deg, ${themeGradient.from} 0%, ${themeGradient.to} 100%)`
                        }}
                    >
                        <Zap className="w-4 h-4" />
                        MOST POPULAR
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">{plans[1].name}</CardTitle>
                        <CardDescription>{plans[1].description}</CardDescription>
                        <div className="pt-4">
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold">{proPrice.price}</span>
                                <span className="text-muted-foreground">/{proPrice.period}</span>
                            </div>
                            {proPrice.savings && (
                                <p className="text-sm text-green-600 font-medium mt-1">{proPrice.savings}</p>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            {plans[1].features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="text-green-600 mt-0.5">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="text-foreground font-medium">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button
                            className="w-full text-white font-semibold"
                            style={{
                                background: `linear-gradient(135deg, ${themeGradient.from} 0%, ${themeGradient.to} 100%)`
                            }}
                            onClick={handleUpgrade}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Upgrade to Pro'
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto pt-12">
                <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Yes! You can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">What happens to my data if I downgrade?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Your data is always safe. If you downgrade to Free, you'll keep all your existing tasks and notes, but you won't be able to create new ones beyond the free tier limits.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                We offer a 30-day money-back guarantee. If you're not satisfied with Lumina Pro, contact us within 30 days for a full refund.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

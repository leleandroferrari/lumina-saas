'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTheme, themes } from '@/lib/theme-context'
import { Check } from 'lucide-react'

const avatarOptions = [
    { seed: 'felix', emoji: '🐱', name: 'Felix' },
    { seed: 'max', emoji: '🐶', name: 'Max' },
    { seed: 'luna', emoji: '🦊', name: 'Luna' },
    { seed: 'charlie', emoji: '🐻', name: 'Charlie' },
    { seed: 'bella', emoji: '🐰', name: 'Bella' },
    { seed: 'oliver', emoji: '🦁', name: 'Oliver' },
    { seed: 'lucy', emoji: '🐼', name: 'Lucy' },
    { seed: 'milo', emoji: '🐨', name: 'Milo' },
    { seed: 'daisy', emoji: '🦄', name: 'Daisy' }
]

const themeOptions = [
    { id: 'indigo', name: 'Indigo Dream', colors: ['bg-indigo-500', 'bg-pink-500'] },
    { id: 'teal', name: 'Teal Ocean', colors: ['bg-teal-500', 'bg-blue-500'] },
    { id: 'sunset', name: 'Sunset Rose', colors: ['bg-red-500', 'bg-orange-500'] },
    { id: 'forest', name: 'Forest Green', colors: ['bg-green-700', 'bg-yellow-500'] },
    { id: 'purple', name: 'Deep Purple', colors: ['bg-purple-500', 'bg-teal-500'] },
    { id: 'midnight', name: 'Midnight Black', colors: ['bg-black', 'bg-indigo-500'] }
]

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null)
    const { currentTheme, avatarSeed, setTheme, setAvatar } = useTheme()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [supabase])

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">System Settings</h1>
                <p className="text-muted-foreground">Manage preferences and visual themes</p>
            </div>

            {/* Avatar Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Choose Your Avatar</CardTitle>
                    <CardDescription>Select a fun character to represent you</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                        {avatarOptions.map((avatar) => (
                            <button
                                key={avatar.seed}
                                onClick={() => setAvatar(avatar.seed)}
                                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${avatarSeed === avatar.seed
                                        ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="text-4xl mb-2">{avatar.emoji}</div>
                                <p className="text-xs font-medium text-center">{avatar.name}</p>
                                {avatarSeed === avatar.seed && (
                                    <div className="mt-2 flex justify-center">
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                            <Check className="w-3 h-3 text-primary-foreground" />
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Visual Theme */}
            <Card>
                <CardHeader>
                    <CardTitle>Visual Theme</CardTitle>
                    <CardDescription>Customize the look and feel of your workspace</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {themeOptions.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => setTheme(theme.id)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${currentTheme === theme.id
                                        ? 'border-primary ring-2 ring-primary'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                <div className="flex gap-2 mb-2">
                                    {theme.colors.map((color, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full ${color}`}></div>
                                    ))}
                                </div>
                                <p className="text-sm font-medium">{theme.name}</p>
                                {currentTheme === theme.id && (
                                    <p className="text-xs text-primary mt-1 font-semibold">CURRENTLY ACTIVE</p>
                                )}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Email Address</p>
                            <p className="text-sm font-medium mt-1">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Membership</p>
                            <p className="text-sm font-medium mt-1">Pro (Annual Billing)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

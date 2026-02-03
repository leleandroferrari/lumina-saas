'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutDashboard, CheckSquare, FileText, Settings, Bell, Search, LogOut, CreditCard } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme-context'

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'Notes', href: '/dashboard/notes', icon: FileText },
    { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const avatarEmojis: Record<string, string> = {
    felix: '🐱',
    max: '🐶',
    luna: '🦊',
    charlie: '🐻',
    bella: '🐰',
    oliver: '🦁',
    lucy: '🐼',
    milo: '🐨',
    daisy: '🦄',
    default: '👤'
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [user, setUser] = useState<any>(null)
    const { avatarSeed } = useTheme()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [supabase])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const userInitials = user?.user_metadata?.full_name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase() || 'U'

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold">L</span>
                        </div>
                        <span className="text-xl font-bold">Lumina</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </a>
                        )
                    })}
                </nav>

                {/* Plan Badge */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Plan</p>
                            <p className="text-sm font-semibold">Pro Member</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                            VIP
                        </span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="border-b border-border bg-card">
                    <div className="px-8 py-4 flex items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search everything..."
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <Bell className="w-5 h-5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{user?.user_metadata?.full_name || 'User'}</p>
                                            <p className="text-xs text-muted-foreground">Design Manager</p>
                                        </div>
                                        <Avatar>
                                            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                                {avatarEmojis[avatarSeed] || avatarEmojis.default}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

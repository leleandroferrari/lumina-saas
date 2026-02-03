'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'

type Theme = {
    name: string
    colors: {
        primary: string
        secondary: string
    }
    gradient: {
        from: string
        to: string
    }
}

const themes: Record<string, Theme> = {
    indigo: {
        name: 'Indigo Dream',
        colors: { primary: 'oklch(0.55 0.22 280)', secondary: 'oklch(0.65 0.18 280)' },
        gradient: { from: '#ec4899', to: '#f97316' }
    },
    teal: {
        name: 'Teal Ocean',
        colors: { primary: 'oklch(0.55 0.15 195)', secondary: 'oklch(0.65 0.12 195)' },
        gradient: { from: '#14b8a6', to: '#3b82f6' }
    },
    sunset: {
        name: 'Sunset Rose',
        colors: { primary: 'oklch(0.55 0.22 25)', secondary: 'oklch(0.65 0.18 40)' },
        gradient: { from: '#ef4444', to: '#f97316' }
    },
    forest: {
        name: 'Forest Green',
        colors: { primary: 'oklch(0.45 0.15 145)', secondary: 'oklch(0.55 0.12 145)' },
        gradient: { from: '#15803d', to: '#eab308' }
    },
    purple: {
        name: 'Deep Purple',
        colors: { primary: 'oklch(0.50 0.22 300)', secondary: 'oklch(0.60 0.18 300)' },
        gradient: { from: '#a855f7', to: '#14b8a6' }
    },
    midnight: {
        name: 'Midnight Black',
        colors: { primary: 'oklch(0.25 0.05 280)', secondary: 'oklch(0.35 0.08 280)' },
        gradient: { from: '#000000', to: '#6366f1' }
    }
}

type ThemeContextType = {
    currentTheme: string
    avatarSeed: string
    themeGradient: { from: string; to: string }
    setTheme: (theme: string) => Promise<void>
    setAvatar: (seed: string) => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState('indigo')
    const [avatarSeed, setAvatarSeed] = useState('default')
    const [themeGradient, setThemeGradient] = useState({ from: '#ec4899', to: '#f97316' })
    const supabase = createClient()

    useEffect(() => {
        loadUserPreferences()
    }, [])

    useEffect(() => {
        applyTheme(currentTheme)
    }, [currentTheme])

    const loadUserPreferences = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: profile } = await supabase
            .from('profiles')
            .select('theme, avatar_seed')
            .eq('id', user.id)
            .single()

        if (profile) {
            const themeName = profile.theme || 'indigo'
            setCurrentTheme(themeName)
            setAvatarSeed(profile.avatar_seed || 'default')
            setThemeGradient(themes[themeName].gradient)
        }
    }

    const applyTheme = (themeName: string) => {
        const theme = themes[themeName]
        if (!theme) return

        const root = document.documentElement

        // Force immediate update by removing transition temporarily
        root.style.transition = 'none'
        root.style.setProperty('--primary', theme.colors.primary)
        root.style.setProperty('--secondary', theme.colors.secondary)

        // Re-enable transitions after a brief moment
        setTimeout(() => {
            root.style.transition = ''
        }, 50)

        setThemeGradient(theme.gradient)
    }

    const setTheme = async (themeName: string) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                theme: themeName
            })

        setCurrentTheme(themeName)
    }

    const setAvatar = async (seed: string) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                avatar_seed: seed
            })

        setAvatarSeed(seed)
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, avatarSeed, themeGradient, setTheme, setAvatar }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

export { themes }

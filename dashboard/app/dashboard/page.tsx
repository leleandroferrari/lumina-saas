'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

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

type Task = {
    id: string
    title: string
    status: string
    priority: string
}

type Note = {
    id: string
    title: string
    content: string | null
    color: string
    updated_at: string
}

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [notes, setNotes] = useState<Note[]>([])
    const [taskStats, setTaskStats] = useState({ total: 0, completed: 0 })
    const { avatarSeed, themeGradient } = useTheme()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [supabase])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        // Load recent tasks
        const { data: tasksData } = await supabase
            .from('tasks')
            .select('*')
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(3)

        if (tasksData) setTasks(tasksData)

        // Load task stats
        const { data: allTasks } = await supabase
            .from('tasks')
            .select('status')

        if (allTasks) {
            setTaskStats({
                total: allTasks.length,
                completed: allTasks.filter(t => t.status === 'completed').length
            })
        }

        // Load recent notes
        const { data: notesData } = await supabase
            .from('notes')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(3)

        if (notesData) setNotes(notesData)
    }

    const userInitials = user?.user_metadata?.full_name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase() || 'U'

    const completionPercentage = taskStats.total > 0
        ? Math.round((taskStats.completed / taskStats.total) * 100)
        : 0

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700'
            case 'medium': return 'bg-blue-100 text-blue-700'
            case 'low': return 'bg-gray-100 text-gray-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getNoteColorClass = (color: string) => {
        const colors: Record<string, string> = {
            yellow: 'bg-yellow-100',
            green: 'bg-green-100',
            blue: 'bg-blue-100',
            pink: 'bg-pink-100',
            purple: 'bg-purple-100'
        }
        return colors[color] || 'bg-yellow-100'
    }

    return (
        <div className="p-8 space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold">Welcome, {user?.user_metadata?.full_name?.split(' ')[0] || 'there'}</h1>
                <p className="text-muted-foreground">Your personal dashboard overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Card */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                                    {avatarEmojis[avatarSeed] || avatarEmojis.default}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{user?.user_metadata?.full_name || 'User'}</h3>
                                <p className="text-sm text-muted-foreground">Design Manager</p>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    <div>
                                        <span className="font-semibold">{taskStats.total}</span>
                                        <span className="text-muted-foreground ml-1">TASKS</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">{notes.length}</span>
                                        <span className="text-muted-foreground ml-1">NOTES</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Task Completion */}
                <Card
                    className="border-0"
                    style={{
                        background: `linear-gradient(135deg, ${themeGradient.from} 0%, ${themeGradient.to} 100%)`
                    }}
                >
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/70 uppercase tracking-wide">Task Completion</p>
                                <p className="text-5xl font-bold text-white mt-2">{completionPercentage}%</p>
                                <p className="text-sm text-white/70 mt-1">
                                    {taskStats.completed} of {taskStats.total} completed
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                    <span className="text-2xl">📊</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Tasks & Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Tasks */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-primary">📋</span>
                                    Recent Tasks
                                </CardTitle>
                                <CardDescription>Prioritize your workflow</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/dashboard/tasks'}>
                                VIEW ALL <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {tasks.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p className="text-sm">No tasks yet</p>
                                <p className="text-xs mt-1">Create your first task to get started</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                                    onClick={() => window.location.href = '/dashboard/tasks'}
                                >
                                    <div className="w-5 h-5 rounded border-2 border-primary bg-primary/10"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{task.title}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}>
                                        {task.priority.toUpperCase()}
                                    </span>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Latest Notes */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-yellow-500" />
                                    Latest Notes
                                </CardTitle>
                                <CardDescription>Recent thoughts</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/dashboard/notes'}>
                                VIEW ALL NOTES
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {notes.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p className="text-sm">No notes yet</p>
                                <p className="text-xs mt-1">Capture your first idea</p>
                            </div>
                        ) : (
                            notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                                    onClick={() => window.location.href = '/dashboard/notes'}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-3 h-3 rounded-full ${getNoteColorClass(note.color)} mt-1`}></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{note.title}</p>
                                            {note.content && (
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.content}</p>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(note.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

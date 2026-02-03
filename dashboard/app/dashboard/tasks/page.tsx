'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'

type Task = {
    id: string
    title: string
    status: 'active' | 'completed'
    priority: 'low' | 'medium' | 'high'
    created_at: string
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setTasks(data)
        }
    }

    const addTask = async () => {
        if (!newTaskTitle.trim()) return

        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        const { error } = await supabase
            .from('tasks')
            .insert({
                title: newTaskTitle,
                priority: newTaskPriority,
                status: 'active',
                user_id: user.id
            })

        if (!error) {
            setNewTaskTitle('')
            setNewTaskPriority('medium')
            await loadTasks()
        }
        setLoading(false)
    }

    const toggleTaskStatus = async (task: Task) => {
        const newStatus = task.status === 'active' ? 'completed' : 'active'

        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', task.id)

        if (!error) {
            await loadTasks()
        }
    }

    const deleteTask = async (taskId: string) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId)

        if (!error) {
            await loadTasks()
        }
    }

    const activeTasks = tasks.filter(t => t.status === 'active')
    const completedTasks = tasks.filter(t => t.status === 'completed')

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700'
            case 'medium': return 'bg-blue-100 text-blue-700'
            case 'low': return 'bg-gray-100 text-gray-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Focus on your daily tasks</h1>
                    <p className="text-muted-foreground">Track progress and stay organized</p>
                </div>
            </div>

            {/* Add Task Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Task</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <Input
                                placeholder="What needs to be done?"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                            />
                        </div>
                        <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                            className="px-3 py-2 border border-border rounded-md bg-background"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <Button onClick={addTask} disabled={loading || !newTaskTitle.trim()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Task
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Active Tasks */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Tasks</CardTitle>
                    <CardDescription>{activeTasks.length} {activeTasks.length === 1 ? 'item' : 'items'}</CardDescription>
                </CardHeader>
                <CardContent>
                    {activeTasks.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p className="text-sm">No active tasks</p>
                            <p className="text-xs mt-1">Add a task above to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {activeTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                                >
                                    <button
                                        onClick={() => toggleTaskStatus(task)}
                                        className="w-5 h-5 rounded border-2 border-primary hover:bg-primary/10 transition-colors"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{task.title}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}>
                                        {task.priority.toUpperCase()}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteTask(task.id)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Completed Tasks */}
            <Card>
                <CardHeader>
                    <CardTitle>Completed</CardTitle>
                    <CardDescription>{completedTasks.length} {completedTasks.length === 1 ? 'item' : 'items'}</CardDescription>
                </CardHeader>
                <CardContent>
                    {completedTasks.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <p className="text-sm">No completed tasks</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {completedTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
                                >
                                    <button
                                        onClick={() => toggleTaskStatus(task)}
                                        className="w-5 h-5 rounded border-2 border-primary bg-primary flex items-center justify-center"
                                    >
                                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium line-through text-muted-foreground">{task.title}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteTask(task.id)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

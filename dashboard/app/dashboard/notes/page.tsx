'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Search, Trash2, Edit } from 'lucide-react'

type Note = {
    id: string
    title: string
    content: string | null
    color: string
    created_at: string
    updated_at: string
}

const noteColors = [
    { name: 'yellow', class: 'bg-yellow-100 border-yellow-200' },
    { name: 'green', class: 'bg-green-100 border-green-200' },
    { name: 'blue', class: 'bg-blue-100 border-blue-200' },
    { name: 'pink', class: 'bg-pink-100 border-pink-200' },
    { name: 'purple', class: 'bg-purple-100 border-purple-200' },
]

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        color: 'yellow'
    })
    const supabase = createClient()

    useEffect(() => {
        loadNotes()
    }, [])

    const loadNotes = async () => {
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .order('updated_at', { ascending: false })

        if (!error && data) {
            setNotes(data)
        }
    }

    const saveNote = async () => {
        if (!formData.title.trim()) return

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        if (editingNote) {
            // Update existing note
            const { error } = await supabase
                .from('notes')
                .update({
                    title: formData.title,
                    content: formData.content,
                    color: formData.color
                })
                .eq('id', editingNote.id)

            if (!error) {
                setEditingNote(null)
                resetForm()
                await loadNotes()
            }
        } else {
            // Create new note
            const { error } = await supabase
                .from('notes')
                .insert({
                    title: formData.title,
                    content: formData.content,
                    color: formData.color,
                    user_id: user.id
                })

            if (!error) {
                resetForm()
                setShowAddForm(false)
                await loadNotes()
            }
        }
    }

    const deleteNote = async (noteId: string) => {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', noteId)

        if (!error) {
            await loadNotes()
        }
    }

    const startEdit = (note: Note) => {
        setEditingNote(note)
        setFormData({
            title: note.title,
            content: note.content || '',
            color: note.color
        })
        setShowAddForm(true)
    }

    const resetForm = () => {
        setFormData({ title: '', content: '', color: 'yellow' })
        setEditingNote(null)
        setShowAddForm(false)
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getColorClass = (color: string) => {
        return noteColors.find(c => c.name === color)?.class || noteColors[0].class
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Your Knowledge Base</h1>
                    <p className="text-muted-foreground">Capture ideas and documentation</p>
                </div>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Note
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search notes..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Add/Edit Note Form */}
            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Input
                                placeholder="Note title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <Textarea
                                placeholder="Write your thoughts..."
                                rows={4}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Color:</span>
                            {noteColors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setFormData({ ...formData, color: color.name })}
                                    className={`w-8 h-8 rounded-full border-2 ${color.class} ${formData.color === color.name ? 'ring-2 ring-primary' : ''
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={saveNote} disabled={!formData.title.trim()}>
                                {editingNote ? 'Update Note' : 'Save Note'}
                            </Button>
                            <Button variant="outline" onClick={resetForm}>
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex items-center justify-center py-12">
                            <div className="text-center text-muted-foreground">
                                <p className="text-sm">
                                    {searchQuery ? 'No notes found' : 'No notes yet'}
                                </p>
                                <p className="text-xs mt-1">
                                    {searchQuery ? 'Try a different search' : 'Click "Create New Note" to get started'}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    filteredNotes.map((note) => (
                        <Card key={note.id} className={`${getColorClass(note.color)} border-2`}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">{note.title}</CardTitle>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => startEdit(note)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive"
                                            onClick={() => deleteNote(note.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription className="text-xs">
                                    {new Date(note.updated_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </CardDescription>
                            </CardHeader>
                            {note.content && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-4">
                                        {note.content}
                                    </p>
                                </CardContent>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

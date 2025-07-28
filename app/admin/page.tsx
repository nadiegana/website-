"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  firstName: string
  lastName: string
  email: string
  projectType: string
  message: string
  createdAt: string
  status: "new" | "read" | "replied"
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would fetch messages from your database
    // For now, showing example structure
    setMessages([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        projectType: "Brand Identity",
        message: "I need help with my company branding...",
        createdAt: "2025-01-28T10:00:00Z",
        status: "new",
      },
    ])
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="p-8">Loading messages...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                  {message.firstName} {message.lastName}
                </CardTitle>
                <Badge variant={message.status === "new" ? "default" : "secondary"}>{message.status}</Badge>
              </div>
              <div className="text-sm text-gray-600">
                {message.email} • {message.projectType} • {new Date(message.createdAt).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800">{message.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

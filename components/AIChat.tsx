'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Here you would typically send the message to your AI backend
      // For now, we'll just mock a response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'This is a mock response from the AI assistant.' }])
      }, 1000)
      setInput('')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would typically handle the file upload
      // For now, we'll just add a message about the upload
      setMessages([...messages, { role: 'user', content: `Uploaded file: ${file.name}` }])
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} mb-4`}>
              {message.role === 'assistant' && (
                <Avatar className="mr-2">
                  <AvatarImage src="/ai-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-2 ${message.role === 'assistant' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="mr-2" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </span>
            </Button>
          </label>
          <Button onClick={handleSend}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}


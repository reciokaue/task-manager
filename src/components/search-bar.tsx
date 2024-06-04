'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { useTask } from '@/contexts/task'

export function SearchBar() {
  const [text, setText] = useState('')
  const { handleAddTask } = useTask()

  function onAddTask() {
    if (text !== '') {
      handleAddTask(text)
      setText('')
    }
  }

  return (
    <header className="flex items-center gap-3">
      <input
        className="w-full rounded-lg bg-gray-500 p-4 text-lg placeholder:text-gray-300"
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={onAddTask}
        className="flex items-center gap-2 rounded-lg bg-yellow-500 p-4 text-lg"
      >
        Criar
        <Plus />
      </button>
    </header>
  )
}

'use client'

import { Check, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { ITask, useTask } from '@/contexts/task'

export function Task({ data }: { data: ITask }) {
  const [checkedTask, setCheckedTask] = useState(data.checked)
  const { handleRemoveTask } = useTask()

  function onRemoveTask() {
    handleRemoveTask(data.id)
  }

  return (
    <div className="flex min-h-20 items-start justify-between gap-3 rounded-lg border border-gray-400 bg-gray-500 p-4">
      <div className="relative">
        <input
          type="radio"
          checked={checkedTask}
          onChange={(e: any) => setCheckedTask(e.target.value)}
          className="sr-only"
        />
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${checkedTask ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-white'}`}
        >
          {checkedTask && <Check className="h-4 w-4 text-white" />}
        </div>
      </div>
      <p className="w-full text-base">{data.text}</p>
      <button
        onClick={onRemoveTask}
        className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}

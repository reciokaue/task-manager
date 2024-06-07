import { Check, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

import { ITask, priorityPlaceholder, useTask } from '@/contexts/task'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CreateTaskProps {
  task?: ITask
  saveTask?: () => void
}

export function CreateTask({ task, saveTask }: CreateTaskProps) {
  const [title, setTitle] = useState<string>(task?.title || '')
  const [description, setDescription] = useState<string>(
    task?.description || '',
  )
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(
    task?.priority || 'low',
  )
  const [date, setDate] = useState<Date | null>(task?.dueDate || new Date())

  const { addTask, updateTask } = useTask()

  function onRemove() {
    if (task?.id && saveTask) {
      setTitle(task.title)
      setDescription(task.description)
      setPriority(task.priority)
      setDate(task.dueDate)

      saveTask()
    } else {
      setTitle('')
      setDescription('')
      setPriority('low')
      setDate(new Date())
    }
  }

  function onCreate() {
    if (!title || !description || !date || !priority) return

    if (task?.id && saveTask) {
      updateTask(task.id, { title, description, dueDate: date, priority })
      saveTask()
    } else {
      addTask(title, description, date, priority)
      setTitle('')
      setDescription('')
      setPriority('low')
      setDate(new Date())
    }
  }

  return (
    <div className="flex min-h-20 cursor-pointer items-start justify-between gap-3 rounded-lg border border-gray-400 bg-gray-500 p-4">
      <button className="flex aspect-square h-6 w-6 items-center justify-center rounded-full border-2 border-yellow-500 transition-colors"></button>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex w-full flex-col gap-2">
          <Input
            onChange={(e: any) => setTitle(e.target.value)}
            value={title}
            className="w-full text-lg"
            placeholder="Titulo"
          />
          <Input
            onChange={(e: any) => setDescription(e.target.value)}
            value={description}
            className="w-full"
            placeholder="Descrição"
          />
        </div>
        <div className="flex flex-col gap-2">
          <DatePicker date={date} onSelectDate={setDate} />
          <Select
            onValueChange={(value: 'high' | 'medium' | 'low') =>
              setPriority(value)
            }
          >
            <SelectTrigger className="w-full bg-gray-700">
              <SelectValue
                placeholder={
                  task?.priority
                    ? priorityPlaceholder[task?.priority]
                    : 'Prioridade'
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={onRemove} variant="ghost" size="icon">
          {task?.id ? <X size={20} /> : <Trash2 size={20} />}
        </Button>
        <Button onClick={onCreate} className="bg-yellow-500 p-2">
          {task?.id ? <Check size={20} /> : <Plus size={20} />}
        </Button>
      </div>
    </div>
  )
}

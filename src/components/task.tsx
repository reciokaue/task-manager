import { format } from 'date-fns'
import { Check, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { ITask, priorityPlaceholder, useTask } from '@/contexts/task'

import { CreateTask } from './create-task'
import { Button } from './ui/button'

export function Task({ task }: { task: ITask }) {
  const [checkedTask, setCheckedTask] = useState(task?.checked)
  const [isEditingTask, setIsEditingTask] = useState(false)
  const { deleteTask, updateTask } = useTask()

  function onRemoveTask() {
    deleteTask(task)
  }
  function onEditTask() {
    setIsEditingTask(true)
  }

  function onComplete() {
    setCheckedTask(!checkedTask)
    updateTask(task.id, { checked: true })
  }

  if (isEditingTask)
    return <CreateTask task={task} saveTask={() => setIsEditingTask(false)} />

  return (
    <div
      className={
        'flex min-h-20 cursor-pointer items-start justify-between gap-3 rounded-lg border border-gray-400 bg-gray-500 p-4 ' +
        (checkedTask ? 'opacity-70' : 'opacity-100')
      }
    >
      <button
        onClick={onComplete}
        id={`task=${task.id}`}
        className={
          'flex aspect-square h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ' +
          (checkedTask ? 'border-purple-600' : 'border-yellow-500')
        }
      >
        {checkedTask && <Check className="h-4 w-4 text-white" />}
      </button>
      <div className="flex flex-1 flex-col">
        <label
          htmlFor={`task=${task.id}`}
          className={
            'w-full text-base text-gray-200 ' +
            (checkedTask ? 'line-through' : '')
          }
        >
          {task.title}
        </label>
        <p className="text-gray-300">{task.description}</p>
        <span className="mt-2 text-sm text-amber-400">
          {format(task.dueDate, 'dd/MM/yyyy')}{' '}
          {priorityPlaceholder[task.priority]}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h2></h2>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={onRemoveTask} variant="ghost" size="icon">
          <Trash2 size={20} />
        </Button>
        <Button onClick={onEditTask} variant="ghost" size="icon">
          <Edit size={20} />
        </Button>
      </div>
    </div>
  )
}

import { Check, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { ITask, useTask } from '@/contexts/task'

export function Task({ data }: { data: ITask }) {
  const [checkedTask, setCheckedTask] = useState(data.checked)
  const { handleRemoveTask } = useTask()

  function onRemoveTask() {
    handleRemoveTask(data)
  }

  function onComplete() {
    setCheckedTask(!checkedTask)
  }

  return (
    <div className="flex min-h-20 cursor-pointer items-start justify-between gap-3 rounded-lg border border-gray-400 bg-gray-500 p-4">
      <button
        onClick={onComplete}
        id={`task=${data.id}`}
        className={
          'flex aspect-square h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ' +
          (checkedTask ? 'border-purple-600' : 'border-yellow-400')
        }
      >
        {checkedTask && <Check className="h-4 w-4 text-white" />}
      </button>
      <label
        htmlFor={`task=${data.id}`}
        className={
          'w-full text-base text-gray-300 ' +
          (checkedTask ? 'line-through' : '')
        }
      >
        {data.text}
      </label>
      <button
        onClick={onRemoveTask}
        className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}

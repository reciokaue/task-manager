import { Check, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { ITask, useTask } from '@/contexts/task'

export function Task({ data }: { data: ITask }) {
  const [checkedTask, setCheckedTask] = useState(data.checked)
  const { handleRemoveTask } = useTask()

  function onRemoveTask() {
    handleRemoveTask(data.id)
  }

  function onComplete() {
    setCheckedTask(!checkedTask)
  }

  return (
    <div onClick={onComplete} className="flex min-h-20 cursor-pointer items-start justify-between gap-3 rounded-lg border border-gray-400 bg-gray-500 p-4">
      <button
        className={
          'items-center flex h-6 w-6 aspect-square justify-center rounded-full border-2 transition-colors ' +
          (checkedTask ? 'border-purple-600': 'border-yellow-400')
        }
        
      >
        {checkedTask && <Check className="h-4 w-4 text-white" />}
      </button>
      <p className={'w-full text-base text-gray-300 ' + (checkedTask ? 'line-through' : '')}>{data.text}</p>
      <button
        onClick={onRemoveTask}
        className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-400 hover:text-gray-200"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}

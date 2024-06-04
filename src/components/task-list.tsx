'use client'

import { useTask } from '@/contexts/task'

import { Empty } from './empty'
import { Task } from './task'

export function TaskList() {
  const { tasks } = useTask()

  if (tasks.length === 0) return <Empty />

  return (
    <div className="flex flex-col space-y-2">
      {tasks.map((task) => (
        <Task key={task.id} data={task} />
      ))}
    </div>
  )
}

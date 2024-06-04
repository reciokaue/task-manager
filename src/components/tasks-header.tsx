'use client'

import { useTask } from "@/contexts/task"

export function TasksHeader() {
  const { tasks } = useTask()

  const completedTasks = tasks.reduce((acc, task) => acc + (task.checked ? 1 : 0), 0);
  const totalTasks = tasks.length

  return (
    <section className="mt-16 flex items-center justify-between pb-6">
      <div className="flex items-center gap-2 text-base font-bold text-yellow-500">
        Tarefas criadas
        <span className="rounded-full bg-gray-400 px-2 text-white">{totalTasks}</span>
      </div>
      <div className="flex items-center gap-2 text-base font-bold text-purple-500">
        Tarefas completas
        <span className="rounded-full bg-gray-400 px-2 text-white">{completedTasks}</span>
      </div>
    </section>
  )
}

'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

import { priorityPlaceholder, useTask } from '@/contexts/task'

import { Empty } from './empty'
import { Task } from './task'

export function TaskList() {
  const [search, setSearch] = useState('')
  const { tasks, completedTasks, totalTasks } = useTask()

  function filterTasks() {
    const lowercasedTerm = search.toLowerCase()

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowercasedTerm) ||
        task.description.toLowerCase().includes(lowercasedTerm) ||
        priorityPlaceholder[task.priority]
          .toLowerCase()
          .includes(lowercasedTerm),
    )
  }
  return (
    <div className="flex flex-1 flex-col px-4 lg:px-0">
      <header className="flex items-center gap-3">
        <input
          className="w-full rounded-lg bg-gray-500 p-4 text-lg text-gray-200 placeholder:text-gray-300"
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {}}
          className="flex items-center gap-2 rounded-lg bg-yellow-500 p-4 text-lg font-bold"
        >
          <Search />
        </button>
      </header>
      <section className="mt-16 flex items-center justify-between pb-6">
        <div className="flex items-center gap-2 text-base font-bold text-yellow-500">
          Tarefas criadas
          <span className="rounded-full bg-gray-400 px-2 text-white">
            {totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-2 text-base font-bold text-purple-500">
          Tarefas completas
          <span className="rounded-full bg-gray-400 px-2 text-white">
            {completedTasks}
          </span>
        </div>
      </section>

      {tasks.length === 0 ? (
        <Empty />
      ) : (
        <div className="flex flex-col space-y-2 pb-10">
          {filterTasks().map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

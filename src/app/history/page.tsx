'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import { priorityPlaceholder, useTask } from '@/contexts/task'

const status = [
  { message: 'Concluído', color: 'bg-green-500' },
  { message: 'Em andamento', color: 'bg-amber-500' },
  { message: 'Interrompido', color: 'bg-red-500' },
]

export default function History() {
  const [deletedTasks, setDeletedTasks] = useState([])
  const { tasks } = useTask()

  const getStatus = (task: any) => {
    if (task.checked) return status[0]
    else if (task?.deleted) return status[2]
    else return status[1]
  }

  useEffect(() => {
    const deletedTasksStorage = localStorage.getItem('@taskApp:deletedTasks')
    if (deletedTasksStorage) {
      const tasks = JSON.parse(deletedTasksStorage).map((task: any) => ({
        ...task,
        deleted: true,
      }))
      setDeletedTasks(tasks)
    }
  }, [tasks])

  return (
    <div className="flex flex-col rounded-lg bg-gray-500 px-6 py-11">
      <h1 className="mb-8 text-2xl font-bold text-gray-50">Meu histórico</h1>
      <div className="flex overflow-hidden rounded-lg">
        <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-400 text-xs uppercase text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tarefa
              </th>
              <th scope="col" className="px-6 py-3">
                Prioridade
              </th>
              <th scope="col" className="px-6 py-3">
                Criação
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {[...tasks, ...deletedTasks].map((task) => {
              const { message, color } = getStatus(task)

              return (
                <tr
                  className="border-2 border-gray-500 bg-gray-600 font-medium text-gray-300"
                  key={task.id}
                >
                  <td
                    scope="row"
                    className="overflow-ellipsis whitespace-nowrap px-6 py-4"
                  >
                    <div className="flex flex-col">
                      {task.title}
                      <p>{task.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {priorityPlaceholder[task.priority]}
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(task.dueDate), 'dd/mm/yyyy')}
                  </td>
                  <td className="bg- flex items-center gap-2 px-6 py-4">
                    <div className={'mb-1 h-2 w-2 rounded-full ' + color} />
                    {message}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

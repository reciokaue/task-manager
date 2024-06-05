'use client'

import { createContext, ReactNode, use, useEffect, useState } from 'react'

interface TaskProviderProps {
  children: ReactNode
}

export interface ITask {
  id: number
  text: string
  checked: boolean
  deleted: boolean
  date: string
}

interface TaskContextData {
  tasks: Array<ITask>
  handleAddTask: (text: string) => void
  handleRemoveTask: (task: ITask) => void
  handleToggleCheck: (id: number) => void
}

const taskContext = createContext({} as TaskContextData)

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [removedTasks, setRemovedTasks] = useState<ITask[]>([])

  function handleAddTask(text: string) {
    const newTask: ITask = {
      id: Date.now(),
      text,
      checked: false,
      deleted: false,
      date: new Date().toISOString(),
    }
    setTasks([...tasks, newTask])
  }

  function handleRemoveTask(task: ITask) {
    const updatedTasks = tasks.filter((t) => t.id !== task.id)

    setTasks(updatedTasks)
    setRemovedTasks([task, ...removedTasks])
  }

  function handleToggleCheck(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task,
    )
    setTasks(updatedTasks)
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('@tasK:tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0)
      localStorage.setItem('@tasK:tasks', JSON.stringify(tasks))
    if (removedTasks.length > 0)
      localStorage.setItem('@tasK:removed-tasks', JSON.stringify(tasks))
  }, [tasks, removedTasks])

  return (
    <taskContext.Provider
      value={{ tasks, handleAddTask, handleRemoveTask, handleToggleCheck }}
    >
      {children}
    </taskContext.Provider>
  )
}

export const useTask = () => use(taskContext)

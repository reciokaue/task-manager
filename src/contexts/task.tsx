'use client'

import { createContext, ReactNode, use, useState } from 'react'

interface taskProviderProps {
  children: ReactNode
}

export interface ITask {
  id: number
  text: string
  checked: boolean
}

interface taskContextData {
  tasks: Array<ITask>
  handleAddTask: (text: string) => void
  handleRemoveTask: (id: number) => void
  handleToggleCheck: (id: number) => void
}

const taskContext = createContext({} as taskContextData)

export function TaskProvider({ children }: taskProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([])

  function handleAddTask(text: string) {
    const newTask = {
      text,
      checked: false,
      id: Math.floor(Math.random() * 1000),
    }

    setTasks([...tasks, newTask])
  }
  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }
  function handleToggleCheck(id: number) {
    const newTasks = tasks.map((task: ITask) => {
      if (id === task.id) return { ...task, checked: !task.checked }
      else return task
    })
    setTasks(newTasks)
  }

  return (
    <taskContext.Provider
      value={{ tasks, handleAddTask, handleRemoveTask, handleToggleCheck }}
    >
      {children}
    </taskContext.Provider>
  )
}

export const useTask = () => use(taskContext)

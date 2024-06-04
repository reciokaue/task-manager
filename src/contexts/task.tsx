'use client'

import { createContext, ReactNode, useState, useEffect, use } from 'react'

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
  handleRemoveTask: (id: number) => void
  handleToggleCheck: (id: number) => void
}

const taskContext = createContext({} as TaskContextData)

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([])



  function handleAddTask(text: string) {
    const newTask: ITask = {
      id: Date.now(),
      text,
      checked: false,
      deleted: false,
      date: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, deleted: true } : task
    )
    setTasks(updatedTasks)
  }

  function handleToggleCheck(id: number) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    )
    setTasks(updatedTasks)
  }

    
  useEffect(() => {
    const storedTasks = localStorage.getItem('@tasK:tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
      console.log("Loading tasks", JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    console.log("SAVED")
    localStorage.setItem('@tasK:tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <taskContext.Provider
      value={{ tasks, handleAddTask, handleRemoveTask, handleToggleCheck }}
    >
      {children}
    </taskContext.Provider>
  )
}

export const useTask = () => use(taskContext)

'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface TaskProviderProps {
  children: ReactNode
}

export interface ITask {
  id: number
  title: string
  description: string
  dueDate: Date
  priority: 'high' | 'medium' | 'low'
  checked: boolean
}

export const priorityPlaceholder = {
  low: 'Baixa',
  medium: 'Media',
  high: 'Alta',
}

interface TaskContextData {
  tasks: Array<ITask>
  addTask: (
    title: string,
    description: string,
    dueDate: Date,
    priority: 'high' | 'medium' | 'low',
  ) => void
  updateTask: (id: number, updatedTask: Partial<ITask>) => void
  deleteTask: (task: ITask) => void
  totalTasks: number
  completedTasks: number
  pendingTasks: number
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData)

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => !task.checked).length
  const pendingTasks = tasks.filter((task) => task.checked).length

  function addTask(
    title: string,
    description: string,
    dueDate: Date,
    priority: 'high' | 'medium' | 'low',
  ) {
    const newTask: ITask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      checked: false,
    }
    setTasks([newTask, ...tasks])
  }

  function updateTask(id: number, updatedTask: Partial<ITask>) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    )
  }

  function deleteTask(deletedTask: ITask) {
    setTasks(tasks.filter((task) => task.id !== deletedTask.id))

    const deletedTasksStorage = localStorage.getItem('@taskApp:deletedTasks')
    console.log(deletedTasksStorage)
    if (deletedTasksStorage) {
      const newDeletedTasks = [deletedTask, ...JSON.parse(deletedTasksStorage)]
      localStorage.setItem(
        '@taskApp:deletedTasks',
        JSON.stringify(newDeletedTasks),
      )
    } else {
      localStorage.setItem(
        '@taskApp:deletedTasks',
        JSON.stringify([deletedTask]),
      )
    }
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('@taskApp:tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0)
      localStorage.setItem('@taskApp:tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        totalTasks,
        completedTasks,
        pendingTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => useContext(TaskContext)

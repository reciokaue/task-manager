'use client'

import { CreateTask } from '@/components/create-task'
import { TaskList } from '@/components/task-list'

export default function Home() {
  return (
    <>
      <TaskList />
      <footer className="sticky bottom-0 left-0 right-0 px-4 py-6 lg:px-0">
        <CreateTask />
      </footer>
    </>
  )
}

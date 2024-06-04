'use client'

import { SearchBar } from '@/components/search-bar'
import { TaskList } from '@/components/task-list'
import { TasksHeader } from '@/components/tasks-header'

export default function Home() {
  return (
    <>
      <SearchBar />
      <TasksHeader />
      <TaskList />
    </>
  )
}

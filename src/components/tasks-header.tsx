'use client'

export function TasksHeader() {
  return (
    <section className="mt-16 flex items-center justify-between pb-6">
      <div className="flex items-center gap-2 text-base font-bold text-yellow-500">
        Tarefas criadas
        <span className="rounded-full bg-gray-400 px-2 text-white">{0}</span>
      </div>
      <div className="flex items-center gap-2 text-base font-bold text-purple-500">
        Tarefas criadas
        <span className="rounded-full bg-gray-400 px-2 text-white">{0}</span>
      </div>
    </section>
  )
}

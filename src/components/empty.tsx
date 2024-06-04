import { Clipboard } from 'lucide-react'

export function Empty() {
  return (
    <div className="flex w-full flex-col items-center border-t border-gray-400 p-16">
      <Clipboard size={56} color="#808080" />
      <h1 className="mt-4 text-lg font-bold text-gray-300">
        Você ainda não tem tarefas cadastradas
      </h1>
      <p className="text-lg font-normal text-gray-300">
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  )
}

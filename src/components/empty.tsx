import { Clipboard } from 'lucide-react'

export function Empty() {
  return (
    <div className="mt-10 flex w-full flex-1 flex-col items-center justify-center p-16">
      <Clipboard size={56} color="#808080" />
      <h1 className="mt-4 text-center text-lg font-bold text-gray-300">
        Você ainda não tem tarefas cadastradas
      </h1>
      <p className="text-center text-lg font-normal text-gray-300">
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  )
}

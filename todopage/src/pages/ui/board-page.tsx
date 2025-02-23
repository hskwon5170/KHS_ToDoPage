"use client"

import { Kanban } from "lucide-react"
import { useAtomValue } from "jotai/react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { boardAtom } from "@/atom/board"
import { BoardList } from "@/widgets/index"


export const BoardPage = () => {
  const columns = useAtomValue(boardAtom)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto flex size-full max-w-7xl flex-col gap-12 p-8">
        <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-800">
          <Kanban className="size-10 text-indigo-600" />
          Kanban Todo
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column) => (
            <BoardList key={column.id} column={column} />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

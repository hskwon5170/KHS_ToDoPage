"use client"

import { useAtomValue } from "jotai/react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import { boardAtom } from "@/atom/board"

import { BoardList } from "@/widgets/index"


export const BoardPage = () => {
  const columns = useAtomValue(boardAtom)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto flex size-full max-w-7xl flex-col gap-4">
        <h1 className="text-5xl font-bold">To-do</h1>
        <div className="grid grid-cols-3 gap-8">
          {columns.map((column) => (
            <BoardList key={column.id} column={column} />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

"use client"

import { useAtomValue } from "jotai/react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { boardAtom } from "@/atom/board"

import { BoardList } from "@/widgets/index"


export const BoardPage = () => {
  const columns = useAtomValue(boardAtom)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto size-full flex flex-col gap-4">
        <h1 className="font-bold text-5xl">To-do</h1>
        <div className="grid grid-cols-3 gap-8">
          {columns.map((column) => (
            <BoardList key={column.id} column={column} />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

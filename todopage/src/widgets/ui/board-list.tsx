"use client"

import { boardAtom, type Column } from "@/atom/board"

import { useRef } from "react"
import { useDrop } from "react-dnd"
import { useAtom } from "jotai/react"

import { cn } from "@/lib/utils"

import { Board, CreateBoardButton } from "@/features/index"
import { Badge } from "@/shared/ui/badge"
import { FallbackBoard } from "@/entities"
import { toast } from "sonner"

type BoardListProps = {
  column: Column;
}

export const BoardList = ({
  column,
}: BoardListProps) => {
  const ref = useRef<HTMLElement>(null)
  const [board, setBoard] = useAtom(boardAtom)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOARD",
    drop: (item: { id: string, sourceColumn: string }) => {
      const sourceColumnIndex = board.findIndex(col => col.category === item.sourceColumn)
      const targetColumnIndex = board.findIndex(col => col.category === column.category)

      if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
        const taskToMove = board[sourceColumnIndex].tasks.find(t => t.id === item.id)

        if (taskToMove) {
          const newBoard = [...board]

          newBoard[sourceColumnIndex] = {
            ...newBoard[sourceColumnIndex],
            tasks: newBoard[sourceColumnIndex].tasks.filter(t => t.id !== item.id)
          }

          newBoard[targetColumnIndex] = {
            ...newBoard[targetColumnIndex],
            tasks: [...newBoard[targetColumnIndex].tasks, taskToMove]
          }

          setBoard(newBoard)
        }
        toast("선택한 보드의 상태가 변경되었습니다.")
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }), [board, column.category])
  drop(ref)

  return (
    <section
      ref={ref}
      className={cn(
        "flex flex-col gap-2 items-start",
        isOver && "bg-slate-100"
      )}
    >
      <header className="flex h-10 w-full items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Badge className="w-fit rounded-sm text-slate-950" style={{ backgroundColor: column.color }}>
            {column.category}
          </Badge>
          <div className="text-slate-400">
            {column.tasks.length}
          </div>
        </div>
        {column.id === "todo-column" && (
          <CreateBoardButton />
        )}
      </header>

      <ul className="flex size-full min-h-32 flex-col gap-4">
        {column.tasks.length > 0 ? (
          column.tasks.map((task) => (
            <li key={task.id}>
              <Board task={task} category={column.category} color={column.color || ""} />
            </li>
          ))
        ) : column.id === "todo-column" ? (
          <FallbackBoard />
        ) : null}
      </ul>
    </section>
  )
}

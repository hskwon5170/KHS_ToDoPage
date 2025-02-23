"use client"

import { v4 as uuidv4 } from "uuid"
import { Plus } from "lucide-react"
import { useAtom } from "jotai/react"

import { boardAtom } from "@/atom/board"

import { Button } from "@/shared/ui/button"

export const CreateBoardButton = () => {
  const [_board, setBoard] = useAtom(boardAtom)

  const handleCreateBoard = () => {
    setBoard(previousData => {
      const todoColumnIndex = previousData.findIndex(col => col.id === "todo-column")
      if (todoColumnIndex === -1) return previousData

      const newData = [...previousData]
      newData[todoColumnIndex] = {
        ...newData[todoColumnIndex],
        tasks: [...newData[todoColumnIndex].tasks, {
          id: uuidv4(),
          title: "새로운 할 일",
          content: "내용을 입력하세요",
          createdAt: new Date().toISOString(),
          checkList: [
            {
              id: uuidv4(),
              label: "",
              isChecked: false,
            }
          ],
        }]
      }
      return newData
    })
  }

  return (
    <Button onClick={handleCreateBoard} variant="ghost" className="text-slate-400"><Plus /></Button>
  )
}

export default CreateBoardButton

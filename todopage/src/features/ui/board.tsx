"use client"

import { useEffect, useRef, useState } from "react"

import { useDrag, useDrop } from "react-dnd"
import * as z from "zod"
import dayjs from "dayjs"
import { v4 as uuidv4 } from "uuid"
import { useAtom } from "jotai/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { boardAtom, Board as BoardType } from "@/atom/board"

import { checkListSchema } from "@/features/model/board-schema"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/ui/form"
import { Skeleton } from "@/shared/ui/skeleton"
import { cn } from "@/lib/utils"
import { CardActionsMenu, DraggableCheckListItem } from "@/features/index"

type BoardProps = {
  task: BoardType;
  category: string;
  color: string;
}

export const Board = ({
  task,
  category,
  color,
}: BoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null)

  const [_board, setBoard] = useAtom(boardAtom)
  const [isEdit, setIsEdit] = useState(false)
  const [boardTitle, setBoardTitle] = useState(task.title)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOARD",
    item: {
      id: task.id,
      sourceColumn: category
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [task.id, category])
  drag(boardRef)

  const moveCheckListItem = (dragIndex: number, hoverIndex: number) => {
    setBoard(prev => prev.map(column => ({
      ...column,
      tasks: column.tasks.map(t => {
        if (t.id === task.id) {
          const newCheckList = [...t.checkList]
          const [draggedItem] = newCheckList.splice(dragIndex, 1)
          newCheckList.splice(hoverIndex, 0, draggedItem)
          return { ...t, checkList: newCheckList }
        }
        return t
      })
    })))
  }

  const form = useForm<z.infer<typeof checkListSchema>>({
    resolver: zodResolver(checkListSchema),
    defaultValues: {
      text: "",
    },
  })

  const handleEdit = () => {
    if (isEdit) {
      setIsEdit(false)
    } else {
      setIsEdit(true)
    }
  }

  const handleDelete = () => {
    setBoard(previousData =>
      previousData.map(column => ({
        ...column,
        tasks: column.tasks.filter(t => t.id !== task.id)
      }))
    )
  }

  const handleSave = () => {
    setBoard(previousData =>
      previousData.map(column => ({
        ...column,
        tasks: column.tasks.map(t => t.id === task.id ? { ...t, title: boardTitle } : t)
      }))
    )
    toast("저장되었습니다.")
    setIsEdit(false)
  }

  const handleCheckChange = (checked: boolean, checkListId: string) => {
    setBoard(previousData =>
      previousData.map(column => ({
        ...column,
        tasks: column.tasks.map(t => ({
          ...t,
          checkList: t.checkList?.map(item =>
            item.id === checkListId ? { ...item, isChecked: checked } : item
          )
        }))
      }))
    )
  }

  const handleAddTask = (data: z.infer<typeof checkListSchema>) => {
    setBoard(previousData =>
      previousData.map(column => {
        return {
          ...column,
          tasks: column.tasks.map(t => {
            if (t.id === task.id) {
              return {
                ...t,
                checkList: [
                  ...(t.checkList || []),
                  {
                    id: uuidv4(),
                    label: data.text,
                    isChecked: false
                  }
                ]
              }
            }
            return t
          })
        }
      })
    )
    form.reset()
    toast("할 일이 추가되었습니다.")
  }

  const handleDeleteCheckList = (checkListId: string) => {
    setBoard(previousData =>
      previousData.map(column => ({
        ...column,
        tasks: column.tasks.map(t => ({
          ...t,
          checkList: t.checkList?.filter(item => item.id !== checkListId)
        }))
      }))
    )
  }

  return (
    <div ref={boardRef}>
      <Card
        className={cn(
          "rounded-lg shadow-sm min-h-28 w-full border border-gray-100 bg-white",
          isDragging && "opacity-30"
        )}
      >
        <CardHeader className="gap-2 border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              {isEdit ? (
                <Input
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  className="border-gray-200 bg-gray-50 text-gray-800 focus:ring-1 focus:ring-gray-300"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{boardTitle}</p>
              )}
            </div>
            <CardActionsMenu
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleSave}
              isEdit={isEdit}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className="rounded-sm text-sm font-medium text-gray-700"
              style={{ backgroundColor: color }}
            >
              {category}
            </Badge>
            {isMounted ? (
              <div className="text-xs text-gray-500">{dayjs(task.createdAt).format("YYYY-MM-DD")}</div>
            ) : (
              <Skeleton className="h-4 w-20" />
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {isMounted ? (
              <div className="flex flex-col gap-2">
                {task.checkList.map((item, index) => (
                  <DraggableCheckListItem
                    key={item.id}
                    index={index}
                    item={item}
                    taskId={task.id}
                    moveItem={moveCheckListItem}
                    onCheckChange={handleCheckChange}
                    onDelete={handleDeleteCheckList}
                  />
                ))}
              </div>
            ) : (
              <Skeleton className="h-6 w-full" />
            )}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddTask)} className="mt-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="할 일을 입력하세요"
                            className="h-9 border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300"
                            {...field}
                          />
                          <Button
                            variant="ghost"
                            type="submit"
                            className={cn(
                              "absolute right-0 top-0 h-9 rounded-l-none border-l border-gray-200 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200",
                              !field.value && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={!field.value}
                          >
                            추가
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { useState } from "react"

import * as z from "zod"
import dayjs from "dayjs"
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from "jotai/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoreVertical, Pencil, Save, Trash2 } from "lucide-react"

import { boardAtom, Board as BoardType } from "@/atom/board"

import { checkListSchema } from "@/features/model/board-schema"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Checkbox } from "@/shared/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/ui/form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"

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
  const [isEdit, setIsEdit] = useState(false)
  const [_board, setBoard] = useAtom(boardAtom)
  const [boardTitle, setBoardTitle] = useState(task.title)

  const handleBoardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value)
  }

  const form = useForm<z.infer<typeof checkListSchema>>({
    resolver: zodResolver(checkListSchema),
    defaultValues: {
      text: "",
    },
  })

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
    alert('저장되었습니다.')
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
        if (column.category === "To-do") {
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
        }
        return column
      })
    )
    form.reset()
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
    <Card className="rounded-sm shadow-sm min-h-28 w-full cursor-pointer relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute top-4 right-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isEdit && (
            <DropdownMenuItem onClick={() => setIsEdit(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          )}

          {isEdit && (
            <DropdownMenuItem onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              <span>Save</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={handleDelete} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CardHeader className="gap-2">
        <CardTitle className="text-lg font-semibold max-w-52 truncate">
          {isEdit && (
            <Input
              type="text"
              value={boardTitle}
              onChange={handleBoardTitleChange}
            />
          )}
          {!isEdit && task.title}
        </CardTitle>
        <Badge
          className="rounded-sm text-slate-950 w-fit"
          style={{ backgroundColor: color }}
        >
          {category}
        </Badge>
        <div className="text-slate-400 text-sm">{dayjs(task.createdAt).format('YYYY-MM-DD')}</div>
        <div className="flex items-center gap-2 text-sm">
          <div className="size-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">K</div>
          <p>Kwon Hyung Seok</p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {task.checkList.map(item => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={item.isChecked}
                onCheckedChange={(checked) => handleCheckChange(checked as boolean, item.id)}
              />
              <label
                htmlFor={item.id}
                className={`flex-1 ${item.isChecked ? "line-through text-slate-400" : ""}`}
              >
                {item.label}
              </label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteCheckList(item.id)}
              >
                <Trash2 className="size-4 text-slate-400 hover:text-red-500" />
              </Button>
            </div>
          ))}
        </div>
        {category === "To-do" && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddTask)} className="mt-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="할 일을 입력하세요"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">추가</Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

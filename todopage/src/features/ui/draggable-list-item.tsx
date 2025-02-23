"use client"

import { useRef, useState } from "react"

import { toast } from "sonner"
import { Identifier } from "dnd-core"
import { useAtom } from "jotai/react"
import { useDrop, useDrag } from "react-dnd"

import { cn } from "@/lib/utils"

import { boardAtom } from "@/atom/board"

import { CardActionsMenu } from "@/features/index"
import { Input } from "@/shared/ui/input"
import { Checkbox } from "@/shared/ui/checkbox"

type CheckItem = {
  id: string;
  label: string;
  isChecked: boolean;
}

type DragItem = {
  id: string;
  index: number;
  type: string;
  taskId: string;
}

type DraggableCheckListItemProps = {
  item: CheckItem;
  index: number;
  taskId: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onCheckChange: (checked: boolean, id: string) => void;
  onDelete: (id: string) => void;
}

export const DraggableCheckListItem = ({
  item,
  index,
  taskId,
  moveItem,
  onCheckChange,
  onDelete
}: DraggableCheckListItemProps) => {
  const [board, setBoard] = useAtom(boardAtom)

  const [isEdit, setIsEdit] = useState(false)
  const [editedLabel, setEditedLabel] = useState(item.label)

  const ref = useRef<HTMLDivElement>(null)

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleSave = () => {
    setBoard((prev) => {
      return prev.map(column => ({
        ...column,
        tasks: column.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              checkList: task.checkList.map(checkItem =>
                checkItem.id === item.id
                  ? { ...checkItem, label: editedLabel }
                  : checkItem
              )
            }
          }
          return task
        })
      }))
    })
    setIsEdit(false)
    toast("할 일이 수정되었습니다.")
  }

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "CHECK_ITEM",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return
      }

      if (item.taskId !== taskId) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const boardItem = board.find(column =>
        column.tasks.some(task => task.id === item.taskId)
      )
      const task = boardItem?.tasks.find(task => task.id === item.taskId)

      if (task?.checkList.length === 1) {
        return
      }

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    drop(item: DragItem) {
      if (item.taskId !== taskId) {
        toast("할 일은 같은 카드 내에서만 이동할 수 있습니다.")
        return
      } else {
        toast("할 일이 이동되었습니다.")
      }
    }
  })

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "CHECK_ITEM",
    item: () => ({
      id: item.id,
      index,
      type: "CHECK_ITEM",
      taskId: taskId
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  if (!item.label) {
    return null
  }

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={cn(
        "flex flex-col bg-gray-100 px-4 py-2 rounded-sm gap-4",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-2">
        {!isEdit && (
          <Checkbox
            id={item.id}
            checked={item.isChecked}
            onCheckedChange={(checked) => onCheckChange(checked as boolean, item.id)}
          />
        )}
        {isEdit ? (
          <Input
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className={cn(
              isEdit && "bg-gray-100"
            )}
          />
        ) : (
          <label className={cn(
            "flex-1",
            item.isChecked && "line-through text-slate-400"
          )}>
            {item.label}
          </label>
        )}
        <CardActionsMenu
          onEdit={handleEdit}
          onDelete={() => {
            onDelete(item.id)
            toast("할 일이 삭제되었습니다.")
          }}
          onSave={handleSave}
          isEdit={isEdit}
        />
      </div>
    </div>
  )
}

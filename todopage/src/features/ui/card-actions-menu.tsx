"use client"

import { MoreVertical, Pencil, Save, Trash2 } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"


type CardActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  isEdit: boolean;
}

export const CardActionsMenu = ({
  onEdit,
  onDelete,
  onSave,
  isEdit,
}: CardActionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button variant="ghost" size="icon" className="size-8">
          <MoreVertical className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 size-4" />
            <span className="font-semibold">수정</span>
          </DropdownMenuItem>
        )}

        {isEdit && (
          <DropdownMenuItem onClick={onSave}>
            <Save className="mr-2 size-4" />
            <span className="font-semibold">저장</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          <Trash2 className="mr-2 size-4" />
          <span className="font-semibold">삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

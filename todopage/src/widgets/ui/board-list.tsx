import type { Column } from "@/atom/board"

import { Board } from "@/features/ui/board"
import { Badge } from "@/shared/ui/badge"

type BoardListProps = {
  column: Column;
}

export const BoardList = ({
  column,
}: BoardListProps) => {

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex">
        <Badge
          className="rounded-sm text-slate-950 w-fit"
          style={{ backgroundColor: column.color }}
        >
          {column.title}
        </Badge>
      </div>
      {column.tasks.map((task) => (
        <Board key={task.id} task={task} />
      ))}
    </div>
  )
}

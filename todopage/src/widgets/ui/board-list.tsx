import type { Column } from "@/atom/board"

import { Board, CreateBoardButton } from "@/features/index";
import { Badge } from "@/shared/ui/badge"

type BoardListProps = {
  column: Column;
}

export const BoardList = ({
  column,
}: BoardListProps) => {
  return (
    <section className="flex flex-col gap-2 items-start">
      <header className="flex items-center w-full justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Badge className="rounded-sm text-slate-950 w-fit" style={{ backgroundColor: column.color }}>
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

      <ul className="w-full flex flex-col gap-2">
        {column.tasks.map((task) => (
          <li key={task.id}>
            <Board task={task} category={column.category} color={column.color || ""} />
          </li>
        ))}
      </ul>
    </section>
  )
}

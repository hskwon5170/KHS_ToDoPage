import { atomWithStorage } from "jotai/utils"

export type Board = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export type Column = {
  id: string;
  title: string;
  tasks: Board[];
}

export const boardAtom = atomWithStorage<Column[]>("board", [
  {id: "todo", title: "To-do", tasks: []},
  {id: "in-progress", title: "In Progress", tasks: []},
  {id: "done", title: "Done", tasks: []},
])

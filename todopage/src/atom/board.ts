import { atomWithStorage } from "jotai/utils"

export type Board = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  checkList: CheckItem[];
}

type CheckItem = {
  id: string;
  label: string;
  isChecked: boolean;
}

export type Column = {
  id: string;
  category: string;
  color?: string;
  tasks: Board[];
}

export const boardAtom = atomWithStorage<Column[]>("board", [
  {
    id: "todo-column",
    category: "To-do",
    color: "#ffd3d6",
    tasks: [],
  },
  {
    id: "progress-column",
    category: "In Progress",
    color: "#fbefd2",
    tasks: [],
  },
  {
    id: "done-column",
    category: "Done",
    color: "#d1e9e3",
    tasks: [],
  },
])

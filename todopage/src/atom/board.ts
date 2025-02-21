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
  color: string;
  tasks: Board[];
}

export const boardAtom = atomWithStorage<Column[]>("board", [
  {
    id: "todo",
    title: "To-do",
    color: "#ffd3d6",
    tasks: [
      {
        id: "1",
        title: "Task 1",
        content: "Content 1",
        createdAt: "2021-01-01",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#fbefd2",
    tasks: [],
  },
  {
    id: "done",
    title: "Done",
    color: "#d1e9e3",
    tasks: [],
  },
])

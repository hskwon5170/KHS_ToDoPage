"use client"

import { Board as BoardType, Column } from "@/atom/board"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { useState } from "react"

type BoardProps = {
  task: BoardType;
}

export const Board = ({
  task,
}: BoardProps) => {

  const [isBoardOpen, setIsBoardOpen] = useState(false)
  return (
    <Dialog open={isBoardOpen} onOpenChange={setIsBoardOpen}>
      <DialogTrigger asChild>
        <Card className="rounded-sm shadow-sm min-h-28">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This is a board
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1>To</h1>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

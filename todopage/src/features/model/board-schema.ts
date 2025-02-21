import { z } from "zod"

export const checkListSchema = z.object({
  text: z.string().min(1, "할 일을 입력해주세요"),
})


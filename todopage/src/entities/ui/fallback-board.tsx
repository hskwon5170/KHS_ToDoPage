import { Card } from "@/shared/ui/card"

export const FallbackBoard = () => {
  return (
    <Card className="flex h-56 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-400">
      <p className="text-base">보드가 없습니다.</p>
      <p className="text-sm">새 보드를 만들어 할 일을 기록하세요.</p>
    </Card>
  )
}

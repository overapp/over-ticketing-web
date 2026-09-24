import { useLoginFormContext } from "./provider"
import { Button } from "@/components/ui/button"

interface SubmitProps {
  label?: string
}

export function Submit({ label = "Sign In" }: SubmitProps) {
  const { disabled } = useLoginFormContext()

  return (
    <Button type="submit" disabled={disabled} className="w-full">
      {label}
    </Button>
  )
}

import { Button } from "@/components/button";

export function Home() {
  return(
    <div className="p-8 space-y-4">
      <Button>Botão Primário</Button>
      
      <Button variant="secondary">
        Label
      </Button>
    </div>
  )
}
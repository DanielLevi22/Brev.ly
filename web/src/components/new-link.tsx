import { Button } from "./button";
import { Input } from "./input";

export function CreateNewLink() {
  return (
    <section
      aria-labelledby="novo-link-heading"
      className="w-full rounded-lg bg-grayscale-100 p-8 md:col-span-5 lg:col-span-4"
      >
      <h2
        id="novo-link-heading"
        className="text-lg font-bold text-grayscale-600 mb-4"
      >
        Novo link
      </h2>

      <form className="space-y-3">
        <Input label="link original" />
        <Input label="link encurtado" />
        <Button type="submit" variant="primary" className="w-full">
          Salvar link
        </Button>
      </form>
    </section>
  )
}
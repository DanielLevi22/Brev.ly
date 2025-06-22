import { Button } from "./button";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateLink } from "@/hooks/use-links";
import { toast } from "sonner";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Informe uma url válida"),
  shortUrl: z.string()
    .min(1, "Campo obrigatório")
    .regex(/^[a-z0-9-]+$/, "Informe uma url minuscula sem espaço/caractere special.")
});

type CreateLinkFormData = z.infer<typeof createLinkSchema>;

export function CreateNewLink() {
  const createLinkMutation = useCreateLink();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema)
  });

  const onSubmit = async (data: CreateLinkFormData) => {
    try {
      await createLinkMutation.mutateAsync(data);
      toast.success("Link criado com sucesso!");
      reset(); // Limpa o formulário após sucesso
    } catch (error: any) {
      toast.error(error?.message || "Erro ao criar link");
    }
  };

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

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input 
          label="link original" 
          {...register("originalUrl")}
          error={errors.originalUrl?.message}
        />
        <Input
          label="link encurtado"
          prefix="brev.ly/"
          {...register("shortUrl")}
          error={errors.shortUrl?.message}
        />
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full"
          disabled={createLinkMutation.isPending}
        >
          {createLinkMutation.isPending ? 'Salvando...' : 'Salvar link'}
        </Button>
      </form>
    </section>
  )
}
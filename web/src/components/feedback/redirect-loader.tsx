export function RedirectLoader() {
  return (
    <div className="bg-grayscale-100 col-span-1 md:col-span-6 md:col-start-3 lg:col-span-6  lg:col-start-3 flex flex-col justify-center items-center rounded-lg py-16 text-center gap-6">
      <img src="/Logo_Icon.svg" alt="icone do logo" width={44} height={36} />
      <p className="text-2xl font-bold text-grayscale-600">Carregando...</p>
    </div>
  );
} 
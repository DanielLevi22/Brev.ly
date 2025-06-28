interface NotFoundMessageProps {
  onGoHome: () => void;
}

export function NotFoundMessage({ onGoHome }: NotFoundMessageProps) {
  return (
    <div className="bg-grayscale-100 px-12 col-span-1 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3 flex flex-col justify-center items-center rounded-lg py-16 text-center gap-6">
      <img src="/404.svg" alt="icone do logo" width={194} height={85} />
      <p className="text-2xl font-bold text-grayscale-600">Link não encontrado</p>
      <div className="space-y-4">
        <p className="text-grayscale-500">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em{' '}
          <button 
            onClick={onGoHome}
            className="text-blue-base hover:text-blue-600 underline"
          >
            brev.ly
          </button>
        </p>
      </div>
    </div>
  );
} 
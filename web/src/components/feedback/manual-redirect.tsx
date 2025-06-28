interface ManualRedirectProps {
  url: string;
}

export function ManualRedirect({ url }: ManualRedirectProps) {
  function handleManualRedirect() {
    window.location.href = url;
  }

  return (
    <div className="space-y-2">
      <p className="text-grayscale-500">
        O link será aberto automaticamente em alguns instantes.
      </p>
      <p className="text-grayscale-500">
        Não foi redirecionado?{' '}
        <button
          onClick={handleManualRedirect}
          className="text-blue-base hover:text-blue-600 underline"
        >
          Acesse aqui
        </button>
      </p>
    </div>
  );
} 
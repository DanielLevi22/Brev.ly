import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';

export function RedirectLink() {
  const { shortKey } = useParams<{ shortKey: string }>();
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    if (!shortKey) {
      navigate('*');
      return;
    }

    hasProcessed.current = true;

    const handleRedirect = async () => {
      try {
        const { originalUrl: url } = await api.getOriginalUrl(shortKey);
        setOriginalUrl(url);

        await api.incrementAccess(shortKey);

        setTimeout(() => {
          window.location.href = url;
        }, 1500);

      } catch (err) {
        console.error('Erro ao processar redirecionamento:', err);
        navigate('*');
      }
    };

    handleRedirect();
  }, [shortKey, navigate]); 

  function handleManualRedirect  ()  {
    if (originalUrl) {
      window.location.href = originalUrl;
    }
  };

  return (
    <div className="min-h-screen bg-grayscale-50">
      <MaxWidthWrapper className="md:px-8 lg:px-0">
        <main>
          <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-10 lg:gap-8 items-center justify-center min-h-screen">
            <div className="bg-grayscale-100 col-span-1 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3 flex flex-col justify-center items-center rounded-lg py-16 text-center gap-6">
              <img src="/Logo_Icon.svg" alt="icone do logo" width={44} height={36} />
              <p className="text-2xl font-bold text-grayscale-600">Redirecionando...</p>
              <div className="space-y-2">
                <p className="text-grayscale-500">
                  O link será aberto automaticamente em alguns instantes.
                </p>
                {originalUrl && (
                  <p className="text-grayscale-500">
                    Não foi redirecionado?{' '}
                    <button
                      onClick={handleManualRedirect}
                      className="text-blue-base hover:text-blue-600 underline"
                    >
                      Acesse aqui
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
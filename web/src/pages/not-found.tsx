import { useNavigate } from 'react-router-dom';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';

export function NotFound() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-grayscale-50">
      <MaxWidthWrapper className="md:px-8 lg:px-0">
        <main>
          <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-10 lg:gap-8 items-center justify-center min-h-screen">
            <div className="bg-grayscale-100 px-12 col-span-1 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3 flex flex-col justify-center items-center rounded-lg py-16 text-center gap-6">
              <img src="/404.svg" alt="icone do logo" width={194} height={85} />
              <p className="text-2xl font-bold text-grayscale-600">Link não encontrado</p>
              <div className="space-y-4">
                <p className="text-grayscale-500">
                  O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em{' '}
                  <button 
                    onClick={handleGoHome}
                    className="text-blue-base hover:text-blue-600 underline"
                  >
                    brev.ly
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
} 
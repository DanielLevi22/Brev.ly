import { useNavigate } from 'react-router-dom';
import { MaxWidthWrapper } from '@/components/layout/max-width-wrapper';
import { NotFoundMessage } from '@/components/feedback/not-found-message';

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
            <NotFoundMessage onGoHome={handleGoHome} />
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
} 
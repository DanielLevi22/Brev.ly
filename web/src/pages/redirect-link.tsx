import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOriginalUrl, useIncrementAccess } from '@/hooks/use-links';
import { MaxWidthWrapper } from '@/components/layout/max-width-wrapper';
import { RedirectLoader } from '@/components/feedback/redirect-loader';
import { ManualRedirect } from '@/components/feedback/manual-redirect';

export function RedirectLink() {
  const { shortKey } = useParams<{ shortKey: string }>();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);
  
  const { data: originalUrlData, isLoading, error } = useGetOriginalUrl(shortKey || '', !!shortKey);
  const incrementAccessMutation = useIncrementAccess();

  useEffect(() => {
    if (hasProcessed.current || !shortKey || !originalUrlData) {
      return;
    }

    hasProcessed.current = true;

    const handleRedirect = async () => {
      try {
        await incrementAccessMutation.mutateAsync(shortKey);

        setTimeout(() => {
          window.location.href = originalUrlData.originalUrl;
        }, 1500);

      } catch (err) {
        console.error('Erro ao processar redirecionamento:', err);
        navigate('*');
      }
    };

    handleRedirect();
  }, [shortKey, originalUrlData, incrementAccessMutation, navigate]); 

  if (isLoading) {
    return (
      <div className="min-h-screen bg-grayscale-50">
        <MaxWidthWrapper className="md:px-8 lg:px-0">
          <main>
            <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-10 lg:gap-8 items-center justify-center min-h-screen">
              <RedirectLoader />
            </div>
          </main>
        </MaxWidthWrapper>
      </div>
    );
  }

  if (error || !originalUrlData) {
    navigate('*');
    return null;
  }

  return (
    <div className="min-h-screen bg-grayscale-50">
      <MaxWidthWrapper className="md:px-8 lg:px-0">
        <main>
          <div className="grid grid-cols-1 gap-5 p-3 md:p-0 md:grid-cols-10 lg:gap-8 items-center justify-center min-h-screen">
            <div className="bg-grayscale-100 col-span-1 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-3 flex flex-col justify-center items-center rounded-lg py-16 text-center gap-6">
              <img src="/Logo_Icon.svg" alt="icone do logo" width={44} height={36} />
              <p className="text-2xl font-bold text-grayscale-600">Redirecionando...</p>
              <ManualRedirect url={originalUrlData.originalUrl} />
            </div>
          </div>
        </main>
      </MaxWidthWrapper>
    </div>
  );
}
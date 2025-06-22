import { Outlet } from 'react-router-dom';
import { Header } from '@/components/header';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-grayscale-50">
      <MaxWidthWrapper className="md:px-8 lg:px-0">
        <Header />
        <main>
          <Outlet />
        </main>
      </MaxWidthWrapper>
    </div>
  );
} 
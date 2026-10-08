import PageTracking from '@/components/page-tracking';
import SiteFooter from '@/components/site-footer';
import Sky from '@/components/sky';

/** Shared chrome for every page: the sky and the footer. Pages fill the grid between. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site">
      <Sky />
      <PageTracking />

      <div className="grid">
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}

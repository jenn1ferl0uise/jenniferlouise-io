import PageTracking from '@/components/page-tracking';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import Sky from '@/components/sky';

/** Shared chrome for every page: the sky, the nav card and the footer. Pages fill the grid between. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site">
      <Sky />
      <PageTracking />

      <div className="grid">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}

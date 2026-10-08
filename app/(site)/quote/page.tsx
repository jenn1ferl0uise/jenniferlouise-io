import { Suspense } from 'react';
import { QuoteBuilder, QuoteBuilderView } from '@/components/quote-builder';
import SiteHeader from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';
import { EMPTY_SELECTION } from '@/lib/quote';

export const metadata = pageMetadata({
  title: 'Get a quote',
  description:
    'Switch on the features your project needs, see a rough timeline and send it over for a proper estimate.',
  path: '/quote',
});

export default function QuotePage() {
  return (
    <main id="main" className="page quote">
      <SiteHeader />

      <header className="cell quote-head col-4" data-section="quote:head">
        <span className="lbl">(q) quotes</span>
        <h1>
          Looking for a quote for <em>your project?</em>
        </h1>
        <p>
          Pick the pieces your website or app needs, like accounts, bookings, payments or an admin
          panel. You&apos;ll get a rough timeline straight away, and I&apos;ll reply with a proper
          estimate.
        </p>
      </header>
      <div className="open spacer col-2" aria-hidden="true" />

      {/* The page is static: the builder reads ?preset=… once it reaches the browser. */}
      <Suspense fallback={<QuoteBuilderView selection={EMPTY_SELECTION} />}>
        <QuoteBuilder />
      </Suspense>
    </main>
  );
}

import Link from 'next/link';
import { quoteHref } from '@/lib/quote';

interface QuoteCtaProps {
  /** Case study to start the builder from, e.g. on its own page. */
  preset?: { slug: string; title: string };
  className?: string;
}

export default function QuoteCta({ preset, className = '' }: QuoteCtaProps) {
  return (
    <section
      className={`cell quote-cta ${className}`}
      data-section="quote-cta"
      aria-labelledby="quote-cta-h"
    >
      <span className="lbl">(q) quotes</span>
      <h2 id="quote-cta-h">
        Looking for a quote for <em>your project?</em>
      </h2>
      <p>
        {preset
          ? `Start from the features ${preset.title} uses, switch off what you don’t need and add what you do.`
          : 'Switch on the features you need and get a rough timeline before we even talk.'}
      </p>
      <Link className="btn primary" href={preset ? quoteHref(preset.slug) : '/quote'}>
        {preset ? `Start from ${preset.title}` : 'Build your quote'}{' '}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

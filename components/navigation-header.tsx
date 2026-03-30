'use client';

import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';

function NavigationHeader() {
  return (
    <header className="flex justify-between px-4 py-6 sm:px-8 md:px-12">
      <Link onClick={() => trackEvent.homeBtnClick} href="/">
        JL
      </Link>
      <Link onClick={() => trackEvent.contactBtnClick} href="/#contact">
        CONTACT
      </Link>
    </header>
  );
}
export default NavigationHeader;

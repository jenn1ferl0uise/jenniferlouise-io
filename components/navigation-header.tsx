"use client";

import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

function NavigationHeader() {
  return (
    <header className="py-6 px-12 flex justify-between">
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

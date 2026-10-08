'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = (props: ToasterProps) => {
  return (
    <Sonner
      toastOptions={{
        style: {
          background: 'var(--plate)',
          color: 'var(--ink)',
          border: '1px solid color-mix(in srgb, var(--ink) 15%, transparent)',
          fontFamily: 'var(--font-body)',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

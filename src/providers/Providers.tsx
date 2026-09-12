'use client';
import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { domAnimation, LazyMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { AuthInitializer } from './AuthProviders';

const client = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <QueryClientProvider client={client}>
        <LazyMotion features={domAnimation}>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: 'var(--tertiary)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </LazyMotion>
      </QueryClientProvider>
    </Provider>
  );
}

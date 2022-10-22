// @refresh reload
import { Body, FileRoutes, Head, Html, Link, Meta, Scripts, Title } from 'solid-start'
import { ErrorBoundary } from 'solid-start/error-boundary'
import { Routes } from '@solidjs/router'
import { Suspense } from 'solid-js'
import { Toaster } from 'solid-toast'

import './assets/global.css'
import { ThemeProvider } from '@context/theme'

export default function Root() {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || []
    const gtag = (...args: any[]) => {
      (window as any).dataLayer!.push(args)
    }
    gtag('js', new Date())
    gtag('config', 'G-K0NZ9F7NQW')
  }
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="manifest" href="/manifest.webmanifest" />
        <Meta name="description" content="Nook, the Markdown-Powered Intelligent Knowledge Manager" />
        <Link rel="icon" href="/favicon.ico" type="image/png" sizes="16x16" />
        <Link rel="apple-touch-icon" href="/pwa-192x192.png" sizes="192x192" />
        <Meta name="theme-color" content="#202A37" />
        <Title>Nook</Title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K0NZ9F7NQW"></script>
      </Head>
      <Body class="bg-gray-50">
        <ErrorBoundary>
          <Suspense>
            <ThemeProvider>
              <Routes>
                <FileRoutes />
              </Routes>
              <Toaster
                position="top-right"
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  className: 'bg-white text-gray-400',
                  duration: 5000,
                }}
              />
              <div class="w-[100vw] text-center text-gray-400 text-sm">
                built with ❤️ using <u><a target="_blank" rel="noreferrer" href="https://bat.glo.quebec">🦇</a></u>
              </div>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  )
}

// @refresh reload
import { Body, FileRoutes, Head, Html, Link, Meta, Scripts, Title } from 'solid-start'
import { ErrorBoundary } from 'solid-start/error-boundary'
import { Routes } from '@solidjs/router'
import { Suspense } from 'solid-js'
import { Toaster } from 'solid-toast'

import './assets/global.css'
import { ThemeProvider } from '@context/theme'

export default function Root() {
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
      </Head>
<!-- Pixel Code for https://app.watchthem.live/ -->
<script defer src="https://app.watchthem.live/pixel/vCqsKqNcRojJq5vd"></script>
<!-- END Pixel Code -->
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
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  )
}

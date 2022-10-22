/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import solid from 'solid-start/vite'
// @ts-ignore
import deno from 'solid-start-deno'
import tsconfigPaths from 'vite-tsconfig-paths'
import AutoImport from 'unplugin-auto-import/vite'
// @ts-ignore
import type { Options as AutoImportOptions } from 'unplugin-auto-import'

const autoImportOptions: Partial<AutoImportOptions> = {
  imports: [
    'solid-js',
    {
      '@solid-primitives/destructure': [
        'destructure',
      ],
      '@solid-primitives/i18n': [
        'useI18n',
        'createI18nContext',
      ],
      '@testing-library/user-event': [
        ['default', 'userEvent'],
      ],
      '@solidjs/meta': [
        'Title',
      ],
    },
  ],
}


export default defineConfig({
  test: {
    ...configDefaults,
  },
  plugins: [
    solid({ adapter: deno() }),
    tsconfigPaths(),
    AutoImport(autoImportOptions),
  ],
  build: {
    target: ['esnext'],
  },
  ssr: {
    noExternal: [
      '@motionone/solid',
      'motion',
      'solid-toast',
    ],
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})

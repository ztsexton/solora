import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Mock next/image to a simple img so tests can assert on src/alt
vi.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const { src, alt, ...rest } = props
      return React.createElement('img', { src: typeof src === 'string' ? src : src?.toString?.(), alt, ...rest })
    },
  }
})

// Mock next/link to an anchor
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) =>
      React.createElement('a', { href, ...rest }, children),
  }
})

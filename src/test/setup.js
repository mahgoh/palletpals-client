import '@testing-library/jest-dom'
import { vi } from 'vitest'

/**
 * Mock window.matchMedia function
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// The purpose of the flag is to tell React that it’s running in a unit
// test-like environment. React will log helpful warnings if you forget
// to wrap an update with act. (since React 18)
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
globalThis.IS_REACT_ACT_ENVIRONMENT = true

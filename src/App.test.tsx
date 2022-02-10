import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import i18n from './i18n'
// import { GAME_TITLE } from './constants/strings'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})
let gameTitle = i18n.t('home.title')
test('renders App component', () => {
  render(<App />)
  const linkElement = screen.getByText(gameTitle)
  expect(linkElement).toBeInTheDocument()
})

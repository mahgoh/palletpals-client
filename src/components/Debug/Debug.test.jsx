import React from 'react'
import { render } from '@/utils/test-utils'
import Debug from '.'

describe('debug', () => {
  // enable debug mode
  beforeEach(() => {
    GLOBAL.DEBUG = true
  })

  it('should render', () => {
    const { container } = render(<Debug data={'test'} />)
    expect(container.querySelector('pre')).toHaveTextContent('test')
  })

  it('should not render if debug is false', () => {
    GLOBAL.DEBUG = false
    const { container } = render(<Debug data={'test'} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render with object', () => {
    const { container } = render(<Debug data={{ test: 'test' }} />)
    expect(container.querySelector('pre')).toHaveTextContent(
      '{ "test": "test" }'
    )
  })

  it('should render with array', () => {
    const { container } = render(<Debug data={['test']} />)
    expect(container.querySelector('pre')).toHaveTextContent('[ "test" ]')
  })

  it('should copy to clipboard', () => {
    const { container } = render(<Debug data={'test'} />)
    const button = container.querySelector('button')

    button.click()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      JSON.stringify('test')
    )
  })

  it('should copy to clipboard with object', () => {
    const { container } = render(<Debug data={{ test: 'test' }} />)
    const button = container.querySelector('button')

    button.click()
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      JSON.stringify({ test: 'test' })
    )
  })
})

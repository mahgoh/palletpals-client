import React from 'react'
import { render } from '@/utils/test-utils'
import { AlertGreen } from '.'

describe('alert', () => {
  it('should render', () => {
    const { container } = render(<AlertGreen message="Success" />)
    expect(container).toHaveTextContent('Success')
    expect(container).toMatchSnapshot()
  })

  it('should not render', () => {
    const { container } = render(<AlertGreen />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render additional classNames', () => {
    const { container } = render(
      <AlertGreen message="Success" className="grow" />
    )
    expect(container).toHaveTextContent('Success')
    expect(container).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '@/utils/test-utils'
import Spacer from '.'

describe('spacer', () => {
  it('should render', () => {
    const { container } = render(<Spacer />)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  it('should render with size sm', () => {
    const { container } = render(<Spacer size="sm" />)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  it('should render with size md', () => {
    const { container } = render(<Spacer size="md" />)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  it('should render with size lg', () => {
    const { container } = render(<Spacer size="lg" />)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  it('should render with size xl', () => {
    const { container } = render(<Spacer size="xl" />)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })
})

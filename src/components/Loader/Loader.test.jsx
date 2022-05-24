import React from 'react'
import { render } from '@/utils/test-utils'
import Loader from '.'

describe('loader', () => {
  it('should render', () => {
    const { container } = render(<Loader />)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })
})

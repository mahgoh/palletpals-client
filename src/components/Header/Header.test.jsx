import React from 'react'
import { render, screen } from '@/utils/test-utils'
import Header from '.'

describe('header', () => {
  it('should render', () => {
    const { container } = render(<Header />, { renderer: 'complete' })

    expect(screen).not.toBeFalsy()
    expect(container.querySelector('header')).toMatchSnapshot()
  })
})

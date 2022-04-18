import React from 'react'
import { render } from '@/utils/test-utils'
import Form from '.'

describe('form', () => {
  it('should render', () => {
    const { container } = render(
      <Form>
        <input name="test" type="text" />
      </Form>
    )
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
    expect(container.querySelector('input')).not.toBeFalsy()
  })

  it('should render with width xs', () => {
    const { container } = render(
      <Form width="xs">
        <input name="test" type="text" />
      </Form>
    )
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
    expect(container.querySelector('input')).not.toBeFalsy()
  })

  it('should render with width sm', () => {
    const { container } = render(
      <Form width="sm">
        <input name="test" type="text" />
      </Form>
    )
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
    expect(container.querySelector('input')).not.toBeFalsy()
  })

  it('should render with width half', () => {
    const { container } = render(
      <Form width="half">
        <input name="test" type="text" />
      </Form>
    )
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
    expect(container.querySelector('input')).not.toBeFalsy()
  })

  it('should render with width full', () => {
    const { container } = render(
      <Form width="full">
        <input name="test" type="text" />
      </Form>
    )
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
    expect(container.querySelector('input')).not.toBeFalsy()
  })
})

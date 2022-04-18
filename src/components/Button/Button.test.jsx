import React from 'react'
import { vi } from 'vitest'
import { render, screen } from '@/utils/test-utils'
import Button from '.'

describe('button', () => {
  it('should render', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click')
  })

  it('should render additional classNames', () => {
    render(<Button className="absolute">Click</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click')
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render primary button', () => {
    render(<Button color="primary">Click</Button>)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render secondary button', () => {
    render(<Button color="secondary">Click</Button>)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render red button', () => {
    render(<Button color="red">Click</Button>)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should handle onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Click')
    expect(onClick).not.toHaveBeenCalled()

    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })
})

import React from 'react'
import { vi } from 'vitest'
import { render, screen } from '@/utils/test-utils'
import Button, { LinkButton } from '.'

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

describe('link button', () => {
  it('should render', () => {
    render(<LinkButton to="/page">Click</LinkButton>, { renderer: 'router' })
    expect(screen.getByRole('button')).toHaveTextContent('Click')
  })

  it('should not render', () => {
    const { container } = render(<LinkButton>Click</LinkButton>, {
      renderer: 'router',
    })
    expect(container).toBeEmptyDOMElement()
  })

  it('should render additional classNames', () => {
    render(
      <LinkButton to="/page" className="absolute">
        Click
      </LinkButton>,
      { renderer: 'router' }
    )
    expect(screen.getByRole('button')).toHaveTextContent('Click')
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render primary button', () => {
    render(
      <LinkButton to="/page" color="primary">
        Click
      </LinkButton>,
      { renderer: 'router' }
    )
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render secondary button', () => {
    render(
      <LinkButton to="/page" color="secondary">
        Click
      </LinkButton>,
      { renderer: 'router' }
    )
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render red button', () => {
    render(
      <LinkButton to="/page" color="red">
        Click
      </LinkButton>,
      { renderer: 'router' }
    )
    expect(screen.getByRole('button')).toMatchSnapshot()
  })
})

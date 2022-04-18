import React from 'react'
import { render } from '@/utils/test-utils'
import Grid from '.'

describe('grid', () => {
  it('should render', () => {
    const { container } = render(<Grid></Grid>)
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })

  it('should render with children', () => {
    const { container } = render(
      <Grid>
        <div>test</div>
      </Grid>
    )
    expect(container).not.toBeFalsy()
    expect(container).toMatchSnapshot()
  })
})

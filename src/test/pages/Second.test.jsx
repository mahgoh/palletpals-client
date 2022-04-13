import React from 'react'
import renderer from 'react-test-renderer'
import { toJson } from '@/test/util'
import Second from '@/pages/Second'

test('Render page Second', () => {
  const component = renderer.create(<Second />)

  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

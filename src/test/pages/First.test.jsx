import React from 'react'
import renderer from 'react-test-renderer'
import { toJson } from '@/test/util'
import First from '@/pages/First'

test('Render page First', () => {
  const component = renderer.create(<First />)

  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

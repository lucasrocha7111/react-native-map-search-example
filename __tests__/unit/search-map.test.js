import React from 'react'
import renderer from 'react-test-renderer'
import { SearchMap } from '../../src/screens/map/SearchMap'


describe('<SearchMap />', () => {
    it('has 2 childrens', () => {
        const tree = renderer.create(<SearchMap />).toJSON()
        expect(tree.children.length).toBe(2)
    })
    it('renders correctly', () => {
        const tree = renderer.create(<SearchMap />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
import React from 'react'
import renderer from 'react-test-renderer'
import { Auth } from '../../src/screens/auth/Auth'


describe('<Auth />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<Auth />).toJSON();
        expect(tree.children.length).toBe(1);
    })
    it('renders correctly', () => {
        const tree = renderer.create(<Auth />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
import React from 'react'
import renderer from 'react-test-renderer'
import { Auth } from '../../src/screens/auth/Auth'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.useFakeTimers()

describe('<Auth />', () => {

    const navigationMock = {
        push: jest.fn()
    }
    it('has 1 child', () => {
        const tree = renderer.create(<Auth />).toJSON();
        expect(tree.children.length).toBe(1);
    })
    it('renders correctly', () => {
        const tree = renderer.create(<Auth />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('push normal login button', async () => {
        const wrapper = shallow(<Auth navigation={navigationMock} />).instance()
        wrapper._login()
        expect(navigationMock.push).not.toBeCalled()
        jest.runAllTimers()
        expect(navigationMock.push).toHaveBeenCalled()
        expect(navigationMock.push).toHaveBeenCalledTimes(1)
    })

    it('push facebook login button', async () => {
        const wrapper = shallow(<Auth navigation={navigationMock} />).instance()
        wrapper._facebookLogin()
        //jest.runAllTimers()
        expect(navigationMock.push).toHaveBeenCalled()
        expect(navigationMock.push).toHaveBeenCalledTimes(1)
    })
})
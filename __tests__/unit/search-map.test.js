import React from 'react'
import renderer from 'react-test-renderer'
import { SearchMap } from '../../src/components/map/SearchMap'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.useFakeTimers()


describe('<SearchMap />', () => {
    it('has 2 childrens', () => {
        const tree = renderer.create(<SearchMap />).toJSON()
        expect(tree.children.length).toBe(2)
    })
    it('renders correctly', () => {
        const tree = renderer.create(<SearchMap />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('on search function', async () => {
        // _onSearch
        const wrapper = shallow(<SearchMap />).instance()
        await wrapper._getSearchResults('Aguas claras')
        expect(wrapper.state.predictionList.length).toBeGreaterThan(0)
    })
})
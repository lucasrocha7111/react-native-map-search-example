
import React from 'react'
import renderer from 'react-test-renderer'
import { Map } from '../../src/screens/map/Map'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react-native-maps', () => {              
    const React = require.requireActual('react')
    const MapView = require.requireActual('react-native-maps')

    class MockCallout extends React.Component {       
      render() {         
        return React.createElement('Callout', this.props, this.props.children);    
      }
    }  

    class MockMarker extends React.Component {        
      render() {         
        return React.createElement('Marker', this.props, this.props.children);     
      }
    }  

    class MockMapView extends React.Component {       
      render() {         
        return React.createElement('MapView', this.props, this.props.children);    
      }
    }  

    MockCallout.propTypes = MapView.Callout.propTypes
    MockMarker.propTypes = MapView.Marker.propTypes  
    MockMapView.propTypes = MapView.propTypes                
    MockMapView.Marker = MockMarker        
    MockMapView.Callout = MockCallout      
    return MockMapView          
}) 

describe('<Map />', () => {

    it('renders correctly', () => {
        const tree = renderer.create(<Map />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('get markers', async () => {
        const wrapper = shallow(<Map />).instance()
        let params = {
            latitude: -15.834342,
            longitude: -48.014039
        }
        await wrapper.getNearbyPlaces(params)
        expect(wrapper.state.markers.length).toBeGreaterThan(0)
    })
})
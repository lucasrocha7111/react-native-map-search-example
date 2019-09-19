import React from 'react'
import {
    View
} from 'react-native'
import { Map, LATITUDE_DELTA, LONGITUDE_DELTA } from '../map/Map'
import { SearchMap } from '../map/SearchMap'

export class Home extends React.Component {

    mapComponent = null

    render() {
        return (
            <View style={[{flex: 1}]}>
                <SearchMap onSelectAddress={this._onSelectAddress} />
                <Map ref={(c) => this.mapComponent = c} />
            </View>
        )
    }

    _onSelectAddress = (region) => {
        let regionParams = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        this.mapComponent.map.animateToRegion(regionParams, 1000)
        this.mapComponent.getNearbyPlaces(region)
    }
}
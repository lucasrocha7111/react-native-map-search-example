import React from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Alert } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { CarouselMap } from './CarouselMap'
import { GoogleMapsUtils } from '../../utils/google-maps'

export const LATITUDE_DELTA = 0.0010
export const LONGITUDE_DELTA = 0.0020

export class Map extends React.Component {

    state = {
        location: null,
        markers: [],
        requestingPermisson: false
    }

    map = null
    mapUtils = new GoogleMapsUtils()

    render() {
        return (
            <View style={[{flex: 1}]}>
                <MapView 
                    ref={(c) => { this.map = c }}
                    style={[{flex: 1}]} 
                    showsUserLocation={true}
                    onMapReady={async () => {
                        await this._getLocationAsync()
                        setTimeout(() => {
                            this.getUserLocation()
                        }, 100)
                    }}
                >
                    {this.state.markers.map((data, index) => {
                        return (
                            <Marker key={index} title={data.title} coordinate={data.coordinate} />
                        )
                    })}
                </MapView>
                {this.state.markers.length
                ? <View style={[{position: 'absolute', bottom: 0, height: 100, justifyContent: 'center', paddingTop: 20 }]}>
                    <CarouselMap 
                        entries={this.state.markers} 
                        moveMap={(region) => {
                            let regionParams = {
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA
                            }
                            this.map.animateToRegion(regionParams, 700)
                        }}
                    />
                </View>
                : null
                }
            </View>
        )
    }

    _getLocationAsync = async () => {
        if(!this.state.requestingPermisson) {
            let { status } = await Permissions.askAsync(Permissions.LOCATION)
            this.setState({
                requestingPermisson: true
            })
            if (status !== 'granted') {
                this.setState({
                    requestingPermisson: false
                })
                setTimeout(() => {
                    Alert.alert('Localização', 'Precisamos da sua localização', [
                        {text: 'Ok', onPress:() => {
                            this._getLocationAsync()
                        }}
                    ])
                }, 50)
            } else {
                let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced, maximumAge: 10000})
                this.setState({ location })
            }
        }
        
    }

    getUserLocation = () => {
        let { location } = this.state
        if(location !== null) {
            let region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            this.map.animateToRegion(region, 1000)
            this.getNearbyPlaces(region)
        }
    }

    getNearbyPlaces = async (region) => {
        let nearby = await this.mapUtils.getNearbyPlaces(region)
        let markers = nearby.data.results.map((data) => {
            return {
                title: data.name,
                coordinate: {
                    latitude: data.geometry.location.lat,
                    longitude: data.geometry.location.lng,
                }
            }
        })
        this.setState({
            markers: markers
        })
        
    }
}
import React from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    Keyboard
} from 'react-native'
import Styles, { Colors } from '../../themes/default/styles'
import { GoogleMapsUtils } from '../../utils/google-maps'

export class SearchMap extends React.Component {

    state = {
        search: '',
        predictionList: []
    }

    mapUtils = new GoogleMapsUtils()
    timeout = null

    render() {
        return (
            <View style={[{width: '100%', paddingHorizontal: 30, top: 70, zIndex: 2, position: 'absolute'}]}>
                <View>
                    <TextInput 
                        style={[Styles.searchnput]} 
                        placeholder={'Digite uma localização'} 
                        value={this.state.search}
                        onChangeText={(value) => {
                            console.log('on change ', value)
                            this.setState({
                                search: value
                            })
                            this._onSearch(value)
                        }}
                        clearTextOnFocus={true}
                    />
                </View>
                <View style={[Styles.center, this.state.predictionList.length ? {minHeight: 300, width: '100%', marginHorizontal: 4, paddingHorizontal: 10, backgroundColor: Colors.white, borderRadius: 10, top: -10} : {zIndex: -1}]}>
                    <ScrollView keyboardShouldPersistTaps={'always'}>
                        {this.state.predictionList.map((data, index) => {
                            return (
                                <TouchableOpacity key={index} style={[{marginVertical: 10}]} onPress={() => {
                                    this._selectItem(data.text)
                                }}>
                                    <Text style={[Styles.regularFont]}>{data.text}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }

    _selectItem = async (item) => {
        Keyboard.dismiss()
        this.setState({
            search: item,
            predictionList: []
        })
        let res = await this.mapUtils.getLatLngByAddress(item)
        if(res.data.status === 'OK') {
            let location = {
                latitude: res.data.results[0].geometry.location.lat,
                longitude: res.data.results[0].geometry.location.lng,
            }
            this.props.onSelectAddress(location)
        }
    }

    _onSearch = (value) => {
        if(this.timeout !== null) {
            clearInterval(this.timeout)
        }
        this.timeout = setTimeout(async () => {
            let res = await this.mapUtils.getPlacesBySearch(value)
            if(res.data.status === 'OK') {
                let list = res.data.predictions
                let predictionList = list.map((data) => {
                    return {
                        text: data.description
                    }
                })
                this.setState({
                    predictionList: predictionList
                })
            }
        }, 800)
    }

}
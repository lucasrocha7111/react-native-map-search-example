import React from 'react'
import {
    View,
    Text,
    Platform
} from 'react-native'
import Styles, { Colors, width } from '../../themes/default/styles'
import Carousel from 'react-native-snap-carousel'

export class CarouselMap extends React.Component {

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.entries}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={300}
                style={[Styles.shadow, {height: 80, backgroundColor: 'red'}]}
                onSnapToItem={(index) => {
                    this.props.moveMap(this.props.entries[index].coordinate)
                }}
            />
        )
    }

    _renderItem ({item, index}) {
        return (
            <View key={index} style={[Platform.OS === 'ios' ? Styles.shadow : null, {justifyContent: 'center', backgroundColor: Colors.white, paddingVertical: 20, height: 80, borderRadius: 2}]}>
                <Text style={[Styles.regularFont, {textAlign: 'center'}]}>{ item.title }</Text>
            </View>
        );
    }
}
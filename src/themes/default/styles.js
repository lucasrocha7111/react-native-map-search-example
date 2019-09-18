import { StyleSheet, Dimensions } from 'react-native'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height

export const Colors = {
    primary: '#00a3a0',
    seconday: '#ef34',
    blue: '#4267b2',
    white: '#fff',
    darkGrey: '#676e7d'
}

// git remote add origin git@github.com:lucasrocha7111/react-native-map-location-app.git

export const inheritance = {
    defaultInput: {
        height: 38,
        marginBottom: 20,
        borderWidth: 0.7,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        fontFamily: 'lato',
        fontSize: 14
    },
    fontFamily: {
        fontFamily: 'lato'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
    }
}

export default StyleSheet.create({
    center: {
        alignItems: "center", 
        alignContent: 'center', 
        alignSelf: 'center'
    },
    backgroundStyle: {
        backgroundColor:'#f1f1f1'
    },
    container: {
        width: '100%',
        paddingHorizontal: 20
    },
    regularFont: {
        ...inheritance.fontFamily,
        color: Colors.darkestGrey,
    },
    shadow: {
        ...inheritance.shadow
    },
    btnDefault: {
        padding: 14,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 0.8,
        borderColor: Colors.darkGrey,
        marginBottom: 20,
    },
    formInput: {
        ...inheritance.defaultInput,
        color: Colors.darkGrey,
        borderColor: Colors.darkGrey,
    },
    searchnput: {
        ...inheritance.defaultInput,
        ...inheritance.shadow,
        color: Colors.darkGrey,
        borderRadius: 20, 
        backgroundColor: Colors.white, 
        borderColor: Colors.white,
        paddingHorizontal: 20,
        height: 42,
    },
})

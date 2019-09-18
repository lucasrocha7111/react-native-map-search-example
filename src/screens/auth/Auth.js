import React from 'react'
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native'
import * as Facebook from 'expo-facebook'
import { FACEBOOK_APP_ID } from '../../utils/constants'
import Styles, { Colors } from '../../themes/default/styles'

export class Auth extends React.Component {

    state = {
        isLoading: false
    }
    emailInput = null

    render() {
        return (
            <View style={[{flex: 1, justifyContent: 'center', width: '100%'}, Styles.backgroundStyle]}>
                <View style={[Styles.container, Styles.center]}>
                    <View style={[Styles.center]}>
                        <Image source={require('../../../assets/img/invillia-logo.png')} style={[{width: 100, height: 100, marginBottom: 40}]} />
                    </View>
                    <View style={[Styles.center, {justifyContent: 'center', width: '100%'}]}>
                        <TouchableOpacity style={[Styles.regularFont, Styles.btnDefault, {width: '100%', backgroundColor: Colors.blue}]} onPress={() => {
                            this._facebookLogin()
                        }}>
                            <Text style={[Styles.regularFont, {color: Colors.white}]}>Entrar com Facebook</Text>
                        </TouchableOpacity>
                        <TextInput ref={(c) => { this.emailInput = c }} style={[Styles.formInput]} placeholder={'Email'} />
                        <TextInput style={[Styles.formInput]} placeholder={'Senha'} />
                        <TouchableOpacity style={[Styles.btnDefault, Styles.center, {width: '100%'}]} onPress={() => {
                            this._login()
                        }}>
                            {this.state.isLoading
                            ? <ActivityIndicator />
                            : <Text style={[Styles.regularFont, Styles.center, {color: Colors.darkGrey, textAlign: 'center'}]}>Entrar</Text>
                            }
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>
        )
    }

    _login = async () => {
        this.setState({
            isLoading: true
        })
        await setTimeout(() => {
            // fake request
            this.setState({
                isLoading: true
            })
            this.props.navigation.push('home')
        }, 1000)
    }

    _facebookLogin = async () => {
        try {
            let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
                permissions: ['public_profile'],
            })
            console.log('data'. type, token)
            this.props.navigation.push('home')
        } catch(err) {
            console.log('Facebook error ', err)
        }
    }

}
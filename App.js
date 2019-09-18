import React from 'react'
import * as Font from 'expo-font'
import Routers from './Routes'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

export default class App extends React.Component {

  state = {
    isReady: false
  }

  componentWillMount = async () => {
    await Font.loadAsync({
      'lato': require('./assets/fonts/Lato/Lato-Regular.ttf')
    })
    this.setState({isReady: true})
  }

  render() {
    if(this.state.isReady) {
      let initialRoute = 'auth'
      let navConfig = {
        initialRouteName: initialRoute,
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
      }
      let Routes = createAppContainer(createStackNavigator(Routers, navConfig))
      return (
        <Routes />
      )
    } else {
      return null
    }
  }
}

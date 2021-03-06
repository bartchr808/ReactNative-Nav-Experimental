import React, { Component } from 'react';
import { AppRegistry, View, NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  scrollView: {
    marginTop: 64
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  rowText: {
    fontSize: 17,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
});

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

// export default class NavExper extends Component {
//   render() {
//     return (
//       <NavigationCardStack
//         onNavigateBack={onPopRouteFunc}
//         navigationState={myNavigationState}
//         renderScene={renderSceneFun}
//       />
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
//}

class NavExper extends Component {



  constructor(props, context) {
    super(props, context);

    this.state = {
      // This defines the initial navigation state.
      navigationState: {
        index: 0, // Starts with first route focused.
        routes: [{key: 'blue'}], // Starts with only one route.
      },
    };

    // We'll define this function later - hang on
    this._onNavigationChange = this._onNavigationChange.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  _onNavigationChange(type, route) {
    // Extract the navigationState from the current state:
    let {navigationState} = this.state;

    switch (type) {
      case 'push':



        // Use the push reducer provided by NavigationStateUtils
        navigationState = NavigationStateUtils.push(navigationState, route);
        break;

      case 'pop':
        // Pop the current route using the pop reducer.
        navigationState = NavigationStateUtils.pop(navigationState);
        break;
    }

    // NavigationStateUtils gives you back the same `navigationState` if nothing
    // has changed. We will only update state if it has changed.
    if (this.state.navigationState !== navigationState) {
      // Always use setState() when setting a new state!
      this.setState({navigationState});
      // If you are new to ES6, the above is equivalent to:
      // this.setState({navigationState: navigationState});
    }
  }

  _renderScene(sceneProps) {
    if (sceneProps.scene.route.key == 'blue') {
      return (
        <View style={{backgroundColor: 'blue', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight onPress={() => this._onNavigationChange('push',{key: 'green'})}><Text>Green</Text></TouchableHighlight>
        </View>
      )
    }
    else if (sceneProps.scene.route.key == 'green') {
      return (
        <View style={{backgroundColor: 'green', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight onPress={() => this._onNavigationChange('pop')}><Text>Back</Text></TouchableHighlight>
        </View>
      )
    }
    else if (sceneProps.scene.route.key == 'orange') {
      return (
        <View style={{backgroundColor: 'orange', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight onPress={() => this._onNavigationChange('pop')}><Text>Back</Text></TouchableHighlight>
        </View>
      )
    }
  }


  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navigationState}
        renderScene={this._renderScene}
        style={styles.navigator}
      />
    );
  }
}

AppRegistry.registerComponent('NavExper', () => NavExper);

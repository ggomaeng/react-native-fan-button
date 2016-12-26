import Exponent from 'exponent';
import React from 'react';
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
} from 'react-native';

import FanButton from './components/index';
import {Ionicons} from '@exponent/vector-icons';
import colors from './components/colors';

class App extends React.Component {
    state = {
      index: -1
    };
    render() {
        const {index} = this.state;

        return (
            <View style={styles.container}>
              <StatusBar barStyle={'default'}/>
              <View style={styles.title}>
                <Text style={{fontWeight: '700', color: 'gray', fontSize: 24}}>
                  <Text style={{color: colors.blue}}>react</Text>-
                  <Text style={{color: colors.green}}>native</Text>-
                  <Text style={{color: colors.yellow}}>fan</Text>-
                  <Text style={{color: colors.red}}>button</Text>
                </Text>
                <Text style={{fontSize: 16}}>GitHub <Ionicons name={'logo-github'} size={18}/>: ggomaeng</Text>
              </View>
              <View style={styles.content}>
                <FanButton updateIndex={(index) => this.setState({index})}/>
                <Text style={{marginTop: 36, fontSize: 18, fontWeight: '300'}}>Selected</Text>
                <Text>{index}</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    title: {
        paddingTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

Exponent.registerRootComponent(App);

import React from 'react';
import { Button, View, Text, TextInput, ListView, StyleSheet, ImageBackground, TouchableOpacity, Linking, ToastAndroid } from 'react-native';
// import { StackNavigator, Navigator } from 'react-navigation'; // Version can be specified in package.json
import { Establecimiento } from '../components/Establecimiento';
import { InfoButton } from '../components/InfoButton';
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome  
import { StackNavigator, withNavigation } from 'react-navigation'; // Version can be specified in package.json 

export class MapButton extends React.Component {
    constructor(props) {
        super(props);
        const { establecimiento } = this.props
    }
    render() {
        return (
            <TouchableOpacity
                onPress={this.onPress}
                style={[styles.button, (this.props.establecimiento == null) ? { backgroundColor: '#7F7F7F' } : { backgroundColor: '#7fb850' }]}
                disabled={this.props.establecimiento == null}
            >
                <Text style={styles.icon}>                    
                        <FontAwesome>{Icons.mapMarker}</FontAwesome>                    
                </Text>
            </TouchableOpacity>
        );
    }

    onPress = (event) => {
        event.preventDefault()
        if (this.props.establecimiento.coordinates.longitude == 0 || this.props.establecimiento.coordinates.latitude == 0) {
            ToastAndroid.showWithGravityAndOffset(
                        'El establecimiento seleccionado no se encuentra georeferenciado',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      )
        } else {
            // let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });        
            let aux = [this.props.establecimiento]
            // let establecimiento = (ds.cloneWithRows(aux))
            this.props.navigation.navigate('Mapa', {
                datos: aux
            })            
        }
    }
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 35,
        color: "white",
        flex: 0,
        margin: 10,
    },
    button: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderColor: '#273819',
        borderRadius: 70,
        margin: 20,
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
})
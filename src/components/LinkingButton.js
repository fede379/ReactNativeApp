import React from 'react';
import { Button, View, Text, TextInput, ListView, StyleSheet, ImageBackground, TouchableOpacity, Linking, ToastAndroid } from 'react-native';
// import { StackNavigator, Navigator } from 'react-navigation'; // Version can be specified in package.json
import { Establecimiento } from '../components/Establecimiento';
import { InfoButton } from '../components/InfoButton';
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome  
import { StackNavigator, withNavigation } from 'react-navigation'; // Version can be specified in package.json 

export class LinkingButton extends React.Component {

    constructor(props){
        super(props);
        const { tipo, url } = this.props
    }

    openUrl = (event) => {
        event.preventDefault()       
        if (this.props.url !== '') {
            Linking.canOpenURL(this.props.url).then(supported => {
                if (!supported) {
                    alert('telefono o url inválida');
                } else {
                    return Linking.openURL(this.props.url);
                }
            }).catch(                
                err => {
                    this.toast
                }
                
            );
        }
    } 
    
    toast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Ha ocurrido un error',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )  
    }
   
    render(){
        return(    
            <TouchableOpacity
                onPress={this.openUrl}
                style={[styles.button, (this.props.url == '') ? { backgroundColor: '#7F7F7F' } : { backgroundColor: '#7fb850'}]}        
                disabled={this.props.url == ''}
            >
                <Text style={styles.icon}>
                    {this.props.tipo == 'tel' && (
                        <FontAwesome>{Icons.phone}</FontAwesome>  
                    )}
                    {this.props.tipo == 'mail' && (
                        <FontAwesome>{Icons.envelope}</FontAwesome>
                    )}
                    {/* {this.props.tipo == 'web' && (
                        <FontAwesome>{Icons.globe}</FontAwesome>
                    )}        */}                                       
                </Text>
            </TouchableOpacity>
            );   

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
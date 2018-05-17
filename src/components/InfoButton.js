import React from 'react';
import { Button, View, Text, TextInput, ActivityIndicator, ListView, StyleSheet, Image, ImageBackground, TouchableHighlight } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome
import { StackNavigator, withNavigation } from 'react-navigation'; // Version can be specified in package.json


export default class InfoButton extends React.Component{
    
    render() {      

        return (

            <View>
                <TouchableHighlight onPress={                    
                    () => {this.props.navigation.navigate('About')                    
                    }}>
                    <Text style={{ margin: 10, fontSize: 24, textAlign: 'center', color: "white", fontFamily: 'fontawesome' }}>
                        <FontAwesome>{Icons.questionCircle}</FontAwesome>
                    </Text>
                </TouchableHighlight>
            </View>

        );
    }
}


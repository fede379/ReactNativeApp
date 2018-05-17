import React from 'react';
import { Button, View, Text, TextInput, ActivityIndicator, ListView, StyleSheet, Image, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome 
import InfoButton from '../components/InfoButton';   
//import styles from './PantallaInicio'

export class About extends React.Component {
    constructor(props) {
        super(props);        
        const { navigation } = this.props.navigation   
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Mi Futuro',        
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#7fb850',
        },
        headerTitleStyle: {
            color: 'white'
        },        
    })

    render() {        
        return (
            <ImageBackground source={require('../img/header.jpg')}
                style={styles.PantallaAbout}
                imageStyle={styles.backgroundImage}>
            
                <View style={styles.Container}>
                
                    <View style={styles.contImagen}>
                        <Image source={require('../img/logo-transp.png')}
                            style={styles.imageHeader}
                        />    
                    </View>         
                    <View style={styles.contText}>
                        <Text style={styles.title}>
                            {'DESARROLLADO POR EL ÁREA DE PROGRAMACIÓN DEL MINISTERIO DE EDUCACIÓN DE LA PROVINCIA DE CORRIENTES'}
                        </Text>                           
                    </View>         

                      
                </View>

            </ImageBackground>
        );
    }    

}

const styles = StyleSheet.create({
    PantallaAbout: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        //resizeMode: 'cover'
    },
    Container: {
        // flex: 1,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'stretch',
    }, 
    title: {
        fontSize: 20,
        //padding: 10,
        textAlign: 'center',
        color: "#ffffff",
        fontFamily: "SourceSansPro-Light",
    },
    imageHeader: {        
        // width: null,
        // height: null,
        // flexDirection: 'row',
        // flex: 2,
        // justifyContent: 'flex-start',
        // margin: 10,
        //  width: 50,
        //  height: 200,        
        resizeMode: 'center',
    },       
    contImagen: {
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: "stretch",
        // height: 300,
        // width: 200,         
        margin: 10,     
    },
    contText: {
        justifyContent: 'center',
        flexDirection: "row",
    }
})

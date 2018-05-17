import React from 'react';
import { Button, View, Text, TextInput, ActivityIndicator, ListView, StyleSheet, Image, ImageBackground, TouchableHighlight } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome
import { StackNavigator, withNavigation } from 'react-navigation'; 

export class Establecimiento extends View {
    constructor(props) {
        super(props); 
        const {row} = this.props  
           
    }

    onPress = () => {
        this.props.navigation.navigate('EstablecimientoDetalle', {
            detalle: this.props.row
        });
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress} underlayColor={'#3A7F00'}>
                <View style={styles.container}>
                    
                        <View>                    
                            <Text style={styles.title}>{this.props.row.orientacion}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>                                                
                                <Text style={styles.subtitle}>
                                    <FontAwesome>{Icons.institution}{" "}</FontAwesome>                                
                                    {this.props.row.nombre}
                                </Text>                                      
                        </View>
                        <View>
                            <Text style={styles.info}>{"Localidad: "}
                                <Text style={{ fontFamily: 'SourceSansPro', color: '#4c4c4c'}}>
                                    {this.props.row.localidad}
                                </Text> 
                            </Text> 
                            <Text style={styles.info}>{"Departamento: "}
                                <Text style={{ fontFamily: 'SourceSansPro', color: '#4c4c4c'}}>
                                    {this.props.row.departamento}
                                </Text> 
                            </Text> 
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10}}>                    
                            <TouchableHighlight onPress={this.onPress} 
                                style={{alignContent: 'center', alignItems:'center'}}
                                underlayColor={'#3A7F00'}>
                                <Text style={styles.icon}>
                                    <FontAwesome>{Icons.plusCircle}</FontAwesome>   
                                    <Text style={styles.subtitle2}>{" Más Detalles"}</Text>                         
                                </Text>            
                            </TouchableHighlight>         
                        </View>
                    
                </View>
            </TouchableHighlight>
        );
    }
}    

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: 220,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderTopColor: '#7fb850',
        borderTopWidth: 5,
        borderColor: '#7fb850',
        borderWidth: 1
    },
    title: {
        margin: 10,
        fontSize: 20,
        textAlign: 'center',
        color: "#000000",
        fontFamily: "SourceSansPro", 
    },
    subtitle: {        
        fontSize: 15,
        textAlign: 'center',
        color: '#4c4c4c',
        fontFamily: "SourceSansPro",
        margin: 10 
    },
    subtitle2: {
        fontSize: 18,
        textAlign: 'center',
        color: '#4c4c4c',
        fontFamily: "SourceSansPro",
        margin: 10
    },
    info: {
        fontSize: 14,
        textAlign: 'left',
        color: '#000000',
        fontFamily: "SourceSansPro-Bold", 
    },
    icon: {
        fontSize: 24,
        color: "#7fb850",
        textAlign: 'center',
        margin: 10,
    }
})

// export default withNavigation(TouchableHighlight);

// escuela.id,
// escuela.nombre,
// orientacion,
// escuela.domicilio.localidad.nombre,
// escuela.domicilio.localidad.departamento.nombre,
// escuela.domicilio.position[1], // lat
// escuela.domicilio.position[0], // long
// escuela.sitioWeb,
// escuela.domicilio.calle,
// escuela.email,
// escuela.telefono,
// escuela.telefonoCodArea
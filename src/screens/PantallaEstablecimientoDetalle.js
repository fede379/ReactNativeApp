import React from 'react';
import { ScrollView, Linking, Button, View, Text, TextInput, ActivityIndicator, ListView, StyleSheet, Image, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome   
import { LinkingButton } from '../components/LinkingButton'
import { MapButton } from '../components/MapButton'


export class EstablecimientoDetalle extends React.Component {
    constructor(props) {
        super(props);
        // const { detalle } = this.props
        const { navigation } = this.props.navigation
    }
    //datos = detalle.sitioWeb
    //tipo = 'http://'
    renderEnlaces(datos, tipo){
        // console.log(datos)
        let result
        if (datos && datos.length > 0 && datos != null){
            console.log('no vacio')
            result = datos.map(function(dato,index) {
                console.log(dato)
                            return (<Text style={{color: 'blue'}}
                                    key = {index}
                                    onPress={() => Linking.openURL(tipo+dato)}>
                                    {tipo === 'mailto:' ? dato : tipo+dato }
                                    </Text>);
                        })
        } else {
            result = 'No disponible'
        }
        return result
    }

    

    static navigationOptions = {
        title: 'Mi Futuro',
        headerStyle: {
            backgroundColor: '#7fb850',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'white'
        },
    }

    render() {
        const { params } = this.props.navigation.state;
        const detalle = params ? params.detalle : null;
        var urls = this.renderEnlaces(detalle.sitioWeb,'http://')
        var mails = this.renderEnlaces(detalle.mail,'mailto:')
        return (
            <ImageBackground source={require('../img/bg.jpg')}
                style={styles.PantallaEstablecimientoDetalle}
                imageStyle={styles.backgroundImage}>

                <View style={styles.container}>

                    <Text
                    selectable={true}                     
                    style={styles.title}>
                        {detalle.orientacion}
                    </Text>
                    
                    <View style={styles.separator}></View>

                    <View style={{ flexDirection: 'row' }}>
                    
                        <Text
                        selectable={true} 
                        style={styles.subtitle}>
                            <FontAwesome>{Icons.institution}{" "}</FontAwesome>
                                {detalle.nombre}
                            </Text>
                    </View>

                    <ScrollView style={{ margin: 10}}
                        contentContainerStyle={{ 
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center', alignSelf: 'center'}}>
                        <View style={{justifyContent: 'center'}}>    
                        <Text 
                        style={styles.info}>{"Localidad: "}
                            <Text 
                            style={styles.campos}                            
                            >{detalle.localidad}
                                </Text>
                        </Text>
                        <Text                         
                        style={styles.info}>{"Departamento: "}
                            <Text style={styles.campos}>{detalle.departamento}
                                </Text>
                        </Text>
                        <Text  
                        selectable={true}
                        style={styles.info}>{"Dirección: "}
                            <Text style={styles.campos}>{detalle.calle}
                                </Text>
                        </Text>
                        <Text 
                        selectable={true}
                        style={styles.info}>{"Sitio Web: "}
                            <Text style={styles.campos}>{urls}
                                </Text>
                        </Text>
                        <Text 
                        selectable={true}
                        style={styles.info}>{"Email: "}
                            <Text style={styles.campos}>{mails}
                                </Text>
                        </Text>
                        <Text 
                        selectable={true}
                        style={styles.info}>{"Teléfono: "}
                            <Text style={styles.campos}>{detalle.telefono}
                                </Text>
                        </Text>                        
                        
                        {detalle.taller != null && (<Text
                            style={styles.info}>{"Inicio: "}
                            <Text style={styles.campos}>{this.formatDate(detalle.taller.inicio)}
                            </Text>
                        </Text>)
                        }
                        {detalle.taller != null && (<Text
                            style={styles.info}>{"Fin: "}
                            <Text style={styles.campos}>{this.formatDate(detalle.taller.fin)}
                            </Text>
                        </Text>)
                        }
                        {detalle.taller != null && (<Text
                            style={styles.info}>{"Descripción: "}
                            <Text style={styles.campos}>{(detalle.taller.descripcion == '') ? 'No posee' : detalle.taller.descripcion}
                            </Text>
                        </Text>)
                        }
                        
                        </View>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <LinkingButton 
                        tipo='tel' 
                        url={this.getUrl(detalle.telefono)}>
                        </LinkingButton>
                        <MapButton
                        establecimiento={detalle}
                        navigation={this.props.navigation}
                        ></MapButton>
                       
                    </View>

                </View>
            </ImageBackground>
        );
    }
    
    getUrl = (url) => {
        if (url == null || url == '' || url == 'No disponible') {
            return ''
        }
        if (url.indexOf('@') > -1){
            return "mailto:" + url
        } else if (/^\d+$/.test(url)) {
            return "tel:" + url
        } else {
            return "http://" + url
        }
    }
    formatDate = (fecha) => {       
        let dmy = fecha.split("-");
        // comprobacion dia
        if (Number(dmy[2]) < 10) { dmy[2] = "0" + Number(dmy[2]) }
        // comprobacion mes
        if (Number(dmy[1]) < 10) { dmy[1] = "0" + Number(dmy[1]) }

        return dmy[2] + "/" + dmy[1] + "/" + dmy[0]
    }
}


const styles = StyleSheet.create({
    PantallaEstablecimientoDetalle: {
        flex: 1,
        //margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'flex-end',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        //resizeMode: 'cover'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderColor: '#7fb850',
        borderTopWidth: 5,
        borderWidth: 1,
    },
    title: {
        margin: 10,
        fontSize: 24,
        textAlign: 'center',
        color: "#000000",
        fontFamily: "SourceSansPro",
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#4c4c4c',
        fontFamily: "SourceSansPro",
        margin: 10
    },
    info: {
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        fontFamily: "SourceSansPro-Bold",
    },
    icon: {
        fontSize: 24,
        color: "#7fb850",
        textAlign: 'center',
        margin: 10,
    },
    campos: {
        fontFamily: 'SourceSansPro',
        color: '#4c4c4c'
    },
    mapContainer: {
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    separator: {
        // flex: 1,
        // margin: 20,
        width: 300,
        borderBottomWidth: 0.5,
        borderBottomColor: '#4c4c4c',
    },
})
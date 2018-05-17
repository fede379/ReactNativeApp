import React from 'react';
import { Button, View, Text, TextInput, ActivityIndicator, ListView, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome 
import InfoButton from '../components/InfoButton';   
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';

export class PantallaMapa extends React.Component {
    constructor(props) {
        super(props);        
        const { navigation } = this.props.navigation   
        const { params } = this.props.navigation.state            
        this.datos = params ? params.datos : null
        this.state = {     
            width: 500,       
            permiso: false,            
            region: {
                latitude: -28.784948,
                longitude: -57.875989,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0521,         
            }
        }
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


    componentDidMount() {
        this.setRegion()
        // const { widthS, heightS } = Dimensions.get('window')
        // this.setState({
        //     width: widthS - 1
        // })
    }

    getRegionForCoordinates = (points) => {
        // points should be an array of { latitude: X, longitude: Y }        
        let minX, maxX, minY, maxY;

        // init first point
        ((point) => {
            minX = point.coordinates.latitude;
            maxX = point.coordinates.latitude;
            minY = point.coordinates.longitude;
            maxY = point.coordinates.longitude;
        })(points[0]);

        // calculate rect
        var cont = 0
        points.map((point) => {
            minX = Math.min(minX, point.coordinates.latitude);
            maxX = Math.max(maxX, point.coordinates.latitude);
            minY = Math.min(minY, point.coordinates.longitude);
            maxY = Math.max(maxY, point.coordinates.longitude);
            cont++
        });

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (cont == 1) ? 0.005 : (maxX - minX);
        const deltaY = (cont == 1) ? 0.005 : (maxY - minY);

        this.setState({
            region: {
                latitude: midX,
                longitude: midY,
                latitudeDelta: deltaX*1.1,
                longitudeDelta: deltaY*1.1
            }
        }) 
    }

    getDimension = () => {
        const { widthS, heightS } = Dimensions.get('window')
        return widthS - 1
    }

    render() {        
        return (
            <ImageBackground source={require('../img/bg.jpg')}
                style={styles.PantallaAbout}
                imageStyle={styles.backgroundImage}>
                <View style={styles.Container}>                    
                    <MapView style={[styles.map, {width: this.state.width}]}
                        region={this.state.region}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        showsCompass={true}
                        showsScale={true}
                        toolbarEnabled={true}
                        provider={MapView.PROVIDER_GOOGLE}
                        loadingEnabled={true}
                        onMapReady={()=>{
                            this.setState({width: this.getDimension()})
                            }
                        }
                        >
                        {(!!this.datos) && (this.datos.map((marker) => (
                            <Marker
                                key= {marker.key}
                                coordinate={marker.coordinates}
                                // title={marker.nombre}
                                // description={marker.orientacion}
                                >
                                <Callout style={styles.tooltip}>
                                    <Text style={styles.mapTitle} >{marker.nombre}</Text>
                                    <Text>{marker.orientacion}</Text>
                                    <Text>{marker.calle}</Text>
                                </Callout>
                            </Marker>
                        )))}                    
                    </MapView>
                </View>
            </ImageBackground>            
        );       
    }  

    onRegionChange = (region) => {
        this.setState({ region });
    }
    
    setRegion = () => {
        if (this.datos == null) {
            this.setState({
                region: {
                    latitude: -28.823717890028824,
                    longitude: -57.65525506809354,
                    latitudeDelta: 5.332557919008497,
                    longitudeDelta: 4.086622707545757,
                }
            })            
        } else {
            this.getRegionForCoordinates(this.removeZeroPoints(this.datos))
        }
    }

    removeZeroPoints = (data) => {
        return data.filter(x => (x.coordinates.latitude != 0 && x.coordinates.longitude != 0))
    }
}

const getPosition = (contex) => {
    if (contex.state.permiso) {        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                contex.setState({
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude,
                    errorGeo: null,
                });
            },
            (error) => contex.setState({ errorGeo: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    } else {
        ToastAndroid.showWithGravityAndOffset(
            'No se concedieron los permisos de Geolocalización',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )
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
        flex: 1,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'stretch',
    }, 
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: "#ffffff",
        fontFamily: "SourceSansPro-Light",
    },
    imageHeader: {       
        resizeMode: 'center'
    },       
    contImagen: {
        // flex: 2,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: "stretch"        
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
    mapTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    tooltip:{
        flex: 1,
        position: 'relative' 
    },
})

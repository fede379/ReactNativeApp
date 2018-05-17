import React from 'react';
import { ToastAndroid, Button, View, Text, TextInput, ActivityIndicator, ListView, StyleSheet, Image, ImageBackground, Dimensions, Switch, PermissionsAndroid } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome
import InfoButton from '../components/InfoButton';
// import fetch from 'react-native-fetch-polyfill';

export class PantallaInicio extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props.navigation        
        this.state = {
            texto: '',
            respuestaJson: [],
            cargando: false,
            elementos: {},
            landscape: false,
            error: false,
            errorConnection: false,
            switchValue: false,
            latitud: -28.784948,
            longitud: -57.875989,
            permiso: false,
            errorGeo: null,
            loading: false
        }
        this.onLayout = this.onLayout.bind(this);
    }


    static navigationOptions = ({ navigation }) => ({
        title: 'Mi Futuro',
        headerRight: (
            <InfoButton navigation={navigation}/>
        ),
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#7fb850',
        },
        headerTitleStyle: {
            color: 'white'
        }
    })

    toastMessage = (text,duration,position) => {
        ToastAndroid.showWithGravityAndOffset(
            text,
            duration,
            position,
            25,
            50
        )
    }

    buscar = (palabras) => {
        this.setState({
            cargando: true,
            texto: '',
            errorConnection: false
        })
        let terminos = normalize(clear(palabras))
        let uri = orientacion + '?regex=' + terminos//ej: prodesorado de musica => profesorado,musica
        // let time = 8000
        //primera peticion
        fetch(
                // "http://200.32.52.6:8080/apiv2"
                uri
                // , {timeout: time}
            )
        .then(response => response.json())
        .then(responseJson => {
            // console.log('resultado ' + JSON.stringify(responseJson, null, 2));
            //obtengo el id de las orientaciones
            let oriBuscadas = getIdsOrientaciones(responseJson, palabras);
            console.log("***********")
            // console.log(oriBuscadas)
            buscarCues(oriBuscadas)
        })
        .catch((error) => {
            console.log('error1...',error)
            this.toastMessage('Se perdió la conexión, inténtelo nuevamente', ToastAndroid.LONG, ToastAndroid.BOTTOM)
            this.setState({
                cargando: false,
                errorConnection: true
            })
        })

        //segunda peticion
        //busco los id de cue-anexos
        buscarCues = (oriBuscadas) => {
            // console.log(orientaciones+oriBuscadas.toString())
            fetch(
                orientaciones+oriBuscadas.toString()
                // , {timeout: time}
             )
            .then(response => response.json())
            .then(newResponseJson => {
                // console.log("new response " + JSON.stringify(newResponseJson, null, 2))
                //ACA tengo que filtrar la respuestaJson y dejar solo las orientaciones buscadas
                var locSoloConOriBuscadas = filtrarEntrada(newResponseJson, terminos);
                // console.log(locSoloConOriBuscadas)
                let idCueAnexos = getIdsCueAnexos(newResponseJson)
                // console.log(idCueAnexos)
                buscarInfoCues(locSoloConOriBuscadas,idCueAnexos)
            })
            .catch((error) => {
                console.log('error2...',error)
                this.toastMessage('Se perdió la conexión, inténtelo nuevamente', ToastAndroid.LONG, ToastAndroid.BOTTOM)
                this.setState({
                    cargando: false,
                    errorConnection: true
                })
            })
            
        }
        
        //tercera peticion
        buscarInfoCues = (locSoloConOriBuscadas,idCueAnexos) => {
        // console.log(localizaciones+'?ids='+idCueAnexos)
            fetch(
                localizaciones+'?ids='+idCueAnexos
                // , {timeout: time}
            )
            .then(response => response.json())
            .then(cueAnexosResponseJson => {
                // console.log(cueAnexosResponseJson)
                let allSchools = mergearEscuelas(locSoloConOriBuscadas, cueAnexosResponseJson);
                // console.log("all schools" + JSON.stringify(allSchools, null, 2))

                //busco establecimientos cercanos
                console.log("Switch value: "+ this.state.switchValue)
                if(this.state.switchValue){
                    if(this.state.longitud != 0){
                        console.log('result filtrado')
                        console.log('latitud: fil ' + this.state.latitud)
                        console.log('longitud fil ' + this.state.longitud)
                        filtrarCercanos(allSchools, this.state.longitud,this.state.latitud, 20)
                    }
                }else{
                    prepararSalida(allSchools)
                }
            })
            .catch((error) => {
                console.log('error3...',error)
                this.toastMessage('Se perdió la conexión, inténtelo nuevamente', ToastAndroid.LONG, ToastAndroid.BOTTOM)
                this.setState({
                    cargando: false,
                    errorConnection: true
                })
            }) 

        }

        filtrarCercanos = (allSchools, long, lat, distancia) => {
            fetch(
                localizaciones+'near/'+long+','+lat+'/'+distancia
            )
            .then(response => response.json())
            .then(cercanos =>{
                // console.log("establecimientos cercanos" + JSON.stringify(cercanos.content, null, 2))
                let cercanosId = [];
                cercanos.content.forEach(function (v, index, initial_array) {
                    // console.log(v.content.id)
                    cercanosId.push(v.content.id)
                })
                // cercanosId = ['180039800', '180098400']
                // console.log(allSchools)
                // console.log(cercanosId)
                var filtrado = allSchools.filter(function(item) {
                    // console.log(item.id)
                    return cercanosId.indexOf(item.id) !== -1;
                });
                // console.log(filtrado)
                prepararSalida(filtrado)
            })
            .catch((error) => {
                console.log('error4...',error)
                this.toastMessage('Se perdió la conexión, inténtelo nuevamente', ToastAndroid.LONG, ToastAndroid.BOTTOM)
                this.setState({
                    cargando: false,
                    errorConnection: true
                })
            }) 
        }

        //cargar listado escuela (armo un nuevo json con los datos a mostrar)
        prepararSalida = (allSchools) => {
            let aux = []
            allSchools.forEach(function(escuela, indice, inicial){
                escuela.orientaciones.forEach(function(orientacion,i,init){
                    let item = {};
                    item.key = escuela.id +''+ orientacion.nombre 
                    item.id = escuela.id
                    item.nombre = escuela.nombre
                    item.orientacion = orientacion.nombre
                    item.localidad = escuela.domicilio.localidad.nombre
                    item.departamento = escuela.domicilio.localidad.departamento.nombre                    
                    item.coordinates = {
                        latitude: escuela.domicilio.position[1],
                        longitude: escuela.domicilio.position[0]
                    }
                    item.taller = orientacion.taller
                    item.sitioWeb = arrayUrl(escuela.sitioWeb),
                    // item.sitioWeb = checkUrl(escuela.sitioWeb.toString()),
                    item.calle = (escuela.domicilio.calle != '' ? escuela.domicilio.calle : 'No disponible') 
                                +' '+ (!!escuela.domicilio.nro ? escuela.domicilio.nro : '') //escuela.domicilio.nro,
                    item.mail = clearUrl(escuela.email),
                    item.telefono = escuela.telefonoCodArea + escuela.telefono,
                    aux.push(item)            
                })
            })
            
            this.setState({                
                respuestaJson: aux,
                cargando: false
            })

            // count = Object.keys(this.state.respuestaJson).length;
            // console.log('total de registros respuestaJson: '+ count)
            // console.log('*******************')
            // console.log(this.state.respuestaJson)

            this.props.navigation.navigate('Detalle', {
                busqueda: this.state.respuestaJson,
                // arrayholder: aux,
                latitud: this.state.latitud,
                longitud: this.state.longitud
            });
        }

        //si hubo errores lo envío de nuevo al inicio
        if(this.state.errorConnection){
            this.props.navigation.navigate('Inicio');
        }
    }

    // timeout = (ms, promise) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //         if(this.state.errorConnection){
    //                 this.props.navigation.navigate('Inicio');
    //                 console.log('error de conexion')
    //                 ToastAndroid.showWithGravityAndOffset(
    //                     'Se perdió la conexión, inténtelo nuevamente',
    //                     ToastAndroid.LONG,
    //                     ToastAndroid.BOTTOM,
    //                     25,
    //                     50
    //                   )
    //         }
    //         }, ms)
    //     promise.then(resolve, reject)
    //     })
    // }

    processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }


    onLayout() {
        const { width, height } = Dimensions.get('window')
        if (height < width) {
            this.setState({
                landscape: true
            })
        } else {
            this.setState({
                landscape: false
            })
        }
    }

    componentWillMount() {
        // requestGeoPermission(this)
        // getPosition(this)
        
        const { width, height } = Dimensions.get('window')
        if (height < width) {
            this.setState({
                landscape: true
            })
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
            requestGeoPermission(this)
        }, 1000);

        // if (this.state.permiso) {
        //     getPosition(this)
        // }
    }

    onChanged(text){
        let nuevoTexto = '';
        let letras = /[A-Za-zñÑáéíóúÁÉÍÓÚ\s]/;
        let emoticons = /(\: \w+\:|\< [\/\\]?3|[\(\)\\\D|\*\$][\-\^]?[\:\;\=]|[\:\;\=B8][\-\^]?[3DOPp\@\$\*\\\)\(\/\|])(?=\s|[\!\.\?]|$)/
        // let whitespace = /\s/g;
        for (var i=0; i < text.length; i++) {
            if (letras.test(text[i]) && !emoticons.test(text[i])){
                nuevoTexto =  nuevoTexto + text[i]
            }
            else {
                this.toastMessage('Solo se permiten letras y acentos', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
        }        
        this.setState({ texto: nuevoTexto });
    }

    render() {        
        if (this.state.cargando) {
            return (
                <View style={styles.Container}>
                    <ActivityIndicator
                        animating={true}
                        color='#7fb850'
                        size='large'
                    />
                </View>
            );
        }
        return (


            <ImageBackground source={require('../img/bgtransp.jpg')}
                style={styles.PantallaInicio}
                imageStyle={styles.backgroundImage}
                onLayout={this.onLayout}>


                <View style={styles.Container}>


                    <Text style={styles.mainTitle}>
                        <Text>
                            MI</Text>
                        <Text style={styles.bold}>
                            FUTURO</Text>
                    </Text>
                    <View
                        style={styles.line}
                    />
                    <Text style={styles.title}>
                        EL INICIO DE TU CAMINO SE ENCUENTRA AQUÍ. DESCUBRILO.</Text>
                    <TextInput
                        style={[styles.TextInputStyle, this.state.landscape ? { color: 'black' } : { color: 'white' }]}
                        placeholder="Ingresa tu orientación..."
                        underlineColorAndroid='transparent'
                        placeholderTextColor='white'
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        clearButtonMode={'while-editing'}                        
                        onChangeText={(cadena) => {
                                        this.setState({ texto: cadena })
                                        this.onChanged(cadena)
                                    }}
                        value = {this.state.texto}
                    />
                    {!!this.state.error && (
                        <Text style={{ color: 'red' }}>{this.state.error}</Text>
                    )}
                    <Button
                        title="Buscar Carreras"
                        color="#7fb850"
                        disabled={this.state.loading}
                        onPress={() => {
                            if (this.state.texto.trim() === "") {
                                this.setState(() => ({ error: "Se requiere una palabra." }));
                                this.setState(() => ({ texto: "" }));
                            } else if (this.state.texto.trim().length < 5) {
                                this.setState(() => ({ error: "Se requiere una palabra con más de 4 caracteres." }));
                                this.setState(() => ({ texto: "" }));
                            } else {
                                this.setState(() => ({ error: null }))
                                this.buscar(this.state.texto)
                            }
                            // this.props.navigation.navigate('EstablecimientoDetalle')
                        }}
                    />
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <Switch
                            onValueChange={(value) => 
                                {this.setState({ switchValue: value })
                                    if(value){                                        
                                        getPosition(this)
                                    }
                                }
                            }
                            value={this.state.switchValue}
                            disabled={this.state.loading}
                            tintColor= '#0009'
                            onTintColor= '#7fb850'
                            thumbTintColor= '#ffffff'
                        />
                        <Text style={styles.text}>{' Buscar establecimientos cercanos'}</Text>
                        {this.state.loading && (
                        <ActivityIndicator
                            animating={true}
                            color='#ffffff'
                            size='small'
                        />)}
                    </View>
                    
                </View>
            </ImageBackground>

        );
    }

}

const styles = StyleSheet.create({
    PantallaInicio: {
        flex: 1,
        //margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'flex-end',
    },
    Container: {
        flex: 2,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'flex-end',
    },
    bold: {
        fontFamily: "Montserrat-Bold",
        color: "#ffffff",
    },
    mainTitle: {
        fontSize: 45,
        padding: 10,
        textAlign: 'center',
        color: "#ffffffb3",
        fontFamily: "Montserrat",
    },
    title: {
        fontSize: 18,
        //padding: 10,
        textAlign: 'center',
        color: "#ffffff",
        fontFamily: "SourceSansPro-Light",
    },
    TextInputStyle: {
        margin: 10,
        textAlign: 'center',
        // color: 'white',
        height: 40,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 7,
        backgroundColor: '#0009',
        // color: (this.state.landscape === true) ? 'black' : 'white'   
        // height: (Platform.OS === 'ios') ? 200 : 100     
    },
    imageHeader: {
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // margin: 20,
        // resizeMode: 'cover'
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        //resizeMode: 'cover'
    },
    line: {
        margin: 30,
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
    },
    text: {
        fontSize: 14,
        textAlign: 'left',
        color: '#ffffff',
        fontFamily: "SourceSansPro",
        margin: 10
    },
});

const checkUrl = (url) => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (regex.test(url)) {
        var http = /^http?:\//
        var regexhttp = RegExp(http)
        var http2 = /^http?:\/\//
        var regexhttp2 = RegExp(http2)
        var https = /^https?:\/\//
        var regexhttps = RegExp(https)
        var httpbarra = /^http?\/\//
        var regexhttpbarra = RegExp(httpbarra)

        if(regexhttps.test(url)){
            url = url.replace(/^https?:\/\//,'')
            console.log('https://')
        }

        if(regexhttp2.test(url)){
            url = url.replace(/^http?:\/\//,'')
            console.log('http://')
        }

        if(regexhttp.test(url)){
            url = url.replace(/^http?:\//,'')
            console.log('http:/')
        }

        if(regexhttpbarra.test(url)){
            url = url.replace(/^http?\/\//,'')
            console.log('http//')
        }

        return url
    }
    return ''
}

const arrayUrl = (cadena) => {
    let urls = clearUrl(cadena)
    // console.log(cadena)
    let arrayAux = []
    let resultCheck = ''
    urls.forEach(function (v, index, initial_array){
        resultCheck = checkUrl(v.toString())
        if ( resultCheck != '' ){
            arrayAux.push(resultCheck)
        }
    })
    return arrayAux
}

var locOrientaciones = "http://200.32.52.6:8083/api/localizacionesOrientaciones/?text="
var localizaciones = "http://200.32.52.6:8082/api/localizacion/";
var orientaciones = 'http://200.32.52.6:8083/api/localizacionesOrientaciones?orientaciones='
var orientacion = 'http://200.32.52.6:8083/api/orientacion'
var accentMap = { "ẚ": "a", "Á": "a", "á": "a", "À": "a", "à": "a", "Ă": "a", "ă": "a", "Ắ": "a", "ắ": "a", "Ằ": "a", "ằ": "a", "Ẵ": "a", "ẵ": "a", "Ẳ": "a", "ẳ": "a", "Â": "a", "â": "a", "Ấ": "a", "ấ": "a", "Ầ": "a", "ầ": "a", "Ẫ": "a", "ẫ": "a", "Ẩ": "a", "ẩ": "a", "Ǎ": "a", "ǎ": "a", "Å": "a", "å": "a", "Ǻ": "a", "ǻ": "a", "Ä": "a", "ä": "a", "Ǟ": "a", "ǟ": "a", "Ã": "a", "ã": "a", "Ȧ": "a", "ȧ": "a", "Ǡ": "a", "ǡ": "a", "Ą": "a", "ą": "a", "Ā": "a", "ā": "a", "Ả": "a", "ả": "a", "Ȁ": "a", "ȁ": "a", "Ȃ": "a", "ȃ": "a", "Ạ": "a", "ạ": "a", "Ặ": "a", "ặ": "a", "Ậ": "a", "ậ": "a", "Ḁ": "a", "ḁ": "a", "Ⱥ": "a", "ⱥ": "a", "Ǽ": "a", "ǽ": "a", "Ǣ": "a", "ǣ": "a", "Ḃ": "b", "ḃ": "b", "Ḅ": "b", "ḅ": "b", "Ḇ": "b", "ḇ": "b", "Ƀ": "b", "ƀ": "b", "ᵬ": "b", "Ɓ": "b", "ɓ": "b", "Ƃ": "b", "ƃ": "b", "Ć": "c", "ć": "c", "Ĉ": "c", "ĉ": "c", "Č": "c", "č": "c", "Ċ": "c", "ċ": "c", "Ç": "c", "ç": "c", "Ḉ": "c", "ḉ": "c", "Ȼ": "c", "ȼ": "c", "Ƈ": "c", "ƈ": "c", "ɕ": "c", "Ď": "d", "ď": "d", "Ḋ": "d", "ḋ": "d", "Ḑ": "d", "ḑ": "d", "Ḍ": "d", "ḍ": "d", "Ḓ": "d", "ḓ": "d", "Ḏ": "d", "ḏ": "d", "Đ": "d", "đ": "d", "ᵭ": "d", "Ɖ": "d", "ɖ": "d", "Ɗ": "d", "ɗ": "d", "Ƌ": "d", "ƌ": "d", "ȡ": "d", "ð": "d", "É": "e", "Ə": "e", "Ǝ": "e", "ǝ": "e", "é": "e", "È": "e", "è": "e", "Ĕ": "e", "ĕ": "e", "Ê": "e", "ê": "e", "Ế": "e", "ế": "e", "Ề": "e", "ề": "e", "Ễ": "e", "ễ": "e", "Ể": "e", "ể": "e", "Ě": "e", "ě": "e", "Ë": "e", "ë": "e", "Ẽ": "e", "ẽ": "e", "Ė": "e", "ė": "e", "Ȩ": "e", "ȩ": "e", "Ḝ": "e", "ḝ": "e", "Ę": "e", "ę": "e", "Ē": "e", "ē": "e", "Ḗ": "e", "ḗ": "e", "Ḕ": "e", "ḕ": "e", "Ẻ": "e", "ẻ": "e", "Ȅ": "e", "ȅ": "e", "Ȇ": "e", "ȇ": "e", "Ẹ": "e", "ẹ": "e", "Ệ": "e", "ệ": "e", "Ḙ": "e", "ḙ": "e", "Ḛ": "e", "ḛ": "e", "Ɇ": "e", "ɇ": "e", "ɚ": "e", "ɝ": "e", "Ḟ": "f", "ḟ": "f", "ᵮ": "f", "Ƒ": "f", "ƒ": "f", "Ǵ": "g", "ǵ": "g", "Ğ": "g", "ğ": "g", "Ĝ": "g", "ĝ": "g", "Ǧ": "g", "ǧ": "g", "Ġ": "g", "ġ": "g", "Ģ": "g", "ģ": "g", "Ḡ": "g", "ḡ": "g", "Ǥ": "g", "ǥ": "g", "Ɠ": "g", "ɠ": "g", "Ĥ": "h", "ĥ": "h", "Ȟ": "h", "ȟ": "h", "Ḧ": "h", "ḧ": "h", "Ḣ": "h", "ḣ": "h", "Ḩ": "h", "ḩ": "h", "Ḥ": "h", "ḥ": "h", "Ḫ": "h", "ḫ": "h", H: "h", "̱": "h", "ẖ": "h", "Ħ": "h", "ħ": "h", "Ⱨ": "h", "ⱨ": "h", "Í": "i", "í": "i", "Ì": "i", "ì": "i", "Ĭ": "i", "ĭ": "i", "Î": "i", "î": "i", "Ǐ": "i", "ǐ": "i", "Ï": "i", "ï": "i", "Ḯ": "i", "ḯ": "i", "Ĩ": "i", "ĩ": "i", "İ": "i", i: "i", "Į": "i", "ı": "i", "į": "i", "Ī": "i", "ī": "i", "Ỉ": "i", "ỉ": "i", "Ȉ": "i", "ȉ": "i", "Ȋ": "i", "ȋ": "i", "Ị": "i", "ị": "i", "Ḭ": "i", "ḭ": "i", I: "i", "ı": "i", "Ɨ": "i", "ɨ": "i", "Ĵ": "j", "ĵ": "j", J: "j", "̌": "j", "ǰ": "j", "ȷ": "j", "Ɉ": "j", "ɉ": "j", "ʝ": "j", "ɟ": "j", "ʄ": "j", "Ḱ": "k", "ḱ": "k", "Ǩ": "k", "ǩ": "k", "Ķ": "k", "ķ": "k", "Ḳ": "k", "ḳ": "k", "Ḵ": "k", "ḵ": "k", "Ƙ": "k", "ƙ": "k", "Ⱪ": "k", "ⱪ": "k", "Ĺ": "a", "ĺ": "l", "Ľ": "l", "ľ": "l", "Ļ": "l", "ļ": "l", "Ḷ": "l", "ḷ": "l", "Ḹ": "l", "ḹ": "l", "Ḽ": "l", "ḽ": "l", "Ḻ": "l", "ḻ": "l", "Ł": "l", "ł": "l", "Ł": "l", "̣": "l", "ł": "l", "̣": "l", "Ŀ": "l", "ŀ": "l", "Ƚ": "l", "ƚ": "l", "Ⱡ": "l", "ⱡ": "l", "Ɫ": "l", "ɫ": "l", "ɬ": "l", "ɭ": "l", "ȴ": "l", "Ḿ": "m", "ḿ": "m", "Ṁ": "m", "ṁ": "m", "Ṃ": "m", "ṃ": "m", "ɱ": "m", "Ń": "n", "ń": "n", "Ǹ": "n", "ǹ": "n", "Ň": "n", "ň": "n", "Ñ": "n", "ñ": "n", "Ṅ": "n", "ṅ": "n", "Ņ": "n", "ņ": "n", "Ṇ": "n", "ṇ": "n", "Ṋ": "n", "ṋ": "n", "Ṉ": "n", "ṉ": "n", "Ɲ": "n", "ɲ": "n", "Ƞ": "n", "ƞ": "n", "ɳ": "n", "ȵ": "n", N: "n", "̈": "n", n: "n", "̈": "n", "Ó": "o", "ó": "o", "Ò": "o", "ò": "o", "Ŏ": "o", "ŏ": "o", "Ô": "o", "ô": "o", "Ố": "o", "ố": "o", "Ồ": "o", "ồ": "o", "Ỗ": "o", "ỗ": "o", "Ổ": "o", "ổ": "o", "Ǒ": "o", "ǒ": "o", "Ö": "o", "ö": "o", "Ȫ": "o", "ȫ": "o", "Ő": "o", "ő": "o", "Õ": "o", "õ": "o", "Ṍ": "o", "ṍ": "o", "Ṏ": "o", "ṏ": "o", "Ȭ": "o", "ȭ": "o", "Ȯ": "o", "ȯ": "o", "Ȱ": "o", "ȱ": "o", "Ø": "o", "ø": "o", "Ǿ": "o", "ǿ": "o", "Ǫ": "o", "ǫ": "o", "Ǭ": "o", "ǭ": "o", "Ō": "o", "ō": "o", "Ṓ": "o", "ṓ": "o", "Ṑ": "o", "ṑ": "o", "Ỏ": "o", "ỏ": "o", "Ȍ": "o", "ȍ": "o", "Ȏ": "o", "ȏ": "o", "Ơ": "o", "ơ": "o", "Ớ": "o", "ớ": "o", "Ờ": "o", "ờ": "o", "Ỡ": "o", "ỡ": "o", "Ở": "o", "ở": "o", "Ợ": "o", "ợ": "o", "Ọ": "o", "ọ": "o", "Ộ": "o", "ộ": "o", "Ɵ": "o", "ɵ": "o", "Ṕ": "p", "ṕ": "p", "Ṗ": "p", "ṗ": "p", "Ᵽ": "p", "Ƥ": "p", "ƥ": "p", P: "p", "̃": "p", p: "p", "̃": "p", "ʠ": "q", "Ɋ": "q", "ɋ": "q", "Ŕ": "r", "ŕ": "r", "Ř": "r", "ř": "r", "Ṙ": "r", "ṙ": "r", "Ŗ": "r", "ŗ": "r", "Ȑ": "r", "ȑ": "r", "Ȓ": "r", "ȓ": "r", "Ṛ": "r", "ṛ": "r", "Ṝ": "r", "ṝ": "r", "Ṟ": "r", "ṟ": "r", "Ɍ": "r", "ɍ": "r", "ᵲ": "r", "ɼ": "r", "Ɽ": "r", "ɽ": "r", "ɾ": "r", "ᵳ": "r", "ß": "s", "Ś": "s", "ś": "s", "Ṥ": "s", "ṥ": "s", "Ŝ": "s", "ŝ": "s", "Š": "s", "š": "s", "Ṧ": "s", "ṧ": "s", "Ṡ": "s", "ṡ": "s", "ẛ": "s", "Ş": "s", "ş": "s", "Ṣ": "s", "ṣ": "s", "Ṩ": "s", "ṩ": "s", "Ș": "s", "ș": "s", "ʂ": "s", S: "s", "̩": "s", s: "s", "̩": "s", "Þ": "t", "þ": "t", "Ť": "t", "ť": "t", T: "t", "̈": "t", "ẗ": "t", "Ṫ": "t", "ṫ": "t", "Ţ": "t", "ţ": "t", "Ṭ": "t", "ṭ": "t", "Ț": "t", "ț": "t", "Ṱ": "t", "ṱ": "t", "Ṯ": "t", "ṯ": "t", "Ŧ": "t", "ŧ": "t", "Ⱦ": "t", "ⱦ": "t", "ᵵ": "t", "ƫ": "t", "Ƭ": "t", "ƭ": "t", "Ʈ": "t", "ʈ": "t", "ȶ": "t", "Ú": "u", "ú": "u", "Ù": "u", "ù": "u", "Ŭ": "u", "ŭ": "u", "Û": "u", "û": "u", "Ǔ": "u", "ǔ": "u", "Ů": "u", "ů": "u", "Ü": "u", "ü": "u", "Ǘ": "u", "ǘ": "u", "Ǜ": "u", "ǜ": "u", "Ǚ": "u", "ǚ": "u", "Ǖ": "u", "ǖ": "u", "Ű": "u", "ű": "u", "Ũ": "u", "ũ": "u", "Ṹ": "u", "ṹ": "u", "Ų": "u", "ų": "u", "Ū": "u", "ū": "u", "Ṻ": "u", "ṻ": "u", "Ủ": "u", "ủ": "u", "Ȕ": "u", "ȕ": "u", "Ȗ": "u", "ȗ": "u", "Ư": "u", "ư": "u", "Ứ": "u", "ứ": "u", "Ừ": "u", "ừ": "u", "Ữ": "u", "ữ": "u", "Ử": "u", "ử": "u", "Ự": "u", "ự": "u", "Ụ": "u", "ụ": "u", "Ṳ": "u", "ṳ": "u", "Ṷ": "u", "ṷ": "u", "Ṵ": "u", "ṵ": "u", "Ʉ": "u", "ʉ": "u", "Ṽ": "v", "ṽ": "v", "Ṿ": "v", "ṿ": "v", "Ʋ": "v", "ʋ": "v", "Ẃ": "w", "ẃ": "w", "Ẁ": "w", "ẁ": "w", "Ŵ": "w", "ŵ": "w", W: "w", "̊": "w", "ẘ": "w", "Ẅ": "w", "ẅ": "w", "Ẇ": "w", "ẇ": "w", "Ẉ": "w", "ẉ": "w", "Ẍ": "x", "ẍ": "x", "Ẋ": "x", "ẋ": "x", "Ý": "y", "ý": "y", "Ỳ": "y", "ỳ": "y", "Ŷ": "y", "ŷ": "y", Y: "y", "̊": "y", "ẙ": "y", "Ÿ": "y", "ÿ": "y", "Ỹ": "y", "ỹ": "y", "Ẏ": "y", "ẏ": "y", "Ȳ": "y", "ȳ": "y", "Ỷ": "y", "ỷ": "y", "Ỵ": "y", "ỵ": "y", "ʏ": "y", "Ɏ": "y", "ɏ": "y", "Ƴ": "y", "ƴ": "y", "Ź": "z", "ź": "z", "Ẑ": "z", "ẑ": "z", "Ž": "z", "ž": "z", "Ż": "z", "ż": "z", "Ẓ": "z", "ẓ": "z", "Ẕ": "z", "ẕ": "z", "Ƶ": "z", "ƶ": "z", "Ȥ": "z", "ȥ": "z", "ʐ": "z", "ʑ": "z", "Ⱬ": "z", "ⱬ": "z", "Ǯ": "z", "ǯ": "z", "ƺ": "z", "２": "2", "６": "6", "Ｂ": "B", "Ｆ": "F", "Ｊ": "J", "Ｎ": "N", "Ｒ": "R", "Ｖ": "V", "Ｚ": "Z", "ｂ": "b", "ｆ": "f", "ｊ": "j", "ｎ": "n", "ｒ": "r", "ｖ": "v", "ｚ": "z", "１": "1", "５": "5", "９": "9", "Ａ": "A", "Ｅ": "E", "Ｉ": "I", "Ｍ": "M", "Ｑ": "Q", "Ｕ": "U", "Ｙ": "Y", "ａ": "a", "ｅ": "e", "ｉ": "i", "ｍ": "m", "ｑ": "q", "ｕ": "u", "ｙ": "y", "０": "0", "４": "4", "８": "8", "Ｄ": "D", "Ｈ": "H", "Ｌ": "L", "Ｐ": "P", "Ｔ": "T", "Ｘ": "X", "ｄ": "d", "ｈ": "h", "ｌ": "l", "ｐ": "p", "ｔ": "t", "ｘ": "x", "３": "3", "７": "7", "Ｃ": "C", "Ｇ": "G", "Ｋ": "K", "Ｏ": "O", "Ｓ": "S", "Ｗ": "W", "ｃ": "c", "ｇ": "g", "ｋ": "k", "ｏ": "o", "ｓ": "s", "ｗ": "w" };

const normalize = (term) => {
    var ret = "";
    for (var i = 0; i < term.length; i++) { ret += accentMap[term.charAt(i)] || term.charAt(i); }
    return ret.toLowerCase();
};

const getIdsOrientaciones = (result, palabra) => {
    palabra = normalize(palabra);
    let auxOrientacion = [];
    result.forEach(function (v, index, initial_array) {
        auxOrientacion.push(v.id)
    });
    // console.log(auxOrientacion)
    return auxOrientacion;
}

const getIdsCueAnexos = (result) => {
    // palabra = normalize(palabra);
    let auxCueAnexos = [];
    result.forEach(function (v, index, initial_array) {
        auxCueAnexos.push(v.id)
    });
    // console.log(auxCueAnexos)
    return auxCueAnexos;
}

const clear = (palabras) => {
    let aux = [];
    palabras.split(" ").forEach(unaPalabra => { if (unaPalabra.length >= 4) { aux.push(unaPalabra); } });
    return aux.join();
}

const clearUrl = (palabras) => {
    let aux = [];
    palabras.split(" ").forEach(unaPalabra => { if (unaPalabra.length >= 4) { aux.push(unaPalabra); } });
    return aux;
}

const mergearEscuelas = (localizacionesOrientaciones, localizaciones) => {
    // let cueAnexos=stringCueAnexos(localizacionesOrientaciones);
    let all = [];
    localizacionesOrientaciones.forEach(locOri => {
        let auxLoc = {};
        localizaciones.forEach(localizacion => {
            if (locOri.id == localizacion.id) {
                auxLoc = localizacion;
                auxLoc.orientaciones = locOri.orientaciones;
                all.push(auxLoc);
            }
        });
    });
    return all;
}

const filtrarEntrada = (result, palabra) => {
    palabra = normalize(palabra).split(',').join('|')
    // console.log(palabra)
    let auxEstab = [];
    result.forEach(function (v, index, initial_array) {
        let auxOrientacion = [];
        let flagEstab = false;
        v.orientaciones.forEach(function (o, index, initial_array) {
            let regex = new RegExp(palabra)
            if (regex.test(normalize(o.nombre)) || regex.test(normalize(o.palabras.toString()))) {
                //al menos una coincidencia
                flagEstab = true; auxOrientacion.push(o);
                // console.log(auxOrientacion)
            }
        });
        if (flagEstab) { v.orientaciones = auxOrientacion; auxEstab.push(v); }
    });
    // console.log(auxEstab)
    return auxEstab;
}

const getPosition = async (contex) => {
    contex.setState({
        loading: true
    })
    if(contex.state.permiso){        
        await navigator.geolocation.getCurrentPosition(
                (position) => {
                    contex.setState({
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude,
                    errorGeo: null,
                  });
                },
                (error) => contex.setState({ errorGeo: error.message }),
                { enableHighAccuracy: true, timeout: 20000 },
              );
    }else{
        contex.toastMessage('No se concedieron los permisos de Geolocalización', ToastAndroid.LONG, ToastAndroid.BOTTOM) 
    }
    console.log('loading 1 ' + contex.state.loading)
    setTimeout(() => {
        if(contex.state.longitud == -57.875989 || contex.state.latitud == -28.784948){
            console.log('error al recuperar la geo')
            contex.setState({
                switchValue: false
            })
            contex.toastMessage('No se pudo obtener su ubicación, verifique si se encuentra encendido su GPS e inténtelo nuevamente', ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }
        // console.log('latitud ' + contex.state.latitud)
        // console.log('longitud '+ contex.state.longitud)
        contex.setState({
            loading: false
        })
        // console.log('loading 2 ' + contex.state.loading)
    },10000)
}

const requestGeoPermission = async (ctx) => {    
    const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)    
    if (chckLocationPermission) {
        // alert('se concedieron los permisos') 
        ctx.setState({
            permiso: true
        })       
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Permiso de geolocalización',
                    'message': 'Se requiere permiso para acceder a la geolocalización de tu dispositivo para usar esta característica'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // alert("You can use geo")
                ctx.setState({
                    permiso: true
                })
            } else {
                ctx.setState({
                    permiso: false
                })
                // alert("geo permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }   
}

setPosition = (position) => {   
    this.setState({
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
    })
}
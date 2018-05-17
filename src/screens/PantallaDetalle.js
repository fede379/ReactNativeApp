import React from 'react';
import { Button, View, Text, TextInput, ListView, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { StackNavigator, Navigator } from 'react-navigation'; // Version can be specified in package.json
import { Establecimiento } from '../components/Establecimiento';
import { InfoButton } from '../components/InfoButton';
import FontAwesome, { Icons } from 'react-native-fontawesome';//font-awesome   

export class PantallaDetalle extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props.navigation
    const { params } = this.props.navigation.state;
    this.busqueda = params ? params.busqueda : null;    
    // this.arrayholder = params ? params.arrayholder : null;

    this.state = {
      text: '',
      dataSource: this.busqueda,
      arrayholder: this.busqueda
    }
  }

  getBusqueda = () =>{
    return this.busqueda
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
  SearchFilterFunction(text){
    // console.log('arrayholder: ' + this.state.arrayholder)
    // console.log('dataSource: ' + this.state.dataSource)
    const newData = this.state.dataSource.filter((item) => {
      //contenido por el que se va a filtrar la busqueda
      const itemData = item.localidad.toUpperCase()
      // console.log("nombre: "+ itemData)
      const textData = text.toUpperCase()
      // console.log("textData "+textData)
      //búsqueda de coincidencias de la descripcion con el text ingresado
      return itemData.indexOf(textData) > -1
    })
    console.log(newData)
    this.setState({
    //cambiamos el estado del dataSource con el newData obtenido del filtrado
    //y del texto en la caja de búsqueda
      arrayholder: newData,
      text: text
    })
   }

   searchZeroCoords = (data) => {     
     let aux = data.filter(x => (x.coordinates.latitude != 0 && x.coordinates.longitude != 0))     
    if (aux.length == 0) {
      return true
    }
    return false
   }

  render() {
      /* 2. Read the params from the navigation state */
      // const { params } = this.props.navigation.state;
      // const busqueda = params ? params.busqueda : null;

        if(this.state.dataSource.length > 0){
           return (<ImageBackground source={require('../img/bg.jpg')}
           onLayout={this.navigationState}
           style={styles.PantallaDetalle}
           imageStyle={styles.backgroundImage}>
           <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center' }}>          
              <View> 
                <View style={styles.inputSection}>
                 <Text style={styles.icon}>
                   <FontAwesome>{Icons.filter}</FontAwesome>
                  </Text>
                 <TextInput
                   style={styles.TextInputStyleClass}
                   keyboardType={'email-address'}
                   autoCorrect={false}
                   clearButtonMode={'while-editing'}    
                   placeholder=" Filtrar por localidad"
                   onChangeText={(text) => this.SearchFilterFunction(text)}
                   underlineColorAndroid="transparent"
                 />
               </View>
               <Text style={styles.count}>{"Cantidad de resultados: " + this.state.arrayholder.length}</Text>
              </View>             
               <FlatList
                 keyboardDismissMode={"on-drag"}
                 data={this.state.arrayholder}
                 renderItem={({ item }, navigation) => <Establecimiento row={item} navigation={this.props.navigation}></Establecimiento>}
               />
               <View style={styles.viewButton}>
                 <Button                   
                   disabled={this.searchZeroCoords(this.state.arrayholder)}
                   title='Ver en el mapa'
                   color="#7fb850"
                   onPress={() => {                     
                     this.props.navigation.navigate('Mapa', {
                       datos: this.state.arrayholder,
                     })
                   }}
                 />    
               </View> 
                     
           </View>
         </ImageBackground>)
        } else {
           return (<ImageBackground source={require('../img/bg.jpg')}
           style={styles.PantallaDetalle}
           imageStyle={styles.backgroundImage}>
           <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center' }}>          
             <Text style={{fontSize: 22,
                  textAlign: 'center',
                  color: "#ffffff",
                  fontFamily: "SourceSansPro-Light"}}>No se encontraron coincidencias</Text>
           </View>
         </ImageBackground>)
        }
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EAEAEA'
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
    },
    PantallaDetalle: {
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
    TextInputStyleClass:{
      // marginLeft: 15,
      // marginRight: 15,
      // marginBottom: 5,
      // marginTop: 10,
      textAlign: 'left',
      height: 40,
      // borderBottomWidth: 2,
      // borderRightWidth: 2,
      color: '#4c4c4c',
      // borderColor: '#3A7F00',
      // borderRadius: 5,
      backgroundColor: "transparent",
      fontFamily: "SourceSansPro",
      flex: 1,
      },
      inputSection:{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',        
        borderBottomWidth: 2,
        borderRightWidth: 2,        
        borderColor: '#7fb850',
        borderRadius: 5,
        backgroundColor: "white",
      },
    icon: {
      fontSize: 22,
      color: "#4c4c4c",
      flex: 0,      
      margin: 10,
    },
    viewButton: {      
      margin: 5,
      // marginTop: -5,      
    },
    count: {      
      fontSize: 16,
      textAlign: 'center',
      color: '#ffffff',
      fontFamily: "SourceSansPro",      
      marginBottom: 5
    }
  }) 
  
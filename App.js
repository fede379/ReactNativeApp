import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { PantallaDetalle } from './src/screens/PantallaDetalle';
import { PantallaInicio } from './src/screens/PantallaInicio';
import { About } from './src/screens/About';
import { EstablecimientoDetalle } from './src/screens/PantallaEstablecimientoDetalle'
import { withNavigationPreventDuplicate } from './src/components/navigation'
import { PantallaMapa } from './src/screens/PantallaMapa';


const RootStack = StackNavigator(
  {
    Inicio: {
      screen: PantallaInicio,
    },
    Detalle: {
      screen: PantallaDetalle,
    },
    About: {
      screen: About,
    },
    EstablecimientoDetalle: {
      screen: EstablecimientoDetalle,
    },
    Mapa: {
      screen: PantallaMapa,
    },
  },
  {
    initialRouteName: 'Inicio',
  }
);

RootStack.router.getStateForAction = withNavigationPreventDuplicate(
  RootStack.router.getStateForAction
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }  
}
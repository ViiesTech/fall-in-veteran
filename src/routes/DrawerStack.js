import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

import Shop from '../screens/mainScreens/Shop';
import CustomDrawer from '../components/Drawer/CustomDrawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
    screenOptions={{
      headerShown:false,
      drawerStyle: {
        width:'100%',
        height:'100%'
      },
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
 
  >

      <Drawer.Screen name="Shopp" component={Shop} />
    </Drawer.Navigator>
  );
}

export default MyDrawer
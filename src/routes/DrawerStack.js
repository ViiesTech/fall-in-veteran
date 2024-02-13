import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions, SafeAreaView } from 'react-native';

import Shop from '../screens/mainScreens/Shop';
import CustomDrawer from '../components/Drawer/CustomDrawer'


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: '100%',
            height: '100%'
          },
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}

      >

        <Drawer.Screen name="Shopp" component={Shop} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

export default MyDrawer
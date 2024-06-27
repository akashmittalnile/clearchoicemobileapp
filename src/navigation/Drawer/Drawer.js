import {createDrawerNavigator} from '@react-navigation/drawer';
import Notification from '../../screens/Notification/Notification'
import TabNavigator from '../BottomTab/BottomTab';
import CustomDrawer from './CustomDrawer'

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
<Drawer.Navigator 
initialRouteName="ButtomTab"
headerMode={null}
screenOptions={{ headerShown: false ,drawerWidth:'100%'}}
drawerWidth={'100%'}
drawerContent={(props) => <CustomDrawer {...props} />}
>
    <Drawer.Screen name="ButtomTab" options={{headerShown: false}} component={TabNavigator} />
    <Drawer.Screen name="Notification" options={{headerShown: false}} component={Notification} />

  </Drawer.Navigator>
);
export default DrawerNavigator;

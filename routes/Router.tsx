import { NavigationContainer } from "@react-navigation/native";
import DrawerRoute from "./DrawerRoute";

export default function Router() {
  return (
    <NavigationContainer>
      <DrawerRoute />
    </NavigationContainer>
  );
}

import "react-native-gesture-handler";
import { SafeAreaView as SafeAreaViewIos } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import Router from "./routes/Router";
import { ThemeColor } from "./context/ThemeColor";


export default function App() {
  const colors = {
    blue: "#021F3A",
    grey: "#E1E1E1",
    greyDark: "#838383",
    white: "#F7F7F7",
    black: "#0E0E0E",
  };

  return (
    <ThemeColor.Provider value={colors}>
      <SafeAreaViewIos style={{ flex: 1 }}>
        <SafeAreaViewAndroid style={{ flex: 1 }}>
          <Router />
        </SafeAreaViewAndroid>
      </SafeAreaViewIos>
    </ThemeColor.Provider>
  );
}

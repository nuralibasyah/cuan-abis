import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import { useActiveMenu } from "react-active-menu";

export default function MainPage({ navigation }) {
  const { registerSection, registerTrigger } = useActiveMenu({
    offset: 60,
    smooth: true,
  });

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.Header}>
        <Text style={{ color: "white", }}>Catatan Keuangan</Text>
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../assets/LogOut.png")}
        />
      </View>
      <View style={styles.ActiveMenu}>
        <Text>Pengeluaran</Text>
        <Text>Pemasukan</Text>
        <Text>Laporan</Text>
      </View>
      <View style={styles.Kalkulasi}>
        <View style={styles.Value}></View>
        <View style={styles.Value}></View>
      </View>
      <ScrollView>
        <View style={styles.Rekap}></View>
      </ScrollView>
      <TouchableOpacity style={styles.buttonCatatan} onPress={navigation}>
        <Text
          style={{
            justifyContent: "center",
            color: "#ffff",
            fontWeight: 600,
          }}
        >
          Buat Catatan Baru
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#00A39D",
    flex: 1,
    alignItems: "center",
  },
  Header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 10,
  },
  ActiveMenu: {
    height: 27,
    width: 325,
    backgroundColor: "#f1f1f1",
    borderRadius: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  Kalkulasi: {
    width: "100%",
    height: 80,
    backgroundColor: "#f1f1f1",
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  Value: {
    height: 60,
    width: 170,
    backgroundColor: "#00A39D",
    borderRadius: 20,
    marginTop: 10,
  },
  Rekap: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
  },
  buttonCatatan: {
    width: "90%",
    height: 55,
    backgroundColor: "#F9B754",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

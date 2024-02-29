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
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";


export default function Login({ navigation }) {
  const [username, setUserName] = useState(" ");
  const [userNameVerify, setUserNameVerify] = useState(false);
  const [email, setEmail] = useState(" ");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState(" ");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(" ");
  const [passwordVerifyConfirm, setPasswordVerifyConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Rubik": require("../fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../fonts/Rubik-Light.ttf"),
    "Rubik-Bold": require("../fonts/Rubik-Bold.ttf"),
    "Rubik-SemiBold": require("../fonts/Rubik-SemiBold.ttf"),
  });


  const handleRegister = () => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    if (userNameVerify && emailVerify && passwordVerify) {
      axios
        .post("http://localhost:3000/registration", userData)
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "ok") {
            Alert.alert("Register Done!");
            setModalVisible(false);
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })

        .catch((e) => console.log(e));
    } else {
      Alert.alert("Lengkapi data anda!");
    }
  };

  const handleUserName = (n) => {
    console.log(n.nativeEvent.text);
    const userNameVar = n.nativeEvent.text;
    setUserName(userNameVar);
    setUserNameVerify(false);
    if (userNameVar.length > 4) {
      setUserNameVerify(true);
    }
  };

  const handleEmail = (e) => {
    console.log(e.nativeEvent.text);
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  };

  const handlePassword = (p) => {
    console.log(p.nativeEvent.text);
    const passwordVar = p.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(false);
    if (passwordVar.length > 4) {
      setPassword(passwordVar);
      setPasswordVerify(true);
    }
  };

  const handlePasswordConfirm = (p1) => {
    console.log(p1.nativeEvent.text);
    const passwordVarConfirm = p1.nativeEvent.text;
    setPasswordConfirm(passwordVarConfirm);
    setPasswordVerifyConfirm(true);
  };

  const toggleShowPasswordLogin = () => {
    setShowPassword(!showPassword);
    setPasswordVerify(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setPasswordVerify(true);
  };

  const handleLogin = () => {
    const userData = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:3000/login", userData)
      .then((res) => {
        const { token, email } = res.data;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("email", email);
        navigation.navigate("Leaderboard");
        if (res.data.status == "ok") {
          Alert.alert("Selamat Bermain!");
        } else {
          Alert.alert(JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        Alert.alert("Coba Lagi!");
      });
  };

  return (
    <ImageBackground resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
          <ScrollView>
            <KeyboardAvoidingView behavior={"position"} enabled={true}>
              <View style={styles.deskripsiGroup}>
                <View>
                  <Text style={styles.title}>Masuk ke Akun</Text>
                </View>
                <SafeAreaView style={styles.form}>
                  <View>
                    <View style={styles.inputBoxLogin}>
                      <TextInput
                        style={styles.input}
                        placeholder="Username atau Email"
                        onChange={(n) => handleUserName(n)}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.inputBoxLogin}>
                      <TextInput
                        style={styles.input}
                        placeholder="Kata Sandi"
                        secureTextEntry={!showPassword}
                        onChange={(p) => handlePassword(p)}
                      />
                      <MaterialCommunityIcons
                        name={!showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="#aaa"
                        onPress={toggleShowPasswordLogin}
                        style={styles.icon}
                      />
                    </View>
                  </View>
                </SafeAreaView>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={handleLogin}
                  >
                    <Text style={{justifyContent: "center", color:"#ffff", fontWeight:600}}>Masuk</Text>
                  </TouchableOpacity>
                  <View style={styles.buttonSignup}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Text style={styles.textButtonSignup}>Buat Akun Baru</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#00A39D",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flexDirection: "column",
    paddingHorizontal: 30,
    marginTop: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  input: {
    height: 40,
    width: "90%",
    fontFamily: "Rubik-Light",
    fontSize: 16,
    color:"#64748b"
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
    padding: 10,
    paddingHorizontal: 20,
    height: 40,
    width: 250,
  },
  inputBoxLogin: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    paddingHorizontal: 10,
    height: 40,
    width: 250,
    borderWidth:1,
    borderRadius:8,
    borderColor:"#e2e8f0",

  },

llertFalse: {
    color: "red",
    fontSize: 10,
    marginLeft: 10,
    marginTop: -10,
    fontFamily: "Rubik-Light",
  },
  inputAllertFalsePassword: {
    color: "red",
    fontSize: 10,
    marginLeft: 10,
    marginTop: -10,
    fontFamily: "Rubik-Light",
  },
  icon: {
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    padding: 30,
  },
  mainImage: {
    alignSelf: "center",
    width: 250,
    height: 250,
  },
  title: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  card: {
    flex: 1,
    borderRadius: 40,
    width: 400,
    height: 800,
    justifyContent: "center",
    alignItems: "center",
  },
  deskripsiGroup: {
    padding: 24,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems:"center",
    borderRadius: 20,
  },
  buttonGroup: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  textButton: {
    fontFamily: "Rubik-Medium",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  textButtonSignup: {
    fontFamily: "Rubik",
    fontWeight: "700",
    fontSize: 14,
    color: "#F8AD3C",
    textAlign: "center",
    paddingLeft: 6,
  },
  buttonLogin: {
    padding: 15,
    paddingHorizontal: 40,
    borderWidth: 0,
    margin: 10,
    borderRadius: 40,
    backgroundColor: "#F8AD3C",
  },

});

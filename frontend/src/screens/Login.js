import React, { useState } from 'react';
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
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";


export default function Login ( { navigation } ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded, fontError] = useFonts({
    Rubik: require("../fonts/Rubik-Regular.ttf"),
    "Rubik-Light": require("../fonts/Rubik-Light.ttf"),
    "Rubik-Bold": require("../fonts/Rubik-Bold.ttf"),
    "Rubik-SemiBold": require("../fonts/Rubik-SemiBold.ttf"),
  });

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };
    console.log(userData);
    axios.post('https://00a6-202-159-47-22.ngrok-free.app/login', userData)
      .then(response => {
        navigation.navigate("Main Page");
        // Handle successful login
      })
      .catch(error => {
        console.error(error);
        // Handle login error
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
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.inputBoxLogin}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                    />
                    
                  </View>
                </View>
              </SafeAreaView>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={handleLogin}
                >
                  <Text
                    style={{
                      justifyContent: "center",
                      color: "#ffff",
                      fontWeight: 600,
                    }}
                  >
                    Masuk
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonSignup}>
                  <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.textButtonSignup}>Buat Akun Baru</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>

    
    // <View style={styles.container}>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     onChangeText={text => setEmail(text)}
    //     value={email}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     onChangeText={text => setPassword(text)}
    //     value={password}
    //     secureTextEntry
    //   />
    //   <TouchableOpacity style={styles.button} onPress={handleLogin}>
    //     <Text style={styles.buttonText}>Login</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.button} onPress={() => console.log('Forgot Password')}>
    //     <Text style={styles.buttonText}>Forgot Password?</Text>
    //   </TouchableOpacity>
    // </View>
  );
};

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
    display: "grid",
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
    width: 250,
    fontFamily: "Rubik-Light",
    fontSize: 16,
    color: "#64748b",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
    padding: 10,
    paddingHorizontal: 20,
    height: 40,
  },
  inputBoxLogin: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    height: 40,
    width: 250,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e2e8f0",
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
    alignItems: "center",
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
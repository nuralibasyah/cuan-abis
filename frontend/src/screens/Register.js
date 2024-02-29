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
  Platform,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Register() {
  const [username, setUserName] = useState(" ");
  const [userNameVerify, setUserNameVerify] = useState(false);
  const [email, setEmail] = useState(" ");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState(" ");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(" ");
  const [passwordVerifyConfirm, setPasswordVerifyConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    const userData = {
      username: username,
      email: email,
      password: password,
    };
    if (userNameVerify && emailVerify && passwordVerify) {
      axios
        .post("http://localhost:3000/register", userData)
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "ok") {
            Alert.alert("Register Done!");
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

  return (
    <ImageBackground resizeMode="cover" style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior={"position"} enabled={true}>
            <View style={styles.deskripsiGroup}>
              <KeyboardAvoidingView
                behavior={"position"}
                enabled={true}
                keyboardVerticalOffset={Platform.OS === "ios" ? -200 : 0}
              >
                <ScrollView>
                  <View style={styles.viewModal}>
                    <View style={styles.modalCard}>
                      <Text style={styles.title}>Registrasi</Text>
                      <View>
                        <SafeAreaView style={styles.form}>
                          <View>
                            <View style={styles.inputBoxLogin}>
                              <TextInput
                                placeholder="Nama Pengguna"
                                onChange={(n) => handleUserName(n)}
                                style={styles.inputModal}
                              />
                            </View>
                            {username.length == 0 ? (
                              username.length > 4
                            ) : userNameVerify ? null : (
                              <Text style={styles.inputAllertFalse}>
                                Minimal 4 karakter!{" "}
                              </Text>
                            )}
                          </View>

                          <View>
                            <View style={styles.inputBoxLogin}>
                              <TextInput
                                placeholder="Email"
                                onChange={(e) => handleEmail(e)}
                                style={styles.inputModal}
                              />
                            </View>
                            {email.length == 0 ? (
                              email.length > 1
                            ) : emailVerify ? null : (
                              <Text style={styles.inputAllertFalse}>
                                Masukkan email yang benar!{" "}
                              </Text>
                            )}
                          </View>

                          <View>
                            <View style={styles.inputBoxLogin}>
                              <TextInput
                                placeholder="Kata Sandi"
                                secureTextEntry={!showPassword}
                                onChange={(p) => handlePassword(p)}
                                style={styles.inputModalPassword}
                              />

                              <MaterialCommunityIcons
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color="#aaa"
                                onPress={toggleShowPassword}
                                style={styles.icon}
                              />
                            </View>

                            {password.length == 0 ? (
                              password.length > 1
                            ) : passwordVerify ? null : (
                              <Text style={styles.inputAllertFalsePassword}>
                                Minimal 4 karakter!{" "}
                              </Text>
                            )}
                          </View>

                          <View>
                            <View style={styles.inputBoxLogin}>
                              <TextInput
                                placeholder="Kata Sandi"
                                secureTextEntry={!showPassword}
                                onChange={(p1) => handlePasswordConfirm(p1)}
                                style={styles.inputModalPassword}
                              />
                              <MaterialCommunityIcons
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color="#aaa"
                                onPress={toggleShowPassword}
                                style={styles.icon}
                              />
                            </View>
                            {passwordConfirm == password ? null : (
                              <Text style={styles.inputAllertFalsePassword}>
                                Kata sandi tidak sama!{" "}
                              </Text>
                            )}
                          </View>
                        </SafeAreaView>
                      </View>
                      <View style={styles.buttonGroup}>
                        <TouchableOpacity
                          style={styles.buttonLogin}
                          onPress={() => handleRegister()}
                        >
                          <Text
                            style={{
                              justifyContent: "center",
                              color: "#ffff",
                              fontWeight: 600,
                            }}
                          >
                            Daftar
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonCancel}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text
                            style={{
                              justifyContent: "center",
                              color: "#ffff",
                              fontWeight: 600,
                            }}
                          >
                            Batal
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
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
    width: 250,
  },
  inputBoxLogin: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    paddingHorizontal: 10,
    height: 40,
    width: 250,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e2e8f0",
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
  buttonCancel: {
    padding: 15,
    paddingHorizontal: 40,
    borderWidth: 0,
    margin: 10,
    borderRadius: 40,
    backgroundColor: "#FF0000",
  },
});

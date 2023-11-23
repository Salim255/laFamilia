import React, { useState } from "react";
import { Alert, View, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";

import { LinearGradient } from "expo-linear-gradient";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
      //navigation.navigate("Signup");
    } else {
      navigation.replace("Login");
      //navigation.navigate("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;
    email = email.trim();
    password = password.trim();
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 3;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entred credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      // onAuthenticate({ email, password });
      return;
    }
    // shuld be fild with scan result credentialsInvalid
    onAuthenticate({ email, password });
  }
  return (
    <LinearGradient
      colors={["#041e22", "#0b4e58", "#14899b", "#51bccd", "#0bd3f1"]}
      style={styles.rootScreen}
    >
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <View style={styles.btnInner}>
            <Pressable onPress={switchAuthModeHandler}>
              <Text style={styles.btnText}>{isLogin ? "create anew user" : "login"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 150,
    marginHorizontal: 32,
    padding: 16,

    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    flex: 0.5,
    position: "relative",
  },
  buttons: {
    position: "absolute",
    bottom: -60,
    left: "30%",
  },

  btnInner: {
    //backgroundColor: "red",
    //color: "#ff7700",
    alignItems: "center",
    padding: 6,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: 140,
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    textTransform: "capitalize",
  },
  scanner: {
    flex: 0.5,
    justifyContent: "center",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundIage: {
    opacity: 0.7,
  },
});

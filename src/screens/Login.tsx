import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "@react-navigation/native";

export default function Login() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Bem-vindo! Pronto para compartilhar amor? 😍
        </Text>
      </View>
      <View style={styles.form}>
        <Input placeholder="Seu Email" label="Email" inputMode="text" />
        <Input
          placeholder="Sua Senha"
          label="Senha"
          inputMode="text"
          inputInfo="8-32 caracteres"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => {}} title="Entrar" />
        <Text style={styles.registerText}>
          Não tem uma conta ainda?{" "}
          <Link to={{ screen: "Register" }} style={styles.registerLinkText}>
            Registre-se!
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 32,
  },
  header: {
    width: "100%",
  },
  title: {
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    color: COLORS.primaryBrown,
    marginBottom: -8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: COLORS.primaryGray,
  },
  form: {
    width: "100%",
    gap: 12,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  registerText: {
    fontFamily: "Poppins-Regular",
  },
  registerLinkText: {
    fontFamily: "Poppins-Bold",
    color: COLORS.primaryBrown,
  },
});

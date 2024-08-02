import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Input from "../components/Input";
import { COLORS } from "../constants/colors";
import Button from "../components/Button";
import { Link } from "@react-navigation/native";

export default function Register() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Crie Sua Conta!</Text>
        <Text style={styles.subtitle}>
          Aqui o amor enconta o seu espaço! 😍
        </Text>
      </View>
      <View style={styles.form}>
        <Input placeholder="Seu Nome" label="Nome" inputMode="text" />
        <Input placeholder="Seu Email" label="Email" inputMode="text" />
        <Input
          placeholder="Sua Senha"
          label="Senha"
          inputMode="text"
          inputInfo="8-32 caracteres"
          secureTextEntry
        />
        <Input
          placeholder="Confirme Sua Senha"
          label="Confirmação de senha"
          inputMode="text"
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => {}} title="Criar Conta" />
        <Text style={styles.registerText}>
          Já possui uma conta?{" "}
          <Link to={{ screen: "Login" }} style={styles.registerLinkText}>
            Faça Login!
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
    gap: 8,
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

import { View, Text, StyleSheet, ToastAndroid, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

type loginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({} as loginForm);
  const [isFormValid, setIsFormValid] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (attempts > 0) {
      validateForm();
    }
  }, [email, password]);

  const validateForm = () => {
    let errors = {} as loginForm;

    if (!email) {
      errors.email = "O Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido.";
    }

    if (!password) {
      errors.password = "A Senha é obrigatória.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.screenContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Bem-vindo! Pronto para compartilhar amor? 😍
        </Text>
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Seu Email"
          label="Email"
          inputMode="text"
          onChangeText={(e) => setEmail(e)}
          inputError={errors.email}
        />
        <Input
          placeholder="Sua Senha"
          label="Senha"
          inputMode="text"
          inputInfo="8-32 caracteres"
          secureTextEntry
          onChangeText={(e) => setPassword(e)}
          inputError={errors.password}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          isLoading={isLoading}
          onPress={async () => {
            setAttempts((prev) => prev + 1);
            validateForm();
            if (isFormValid) {
              setIsLoading(true);
              await auth
                .loginUser(email, password)
                .finally(() => setIsLoading(false));
            }
          }}
          title="Entrar"
        />
        <Text style={styles.registerText}>
          Não tem uma conta ainda?{" "}
          <Link to={{ screen: "Register" }} style={styles.registerLinkText}>
            Registre-se!
          </Link>
        </Text>
      </View>
    </ScrollView>
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

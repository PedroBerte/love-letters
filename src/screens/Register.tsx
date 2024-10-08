import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { COLORS } from "../constants/colors";
import Button from "../components/Button";
import { Link } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import PhotoSelector from "../components/PhotoSelector";

type registerForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const auth = useAuth();

  const [userPhotoUri, setUserPhotoUri] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({} as registerForm);
  const [isFormValid, setIsFormValid] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (attempts > 0) {
      validateForm();
    }
  }, [name, email, password, confirmPassword]);

  const validateForm = () => {
    let errors = {} as registerForm;

    if (!name) {
      errors.name = "O nome é obrigatório.";
    }

    if (!email) {
      errors.email = "O Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email inválido.";
    }

    if (!password) {
      errors.password = "A Senha é obrigatória.";
    } else if (password.length < 8) {
      errors.password = "A senha deve ter no mínimo 8 caracteres.";
    }

    if (password != confirmPassword) {
      errors.password = "As senhas não coincidem.";
      errors.confirmPassword = "As senhas não coincidem.";
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
        <Text style={styles.title}>Crie Sua Conta!</Text>
        <Text style={styles.subtitle}>
          Aqui o amor enconta o seu espaço! 😍
        </Text>
      </View>
      <View style={styles.photoContainer}>
        <PhotoSelector
          size={120}
          setPhotoUriSelected={(e) => {
            console.log(e);
            setUserPhotoUri(e);
          }}
        />
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Seu Nome"
          label="Nome"
          inputMode="text"
          inputError={errors.name}
          onChangeText={(e) => setName(e)}
        />
        <Input
          placeholder="Seu Email"
          label="Email"
          inputMode="text"
          inputError={errors.email}
          onChangeText={(e) => setEmail(e)}
        />
        <Input
          placeholder="Sua Senha"
          label="Senha"
          inputMode="text"
          inputInfo="8-32 caracteres"
          secureTextEntry
          inputError={errors.password}
          onChangeText={(e) => setPassword(e)}
        />
        <Input
          placeholder="Confirme Sua Senha"
          label="Confirmação de senha"
          inputMode="text"
          secureTextEntry
          inputError={errors.confirmPassword}
          onChangeText={(e) => setConfirmPassword(e)}
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
                .registerUser(name, email, password, userPhotoUri)
                .finally(() => setIsLoading(false));
            }
          }}
          title="Criar Conta"
        />
        <Text style={styles.registerText}>
          Já possui uma conta?{" "}
          <Link to={{ screen: "Login" }} style={styles.registerLinkText}>
            Faça Login!
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
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  error: {
    color: "red",
    fontSize: 20,
    marginBottom: 12,
  },
});

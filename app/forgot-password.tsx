import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { GlassButton } from "../components/GlassButton";
import { GlassContainer } from "../components/GlassContainer";
import { GlassTextInput } from "../components/GlassTextInput";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Implement reset password logic here
    console.log("Reset password for:", email);
    // Usually navigate to a success screen or back to login
    router.back();
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <GlassContainer style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive reset instructions</Text>

          <GlassTextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <GlassButton
            title="Send Reset Link"
            onPress={handleResetPassword}
            style={styles.resetButton}
          />

          <View style={styles.footer}>
            <GlassButton
              title="Back to Login"
              variant="secondary"
              onPress={() => router.back()}
              style={styles.backButton}
            />
          </View>
        </GlassContainer>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  resetButton: {
    marginTop: 20,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  backButton: {
    width: "100%",
  },
});

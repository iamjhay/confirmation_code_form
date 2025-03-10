import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  INPUT_OFFSET,
  BUTTON_COLOR,
  EMAIL_STORAGE_KEY,
} from "@/constants/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConfirmPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateCode = (code: string) => {
    // Clear previous errors
    setError("");

    // Check if code is exactly 6 digits
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a 6-digit numeric code");
      return false;
    }

    return true;
  };

  const handleCodeChange = (code: string) => {
    // Only allow numeric input and max 6 characters
    const numericCode = code.replace(/[^0-9]/g, "").slice(0, 6);
    setFormData({ ...formData, code: numericCode });

    // Clear error if user is typing
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!validateCode(formData.code)) {
      return;
    }

    try {
      // Start loading
      setIsLoading(true);

      // Simulate API verification delay (3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Remove email from storage
      await AsyncStorage.removeItem(EMAIL_STORAGE_KEY);

      setIsLoading(false);

      // Show success alert
      Alert.alert(
        "Verification Complete",
        "Your code has been verified successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/"), // Navigate back to forgot password screen
          },
        ]
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Error",
        "An error occurred during verification. Please try again."
      );
    }
  };

  const resendCode = () => {
    // In a real app, you would call an API to resend the code
    Alert.alert(
      "Code Resent",
      `A new verification code has been sent to ${email}`
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ebf3fa" }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            color="#000"
            name="chevron-left"
            size={30}
            style={{ marginLeft: -12 }}
          />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Enter the Confirmation Code</Text>

          <Text style={styles.subtitle}>
            To confirm your password, enter the 6-digit code we sent to{" "}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Confirmation Code</Text>

          <TextInput
            clearButtonMode="while-editing"
            keyboardType="numeric"
            onChangeText={handleCodeChange}
            placeholder="******"
            placeholderTextColor="#9b9b9c"
            returnKeyType="done"
            style={[styles.inputControl, error ? styles.inputError : null]}
            value={formData.code}
            maxLength={6}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.codeHint}>
            {formData.code.length}/6 digits entered
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            <View style={styles.btn}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.btnText}>Next</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={resendCode} disabled={isLoading}>
            <View style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>I didn't get the code</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#929292",
    marginBottom: 8,
  },
  emailText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0469ff",
    marginBottom: 24,
  },
  instructions: {
    fontSize: 14,
    color: "#505060",
    textAlign: "center",
    lineHeight: 20,
  },
  actions: {
    marginTop: 40,
    gap: 16,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    lineHeight: 44,
    fontSize: 16,
    fontWeight: 600,
    color: "#222",
    zIndex: 9,
  },
  inputControl: {
    height: INPUT_OFFSET,
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 5,
  },
  codeHint: {
    color: "#929292",
    fontSize: 12,
    marginTop: 5,
    textAlign: "right",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: BUTTON_COLOR,
    height: 46,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    backgroundColor: "transparent",
    borderColor: "#dbdbdb",
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#222",
  },
});

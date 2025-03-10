import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router";
import {
  BUTTON_COLOR,
  EMAIL_STORAGE_KEY,
  INPUT_ERROR_COLOR,
  INPUT_OFFSET,
} from "@/constants/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Example() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load email from storage when component mounts
  useEffect(() => {
    const loadEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem(EMAIL_STORAGE_KEY);
        if (savedEmail) {
          setForm({ email: savedEmail });
        }
      } catch (error) {
        console.log("Error loading email:", error);
      }
    };

    loadEmail();
  }, []);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Reset error state
    setError("");

    // Validate email
    if (!form.email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Store email in AsyncStorage
      await AsyncStorage.setItem(EMAIL_STORAGE_KEY, form.email);

      // Navigate to confirmation screen
      router.push({
        pathname: "/confirm-code",
        params: {
          email: form.email,
        },
      });
    } catch (error) {
      console.log("Error saving email:", error);
      Alert.alert("Error", "Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ebf3fa" }}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          color="#000"
          name="chevron-left"
          size={30}
          style={{ marginLeft: -12 }}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password?</Text>

          <Text style={styles.subtitle}>
            Enter your email associated with your account.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email Address</Text>

            <TextInput
              clearButtonMode="while-editing"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(email) => {
                setForm({ ...form, email });
                setError(""); // Clear error when user types
              }}
              placeholder="john@example.com"
              placeholderTextColor="#b4b4b4"
              returnKeyType="done"
              style={[styles.inputControl, error ? styles.inputError : null]}
              value={form.email}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
              <View style={[styles.btn, isLoading ? styles.btnDisabled : null]}>
                <Text style={styles.btnText}>
                  {isLoading ? "Processing..." : "Next"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle link
            }}
            style={{ marginTop: "auto" }}
          >
            <Text style={styles.formFooter}>
              Already have an account?{" "}
              <Link
                href="/"
                style={{ color: "#d897f8", textDecorationLine: "underline" }}
              >
                Sign in
              </Link>
            </Text>
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
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 12,
  },
  formActionSpacer: {
    marginVertical: 32,
    fontSize: 14,
    fontWeight: "600",
    color: "#4b4858",
    textAlign: "center",
  },
  formFooter: {
    fontSize: 14,
    fontWeight: "600",
    color: "#51505a",
    textAlign: "center",
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
    borderColor: INPUT_ERROR_COLOR,
  },
  errorText: {
    color: INPUT_ERROR_COLOR,
    fontSize: 14,
    marginTop: 5,
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
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#000",
    marginBottom: 12,
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#000",
  },
  btnDisabled: {
    backgroundColor: "#a9a9a9",
  },
});

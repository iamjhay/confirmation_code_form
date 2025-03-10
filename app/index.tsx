import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router";
import { BUTTON_COLOR, INPUT_OFFSET } from "@/constants/utils";

export default function Example() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });

  // Handle form submission
  const handleSubmit = async () => {
    try {
      router.push("/confirm-code");
    } catch (error) {
      console.log("Error saving email:", error);
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
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#9b9b9c"
              returnKeyType="done"
              style={styles.inputControl}
              value={form.email}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
                handleSubmit();
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Next</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.btnSecondary}>
                <MaterialCommunityIcons
                  color="#000"
                  name="facebook"
                  size={22}
                  style={{ marginRight: 12 }}
                />

                <Text style={styles.btnSecondaryText}>Facebook</Text>

                <View style={{ width: 34 }} />
              </View>
            </TouchableOpacity> */}
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
});

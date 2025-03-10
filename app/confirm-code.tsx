import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { INPUT_OFFSET, BUTTON_COLOR } from "@/constants/utils";

export default function ConfirmPasswordScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
  });

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
            To confirm your password, enter the 6-digit code we sent to
            john@example.com
          </Text>
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Confirmation Code</Text>

          <TextInput
            clearButtonMode="while-editing"
            keyboardType="numeric"
            onChangeText={(code) => setFormData({ ...formData, code })}
            placeholder="******"
            placeholderTextColor="#9b9b9c"
            returnKeyType="done"
            style={styles.inputControl}
            value={formData.code}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Next</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // In a real app, you would resend the email here
              alert("Password reset email resent to");
            }}
          >
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
    fontSize: 18,
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

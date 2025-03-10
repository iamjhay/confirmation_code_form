import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // or hide the header
        headerShown: false,
      }}
    />
  );
}

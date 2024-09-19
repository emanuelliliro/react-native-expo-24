import { Stack, useSegments, router } from "expo-router";
import { useEffect } from "react";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";

const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    if (user?.autenticated === false) {
      if (router.canGoBack()) {
        router.back();
        if (router.canGoBack()) router.back();
      } else router.replace("index");
    } else {
      router.replace("(protected)");
    }
  }, [user]);
  return (
    <Stack>
      <Stack.Screen name="index" opnition={{ headerShown: false }} />
      <Stack.Screen name="(protected)" opnition={{ headerShown: false }} />
    </Stack>
  );
};
export default function Layout() {
  return (
    <AppProvider>
      <StackLayout />
    </AppProvider>
  );
}

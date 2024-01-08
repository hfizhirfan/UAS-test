import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const noHead = { headerShown: false };

const StackLayout = () => {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={noHead} />
        <Stack.Screen name="index" options={noHead} />
        <Stack.Screen name="login" options={noHead} />
        <Stack.Screen name="LandingPage" options={noHead} />
        <Stack.Screen name="Event" options={noHead} />
        <Stack.Screen name="Certificate" options={noHead} />
        <Stack.Screen name="Beasiswa" options={noHead} />
        <Stack.Screen name="welcome" options={noHead} />
        <Stack.Screen name="news-detail" options={noHead} />
        <Stack.Screen name="Bookmark" options={noHead} />
        <Stack.Screen name="sertifikat" options={noHead} />
        <Stack.Screen name="editprofile" options={noHead} />
        <Stack.Screen name="detailsertif" options={noHead} />
        <Stack.Screen name="Register" options={noHead} />
        <Stack.Screen name="exploreevent" options={noHead} />
        <Stack.Screen name="web" options={noHead} />
      </Stack>
    </GluestackUIProvider>
  );
};

export default StackLayout;
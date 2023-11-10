import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable,StyleSheet, Text, View } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");

  const fetchImage = async () => {
    setIsLoading(true);
    const result = await fetch("https://dog.ceo/api/breeds/image/random");
    const url = await result.json();
    console.log(url);
    setUrl(url.message);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog API</Text>
      {url ? <Image style={styles.image} source={{ uri: url }} /> : null}
      {isLoading && !url ? <ActivityIndicator /> : null}
      {!url && !isLoading ? (
        <Text style={styles.text}>Appuyez sur le bouton pour charger une image.</Text>
      ) : null}
      <Pressable style={styles.button} onPress={fetchImage}>
        <Text style={styles.text}>Nouveau</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  image: {
    height: 300,
    width: 300,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "lightgray",
  },
});

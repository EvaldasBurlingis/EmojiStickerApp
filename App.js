import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const PlaceholderImage = require("./assets/images/placeholder.jpg");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!results.canceled) {
      setSelectedImage(results.assets[0].uri);
    } else {
      alert("You must pick an image to continue.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageViewer
        placeholderImage={PlaceholderImage}
        selectedImage={selectedImage}
      />
      <Button label="Pick a Photo" onPress={pickImageAsync} />
      <Button
        label="Use Placeholder"
        onPress={() => alert("continue with placeholder")}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, SafeAreaView } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import ButtonIcon from "./components/ButtonIcon";
import ButtonCircle from "./components/ButtonCircle";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";

const PlaceholderImage = require("./assets/images/placeholder.jpg");

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const pickImageAsync = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!results.canceled) {
      setSelectedImage(results.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You must pick an image to continue.");
    }
  };

  const onReset = () => {};

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {};

  const onEmojiPickerModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageViewer
        placeholderImage={PlaceholderImage}
        selectedImage={selectedImage}
      />
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <ButtonIcon label="Reset" onPress={onReset} />
            <ButtonCircle onPress={onAddSticker} />
            <ButtonIcon label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View>
          <Button label="Pick a Photo" onPress={pickImageAsync} />
          <Button
            label="Use this Photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onEmojiPickerModalClose}>
        <EmojiList
          onSelect={setSelectedEmoji}
          onCloseModal={onEmojiPickerModalClose}
        />
      </EmojiPicker>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

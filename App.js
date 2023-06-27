import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import ButtonIcon from "./components/ButtonIcon";
import ButtonCircle from "./components/ButtonCircle";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("./assets/images/placeholder.jpg");

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

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

  const onReset = () => {
    setSelectedImage(null);
    setShowAppOptions(false);
    setSelectedEmoji(null);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const uri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(uri);

      if (uri) {
        alert("Saved to Photos");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEmojiPickerModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={imageRef} collapsable={false} style={{ height: 600 }}>
        <ImageViewer
          placeholderImage={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {selectedEmoji !== null ? (
          <EmojiSticker stickerSource={selectedEmoji} imageSize={32} />
        ) : null}
      </View>
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
    </GestureHandlerRootView>
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

import { View, Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeholderImage, selectedImage }) {
  const image = selectedImage ? { uri: selectedImage } : placeholderImage;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  image: {
    width: 400,
    height: 440,
    borderRadius: 18,
  },
});

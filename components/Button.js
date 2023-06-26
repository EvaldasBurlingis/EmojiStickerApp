import { View, Pressable, Text, StyleSheet } from "react-native";

export default function Button({ label, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 64,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});

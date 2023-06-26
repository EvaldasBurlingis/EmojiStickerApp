import { Pressable, Text } from "react-native";

export default function ButtonIcon({ label, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
}

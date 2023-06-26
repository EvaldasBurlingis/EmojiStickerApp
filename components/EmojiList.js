import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    require("../assets/emoji/emoji1.png"),
    require("../assets/emoji/emoji2.png"),
    require("../assets/emoji/emoji3.png"),
    require("../assets/emoji/emoji4.png"),
    require("../assets/emoji/emoji5.png"),
    require("../assets/emoji/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, idx }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(item);
              onCloseModal();
            }}
          >
            <Image source={item} key={idx} style={styles.emoji} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emoji: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

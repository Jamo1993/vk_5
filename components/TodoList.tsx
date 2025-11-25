import { FlatList, Text, StyleSheet } from "react-native";

export default function TodoList({ todos, onToggle }) {
  return (
    <FlatList
      data={todos}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => (
        <Text
          onPress={() => onToggle(index)}
          style={[
            styles.item,
            item.completed && { textDecorationLine: "line-through" },
          ]}
        >
          {index + 1}. {item.text}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { fontSize: 25, marginVertical: 5 },
});

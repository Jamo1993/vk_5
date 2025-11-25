import { View, TextInput, Button, StyleSheet } from "react-native";

export default function TodoInput({ value, onChangeText, onSubmit }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <Button title="Save" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

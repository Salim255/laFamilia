import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({ label, keyboardType, secure, onUpdateValue, value, isInvalid }) {
  return (
    <View style={styles.inputContainer} testID="input-id">
      <Text style={[styles.label, isInvalid && styles.labelInvalid]} testID="label">
        {label}
      </Text>
      <TextInput
        testID="text-input"
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "#ff6200",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#cdcdd3",
    borderRadius: 4,
    fontSize: 16,
  },

  inputInvalid: {
    backgroundColor: "#f2833e",
  },
});

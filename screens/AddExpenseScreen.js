import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  const handleAddExpense = () => {
    if (!amount) {
      setError("Please enter the amount.");
      return;
    }
    if (!category) {
      setError("Please enter the category.");
      return;
    }
    if (!date) {
      setError("Please enter the date.");
      return;
    }
    addRecord();
  };

  const addRecord = async () => {
    const newRecord = {
      amount: parseFloat(amount),
      category,
      date,
      comments,
    };

    try {
      // Get existing records from AsyncStorage
      const existingRecords =
        JSON.parse(await AsyncStorage.getItem("records")) || [];
      // Add the new record to the existing records
      const updatedRecords = [...existingRecords, newRecord];
      // Store the updated records back to AsyncStorage
      await AsyncStorage.setItem("records", JSON.stringify(updatedRecords));
      // Navigate to the PrevDataScreen
      navigation.navigate("Data");
    } catch (error) {
      console.error("Error adding record: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Add Record</Text>

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAmount(text)}
        value={amount}
        placeholder="Enter amount"
        placeholderTextColor={"#EDF2F4"}
        keyboardType="numeric"
        required
      />
      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCategory(text)}
        placeholder="Enter category"
        placeholderTextColor={"#EDF2F4"}
        value={category}
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDate(text)}
        value={date}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={"#EDF2F4"}
      />
      <Text style={styles.label}>Comments:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setComments(text)}
        value={comments}
        multiline={true}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Add" onPress={handleAddExpense} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDF2F4",
    flex: 1,
    padding: 20,
  },
  input: {
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#8D99AE",
  },
  label: {
    marginBottom: 5,
    color: "#2B2D42",
  },
  head: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
    color: "#2B2D42",
  },
  button: {
    backgroundColor: "#2B2D42",
    width: 100,
    height: 50,
    padding: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default AddExpenseScreen;

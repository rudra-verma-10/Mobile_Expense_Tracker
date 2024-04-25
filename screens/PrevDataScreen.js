import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-chart-kit";

const PrevDataScreen = () => {
  const [records, setRecords] = useState([]);

  const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#FFCD56",
    "#36A2EB",
    "#FF6384",
    "#C9CBCF",
    "#FF9F40",
  ];

  useEffect(() => {
    const loadRecords = async () => {
      try {
        // Retrieve records from AsyncStorage
        const storedRecords = await AsyncStorage.getItem("records");
        if (storedRecords) {
          setRecords(JSON.parse(storedRecords));
        }
      } catch (error) {
        console.error("Error loading records: ", error);
      }
    };

    // Load records when the component mounts
    loadRecords();
  });

  const chartData = records
    .reduce((acc, curr) => {
      const categoryIndex = acc.findIndex(
        (item) => item.name === curr.category
      );
      if (categoryIndex >= 0) {
        acc[categoryIndex].amount += parseFloat(curr.amount);
      } else {
        // Assign a color from the predefined set based on the current length of accumulator
        // This is a simple way to ensure colors are consistent across re-renders
        // for static or relatively unchanging lists of categories.
        const colorIndex = acc.length % chartColors.length; // Use modulo to loop through colors
        acc.push({
          name: curr.category,
          amount: parseFloat(curr.amount),
          color: chartColors[colorIndex], // Assign color based on index
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      }
      return acc;
    }, [])
    .map((item) => ({
      name: item.name,
      amount: item.amount,
      color: item.color,
      legendFontColor: item.legendFontColor,
      legendFontSize: item.legendFontSize,
    }));

  const data = chartData.map((item) => ({
    name: item.name,
    population: item.amount,
    color: item.color,
    legendFontColor: item.legendFontColor,
    legendFontSize: item.legendFontSize,
  }));

  const deleteRecord = async (index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedRecords = [...records];
            updatedRecords.splice(index, 1); // Remove the item from the array
            setRecords(updatedRecords); // Update state
            await AsyncStorage.setItem(
              "records",
              JSON.stringify(updatedRecords)
            ); // Update AsyncStorage
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Records:</Text>

      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        // paddingLeft={"15"}
        center={[0,-15]}
      />

      <FlatList
        data={records}
        renderItem={({ item, index }) => (
          <View style={styles.record}>
            <Text>Amount: ${item.amount}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Comments: {item.comments}</Text>
            <TouchableOpacity
              onPress={() => deleteRecord(index)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
    color: "#2B2D42",
  },
  record: {
    marginBottom: 20,
    borderColor: "#ccc",
    backgroundColor: '#8D99AE',
    borderWidth: 1,
    padding: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#2B2D42",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default PrevDataScreen;

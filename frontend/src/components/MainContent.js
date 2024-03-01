import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://your-api-url/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <View style={styles.item}>
            <Text>{item.date}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.category}</Text>
            <Text>{item.note}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = {
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
};

export default ExpenseList;

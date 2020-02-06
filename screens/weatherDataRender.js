import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function WeatherData({forecast}) {

  kelvinToF = (k,i) => {
    return ( Math.floor((k - 273.15) * 9/5 + 32) )
  }
  return(
    <View>
      <ScrollView>
        {forecast.map((ele, index) => <View key={index} style={styles.item}>
            <Text>{ele[0].toDateString()} At {ele[0].toLocaleTimeString()}</Text>
            <Text>{kelvinToF(ele[1][0].temp)}&#8457; with {ele[1][1].description}</Text>
          </View>
          )
        }
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});
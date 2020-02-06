import React, { useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  UIManager,
  findNodeHandle,
} from 'react-native';

import * as Location from 'expo-location';
import { createStackNavigator } from 'react-navigation-stack';
import WeatherDay from "./weatherDay"
import { ScrollView, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native-gesture-handler';
// import Geolocation from 'react-native-geolocation-service';

export default function Weather(){

  const [forecast, setForecast] = useState([])
  const [dayIndex, setDayIndex] = useState(0)
  const [scrollViewHandle, setScrollViewHandle] = useState(null)
  const [domDone, setDomDone] = useState(false)
  const [activeDayTouchable, setActiveDayTouchable] = useState(0)
  const scrollRef = useRef(null)

  // Weather.navigationOptions = {
  //   tabBarLabel: 'Weather',
  // }
  // debugger
  
  // let temp = findNodeHandle(scrollRef)
  const fetchWeatherData = async () => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Eagan,us&APPID=4288a66cb96ad4d3e80e2942b693c2e8`)
    const forecast = await response.json()
    console.log("WEATHER RESPONSE:",forecast)

    return calcForcastArray(forecast)
  }
  useEffect(() => {
  //  debugger
  fetchWeatherData()
    .then(setForecast)
    .catch(error => {
      console.warn(JSON.stringify(error, null, 2));
    });
  }, [])

  calcForcastArray = (oldForecast) => {
    const newForcObj = []
    oldForecast.list.map((weatherObj, index) => {
      // debugger
      let date = new Date(weatherObj.dt_txt)
      const placeHolderForData = [weatherObj.main, weatherObj.weather[0]]
      newForcObj.push(Object.assign({}, {title: date}, {data: placeHolderForData}))
    })
    // Object.assign({}, {weather: forecast.list[0].weather[0]}, {data: forecast.list[0].main})
    // return ( Object.assign({},))
    return makeForcastWeeks(newForcObj)
  }

  makeForcastWeeks = (forecastArray) => {
    const masterForecastArray = [
      {title: "Monday", data:[] },
      {title: "Tuesday", data:[] },
      {title: "Wednesday", data:[] },
      {title: "Thursday", data:[] },
      {title: "Friday", data:[] },
      {title: "Staurday", data:[] },
      {title: "Sunday", data:[] }
    ]
    forecastArray.map((ele,i) => {
      // debugger
      switch (ele.title.getDay()) {
        case 1: // Monday
          // masterForecastArray[0]["data"] = Object.assign(masterForecastArray[0]["data"], ele.title, ele.data)
          masterForecastArray[0]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(1) : null;
          break;
      
        case 2: // Tuesday
          // masterForecastArray[1]["data"] = Object.assign(masterForecastArray[1]["data"], ele.title, ele.data)
          masterForecastArray[1]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(2) : null;
          break;
        case 3: // Wednesday
          // masterForecastArray[2]["data"] = Object.assign(masterForecastArray[2]["data"], ele.title, ele.data)
          masterForecastArray[2]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(3) : null;
          break;
        
        case 4: // Thursday
          // masterForecastArray[3]["data"] = Object.assign(masterForecastArray[3]["data"], ele.title, ele.data)
          masterForecastArray[3]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(4) : null;
          break;
        
        case 5: // Friday
          // masterForecastArray[4]["data"] = Object.assign(masterForecastArray[4]["data"], ele.title, ele.data)
          masterForecastArray[4]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(5) : null;
          break;
        
        case 6: // Staurday
          // masterForecastArray[5]["data"] = Object.assign(masterForecastArray[5]["data"], ele.title, ele.data)
          masterForecastArray[5]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(6) : null;
          // Object.assign(masterForecastArray[5]["data"], {title: ele.title}, {data: ele.data})
          break;
        case 7: // Sunday
          // masterForecastArray[6]["data"] = Object.assign(masterForecastArray[6]["data"], ele.title, ele.data)
          masterForecastArray[6]["data"].push([ele.title, ele.data])
          dayIndex === 0 ? setDayIndex(7) : null;
          break;
    
        default:
          break;
      }
    })
    return masterForecastArray
  }

 function center() {
  // debugger
    // setScrollViewHandle(ref)
    // UIManager.dispatchViewManagerCommand(findNodeHandle(scrollRef.current), 0, null);
    console.log(scrollViewHandle)
    scrollViewHandle.scrollTo({x: 379, y: 0, animated: true})
  }

  function changeWeekDay(e) {
    // debugger
  //   activeDayTouchable.measure((x, y, width) => {
  //     debugger
  //  })
  // debugger
  // scrollViewHandle.measure((x,y)=>{
  //   debugger
  // })
  console.log(activeDayTouchable)
    setDayIndex(this.day)
  }

  // const setOrUseRef = (ref) => {
  // debugger
  // if(ref != null) ref.scrollTo({x: 324, y: 0, animated: true})

  // }
  function dummy(e){
    // debugger
//     e.nativeEvent.layout.mesure
// undefined
// e.nativeEvent.layout.width
// 146.2857208251953
// e.nativeEvent.layout.width / 6
// 24.380953470865887
    // center()
  }
  kelvinToF = (k,i) => {
    // debugger
    return ( Math.floor((k - 273.15) * 9/5 + 32) )
  }
  // debugger
  return (
    <View style={styles.container}>
      { forecast.length > 0 && (
      <ScrollView ref={ref => setScrollViewHandle(ref)} style={styles.item2} scrollEnabled={true}>
        <FlatList
        horizontal
         data={forecast} 
         renderItem={ (ele, index) =>
          <View>
           <TouchableOpacity day={index + 1} ref={ref => setDomDone(ref)} style={dayIndex === (index + 1) ? styles.touchableSelected : styles.touchable} onPress={changeWeekDay}>
              <Text style={styles.title}>{ele.item.title}</Text>
            </TouchableOpacity>
          </View>
            }
          // keyExtractor={(item, index) => index}
          >
          </FlatList>
          {forecast.map((ele) => {
            <FlatList
            horizontal
            data={ele.data}
            renderItem={(weather, index) =>
                <View style={styles.container}>
                {/* // /* <Text>{weather[0].toLocaleString()}</Text> */ }
                <Text key={index} style={styles.item }>
                  {kelvinToF(weather[1][0].temp)}&#8457; with {weather[1][1].description}
                </Text>              
                {/* /* //<WeatherDay data={ele.data} /> */ }
                </View>
            }
          >
          </FlatList>
          })}
        </ScrollView>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  hide: {
    display: "none"
  },
  center: {
    backgroundColor: "rgb(25,255,75)",
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    height: 600,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  item2: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    zIndex: 2
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    paddingRight: 20,
  },
  touchable: {
    backgroundColor: '#bbb',
    padding: 20,
    marginVertical: 8,
  },
  touchableSelected: {
    backgroundColor: 'rgb(255, 0, 75)',
    padding: 20,
    marginVertical: 8,
  },
});




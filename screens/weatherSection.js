import React, { useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  UIManager,
  findNodeHandle,
  TextInput
} from 'react-native';

import * as Location from 'expo-location';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native-gesture-handler';
import WeatherDataRender from "./weatherDataRender"

export default function WeatherSection(props){
  const [forecast, setForecast] = useState([]);
  const [dayIndex, setDayIndex] = useState(0);
  const [scrollViewHandle, setScrollViewHandle] = useState(null);
  const [domDone, setDomDone] = useState(false);
  const [activeDayTouchable, setActiveDayTouchable] = useState(0);
  const [userInputLocation, setUserInputLocation] = useState(null)
  // debugger
  // Weather.navigationOptions = {
  //   tabBarLabel: 'Weather',
  // }


  
  // let temp = findNodeHandle(scrollRef)
  const fetchWeatherData = async (location = "Eagan, us") => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=e8087fe318dd4e29fd194e7fb42a9570`)
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${Math.floor(location.coords.latitude)}&lon=${Math.floor(location.coords.longitude)}&APPID=4288a66cb96ad4d3e80e2942b693c2e8`)
    const forecast = await response.json()

    // if(location){
    //   const response2 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyA1oe2CqYKqOEsMg8RyW6SMTN2GCcHpecU`)
    //   const forecast2 = await response2.json()
    //   console.log("RESPONSE:",forecast2)
    // }
    console.log("RESPONSE:",forecast)

    // debugger
    return forecast
  }

  useEffect(() => {
  //  debugger
  // navigator.geolocation.getCurrentPosition(setLocation) 
  // console.log(userInputLocation)
  fetchWeatherData(userInputLocation ? userInputLocation : undefined)
    .then(calcForcastArray)
    .catch(error => {
      console.warn(JSON.stringify(error, null, 2));
      console.log(error)
    });
  }, [userInputLocation])

  calcForcastArray = async (oldForecast) => {
    const newForcObj = []
    oldForecast.list.map((weatherObj, index) => {
      // debugger
      let date = new Date(weatherObj.dt_txt)
      const placeHolderForData = [weatherObj.main, weatherObj.weather[0]]
      newForcObj.push(Object.assign({}, {title: date}, {data: placeHolderForData}))
    })
    // Object.assign({}, {weather: forecast.list[0].weather[0]}, {data: forecast.list[0].main})
    // return ( Object.assign({},))
    const dayI = newForcObj[0].title.getDay() - 1
    setDayIndex(dayI)
    // debugger
    return makeForcastWeeks(newForcObj)
  }

  makeForcastWeeks = async (forecastArray) => {
    const masterForecastArray = [
      {title: "Monday", data:[], index: 0 + 1  },
      {title: "Tuesday", data:[], index: 1 + 1  },
      {title: "Wednesday", data:[], index: 2 + 1  },
      {title: "Thursday", data:[], index: 3 + 1  },
      {title: "Friday", data:[], index: 4 + 1  },
      {title: "Staurday", data:[], index: 5 + 1  },
      {title: "Sunday", data:[], index: 6 + 1  }
    ]
    forecastArray.map((ele,i) => {
      // debugger
      switch (ele.title.getDay()) {
        case 1: // Monday
          // masterForecastArray[0]["data"] = Object.assign(masterForecastArray[0]["data"], ele.title, ele.data)
          masterForecastArray[0]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(1) : null;
          break;
      
        case 2: // Tuesday
          // masterForecastArray[1]["data"] = Object.assign(masterForecastArray[1]["data"], ele.title, ele.data)
          masterForecastArray[1]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(2) : null;
          break;
        case 3: // Wednesday
          // masterForecastArray[2]["data"] = Object.assign(masterForecastArray[2]["data"], ele.title, ele.data)
          masterForecastArray[2]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(3) : null;
          break;
        
        case 4: // Thursday
          // masterForecastArray[3]["data"] = Object.assign(masterForecastArray[3]["data"], ele.title, ele.data)
          masterForecastArray[3]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(4) : null;
          break;
        
        case 5: // Friday
          // masterForecastArray[4]["data"] = Object.assign(masterForecastArray[4]["data"], ele.title, ele.data)
          masterForecastArray[4]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(5) : null;
          break;
        
        case 6: // Staurday
          // masterForecastArray[5]["data"] = Object.assign(masterForecastArray[5]["data"], ele.title, ele.data)
          masterForecastArray[5]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(6) : null;
          // Object.assign(masterForecastArray[5]["data"], {title: ele.title}, {data: ele.data})
          break;
        case 7: // Sunday
          // masterForecastArray[6]["data"] = Object.assign(masterForecastArray[6]["data"], ele.title, ele.data)
          masterForecastArray[6]["data"].push([ele.title, ele.data])
          // dayIndex === 0 ? setDayIndex(7) : null;
          break;
    
        default:
          break;
      }
    })
    // debugger
    setForecast(masterForecastArray)
  }

 function center() {
  // debugger
    // setScrollViewHandle(ref)
    // UIManager.dispatchViewManagerCommand(findNodeHandle(scrollRef.current), 0, null);
    // console.log(scrollViewHandle)
    scrollViewHandle.scrollTo({x: 379, y: 0, animated: true})
  }

  function changeWeekDay(e, data) {
    // debugger
  //   activeDayTouchable.measure((x, y, width) => {
  //     debugger
  //  })
  // debugger
  // scrollViewHandle.measure((x,y)=>{
  //   debugger
  // })
  // console.log("Forecast:", forecast)
  console.log("data", data)
    setDayIndex(data.index - 1)
  }

  // const setOrUseRef = (ref) => {
  // debugger
  // if(ref != null) ref.scrollTo({x: 324, y: 0, animated: true})

  // }
  function dummy(e, data){
    // console.log( "THe DummY",e,data)
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
  zipper = (array, array2) => {
    const returnArray = []
    for (let index = 0; index < array.length &&  index < array2.length; index++) {
      returnArray.push([array[index], array2[index]]);
    }
    return returnArray
  } 
  // debugger
  return (
    <View style={styles.container}>
      {forecast.length > 0 && (

           <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setUserInputLocation(text)}
              value={userInputLocation}
            />

      )}
      { forecast.length > 0 && (
      <ScrollView ref={ref => setScrollViewHandle(ref)} scrollEnabled={true} onLayout={center}>
        <SectionList
          horizontal
          sections={forecast}
          renderItem={(item, index) =>  <Text></Text>
            }
          renderSectionHeader={({section}, index) =>
          <TouchableOpacity ref={ref => setDomDone(ref)} style={(dayIndex + 1) === section.index ? styles.touchableSelected : styles.touchable} onPress={(e) => changeWeekDay(e, section, index)}>
            <Text style={styles.title}>{section.title}</Text>
          </TouchableOpacity> 
          }
          keyExtractor={(data, index) => index}
          // renderSectionHeader={<Text style={styles.header}>1</Text>}
          // stickySectionHeadersEnabled={true}
          />
          {forecast[dayIndex].data.length > 0 ? 
          <WeatherDataRender forecast={zipper(forecast[dayIndex].data.map((ele) => ele[0]), forecast[dayIndex].data.map((array) => array[1] ))}/>
           : <Text>Sorry No Forecasts For the Day </Text>
          }
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
  location: {
    backgroundColor: "rgb(25,255,75)",
    flex: 1,
    flexDirection: "column",
    height: 300,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    // height: 300,
  },
  item2: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    // zIndex: 2
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
    // position: "absolute",
  },
  touchableSelected: {
    backgroundColor: 'rgb(255, 0, 75)',
    padding: 20,
    marginVertical: 8,
    // position: "absolute",

  },
});




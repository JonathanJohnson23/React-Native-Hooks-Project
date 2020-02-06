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
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
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
    const setValue = calcForcastArray(forecast)
    return setValue
  }
  useEffect(() => {
  //  debugger
  fetchWeatherData()
    .then(res => {debugger
      setForecast})
    .catch(error => {
      console.warn(JSON.stringify(error, null, 2));
    });
    console.log("flat", forecast)
    // debugger
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
    const dayI = newForcObj[0].title.getDay() - 1
    setDayIndex(dayI)
    // debugger
    return makeForcastWeeks(newForcObj)
  }

  makeForcastWeeks = (forecastArray = forecast) => {
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
      <Text>HELP</Text>
      { forecast.length > 0 && (
      <ScrollView ref={ref => setScrollViewHandle(ref)} onLayout={center} style={styles.item} horizontal={true} >
        {forecast.map((ele, i) => {
          return (
            <View  key={i}>
                <TouchableOpacity day={i + 1} ref={ref => setDomDone(ref)} style={dayIndex === (i) ? styles.touchableSelected : styles.touchable} key={i} onPress={changeWeekDay}>
                <Text style={styles.title}>{ele.title}</Text>
              </TouchableOpacity>
              {ele.data.map((weather,idx) => {
                return(
                // <View style={styles.item}>
                // /* <Text>{weather[0].toLocaleString()}</Text> */
                <Text key={idx} style={dayIndex === (i) ? styles.center : styles.hide}>
                  {kelvinToF(weather[1][0].temp)}&#8457; with {weather[1][1].description}
                </Text>              
                /* //<WeatherDay data={ele.data} /> */
                // </View>
                )
              })}
            </View> 
            )
          })
        }
        </ScrollView>
        )}
    </View>
  )
}
// createStackNavigator({
//   Monday: {
//     screen: WeatherDay
//   },
//   Tuesday: {
//     screen: WeatherDay
//   },
//   Wednesday: {
//     screen: WeatherDay
//   },
//   Thursday: {
//     screen: WeatherDay
//   },
//   Friday: {
//     screen: WeatherDay
//   },
//   Saturday: {
//     screen: WeatherDay
//   },
//   Sunday: {
//     screen: WeatherDay
//   },
// }, )
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
    // position: "absolute"
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgb(100,0,200)',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });


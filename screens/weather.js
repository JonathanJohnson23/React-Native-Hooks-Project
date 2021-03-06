import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
} from 'react-native';
import * as Location from 'expo-location';
// import Geolocation from 'react-native-geolocation-service';

export default function Weather(){

  const [forecast, setForecast] = useState([])
  const [dayIndex, setDayIndex] = useState(0)

  // Weather.navigationOptions = {
  //   tabBarLabel: 'Weather',
  // }
  // debugger
  
   const fetchWeatherData = async () => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Eagan,us&APPID=4288a66cb96ad4d3e80e2942b693c2e8`)
        const forecast = await response.json()
        console.log("WEATHER RESPONSE:",forecast)

        return forecast
  }
  useEffect(() => {
    //  debugger
    fetchWeatherData()
      .then(calcForcastArray)
      .catch(error => {
        console.warn(JSON.stringify(error, null, 2));
        console.log(error)
      });
  }, [])

  calcForcastArray = (oldForecast) => {
    const newForcObj = []
    // debugger
    oldForecast.list.map((weatherObj, index) => {
      // console.log(weatherObj)
      // debugger
      let date = new Date(weatherObj.dt_txt)
      const placeHolderForData = [weatherObj.main, weatherObj.weather[0]]
      newForcObj.push(Object.assign({}, {title: date}, {data: placeHolderForData}))
    })
    // Object.assign({}, {weather: forecast.list[0].weather[0]}, {data: forecast.list[0].main})
    // return ( Object.assign({},))
    const dayI = newForcObj[0].title.getDay() - 1
      setDayIndex(dayI)
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
    // debugger
    
    forecastArray.map((ele,i) => {
      switch (ele.title.getDay()) {
        case 1: // Monday
          // masterForecastArray[0]["data"] = Object.assign(masterForecastArray[0]["data"], ele.title, ele.data)
          masterForecastArray[0]["data"].push([ele.title, ele.data])
          break;
        
        case 2: // Tuesday
          // masterForecastArray[1]["data"] = Object.assign(masterForecastArray[1]["data"], ele.title, ele.data)
          masterForecastArray[1]["data"].push([ele.title, ele.data])
          break;

        case 3: // Wednesday
          // masterForecastArray[2]["data"] = Object.assign(masterForecastArray[2]["data"], ele.title, ele.data)
          masterForecastArray[2]["data"].push([ele.title, ele.data])
          break;
          
        case 4: // Thursday
          // masterForecastArray[3]["data"] = Object.assign(masterForecastArray[3]["data"], ele.title, ele.data)
          masterForecastArray[3]["data"].push([ele.title, ele.data])
          break;
          
        case 5: // Friday
          // masterForecastArray[4]["data"] = Object.assign(masterForecastArray[4]["data"], ele.title, ele.data)
          masterForecastArray[4]["data"].push([ele.title, ele.data])
          break;
          
        case 6: // Staurday
          // masterForecastArray[5]["data"] = Object.assign(masterForecastArray[5]["data"], ele.title, ele.data)
          masterForecastArray[5]["data"].push([ele.title, ele.data])
          // Object.assign(masterForecastArray[5]["data"], {title: ele.title}, {data: ele.data})
          break;

        case 7: // Sunday
          // masterForecastArray[6]["data"] = Object.assign(masterForecastArray[6]["data"], ele.title, ele.data)
          masterForecastArray[6]["data"].push([ele.title, ele.data])
          break;
      
        default:
          break;
      }
    })
    setForecast(masterForecastArray)
  }

  kelvinToF = (k,i) => {
    // debugger
    return ( Math.floor((k - 273.15) * 9/5 + 32) ) 
  }
  // debugger
  return (
    <View style={styles.container}>
      {/* <Text>HELLO FROM Weather</Text> */}
      {forecast.length > 0 && (
        <SectionList
          sections={forecast}
          renderItem={({item}) =><View style={styles.item}>
                                    <Text>{item[0].toLocaleString()}</Text>
                                    <Text>{kelvinToF(item[1][0].temp)}&#8457; with {item[1][1].description}</Text>
                                  </View>
                                  }
          renderSectionHeader={({section: {title} }) =>(<Text style={styles.header}>{title}</Text>) }
          keyExtractor={(data, index) => index}
          // renderSectionHeader={<Text style={styles.header}>1</Text>}
          // stickySectionHeadersEnabled={true}
          />
            )}
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


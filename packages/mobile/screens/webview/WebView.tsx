import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button, TouchableOpacity,} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {WebView as NativeWebView, WebViewMessageEvent} from 'react-native-webview'
import React, { useCallback,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import AuthContext from '../utils/AuthContext';
export default function WebView({}: NativeStackScreenProps<StackScreens, 'App'>) {
  
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const handlePress = useCallback(() => navigation.navigate('Home'), [navigation?.navigate]);

  const handleMessage = useCallback((event: WebViewMessageEvent) => {

        fetch(`${process.env.EXPO_PUBLIC_SERVER}/auth/logout`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          alert(data["message"]);
          setIsLoggedIn({logged:false,token:""});
          handlePress();
          
        })
        .catch(error => {
          // Handle the error
          console.log(error);
        });
  }, []);

  

  return (
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity 
            style={{marginRight:30}}
            onPress={handlePress}
          >
            <Icon
              name="arrow-back"
              color="#000"
              size={20}
            />
          </TouchableOpacity>
        ),
      });
    }, [navigation]),
    <View style={styles.container}>
      <NativeWebView source={{uri: process.env.EXPO_PUBLIC_WEBAPP_ROOT as string}} onMessage={handleMessage}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {StatusBar} from 'expo-status-bar';
import {useCallback,useEffect, useContext} from 'react';
import {Button, StyleSheet, View,ImageBackground} from 'react-native';
import AuthContext from '../utils/AuthContext';
export default function Home({navigation}: NativeStackScreenProps<StackScreens, 'Home'>) {
  
 

  const handleLoginPress = useCallback(() => navigation.navigate('Login'), [navigation?.navigate]);
  const handleRegisterPress = useCallback(() => navigation.navigate('Register'), [navigation?.navigate]);
  const handleWebviewPress = useCallback(() => navigation.navigate('App'), [navigation?.navigate]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(()=>{
  },[isLoggedIn]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/bg.jpg")} style={styles.backgroundImage}>
          {/* Your content goes here */}
          {!isLoggedIn.logged ? (
                            <>
                              <Button title="Login" onPress={handleLoginPress} />
                              <Button title="Register" onPress={handleRegisterPress} />
                            </>
                          ) : null
          } 
        <Button style={styles.skip} title="Skip to Webview" onPress={handleWebviewPress} />
        <StatusBar style="auto" />
    </ImageBackground>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    display:"flex",
    justifyContent:"flex-end"
},
});

import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import { TextInput ,Button,} from "@tarikfp/react-native-ui-kit";
import ColumnContainer from '../showcase/layout/column-container';
import React, { useCallback, useState,useContext  } from 'react';
import { useNavigation } from '@react-navigation/native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {validateInput, validatePassword} from "../utils/validation"
import AuthContext from '../utils/AuthContext';


export default function Login({}: NativeStackScreenProps<StackScreens, 'Login'>) {
    
  const deviceWidth = window.innerWidth;
  const [username, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = useCallback(() => {
    
        const valNameResult = validateInput(username,"username");
        const valPassResult = validatePassword(password);

        if(valNameResult === ""&&valPassResult === ""){

          fetch(`${process.env.EXPO_PUBLIC_SERVER}/auth/login`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
          })
          .then(response => response.json())
          .then(data => {
            // Handle the response data
            alert(data["error"]?data["error"]:data["message"]);
            setIsLoggedIn({logged:true,token:data.data.token}); // Update the login state
            navigation.navigate('App');
          })
          .catch(error => {
            // Handle the error
          });
            
        }else{
          valNameResult !== ""?alert(valNameResult):"";
        }
  }, [username, password,setIsLoggedIn, navigation]);

  const handleLoginPress = useCallback(handleLogin, [handleLogin]);
  const handleSignUpPress = useCallback(() => navigation.navigate('Register'), [navigation]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 12 }}>
        <ColumnContainer title="">
          <TextInput
            wrapperStyle={{ marginBottom: 16 }}
            label="Name"
            labelStyle={{ color: "#FFFFFF" }}
            placeholder="Type your Name"
            placeholderTextColor="grey"
            startIcon={{ type: "MaterialCommunityIcons", username: "email" }}
            value={username}
            onChangeText={(name_value)=>setName(name_value)}
          />
          <TextInput
            wrapperStyle={{ marginBottom: 16 }}
            isPassword
            label="Password"
            labelStyle={{ color: "#FFFFFF" }}
            endTextStyle={{ color: "grey" }}
            placeholderTextColor="grey"
            startIcon={{ type: "MaterialCommunityIcons", name: "key" }}
            value={password}
            onChangeText={(pass_value)=>setPassword(pass_value)}
          />
           <Button
            size="large"
            backgroundColor="royalblue"
            label="Log In"
            style={{marginTop:20, width: deviceWidth}}
            onPress={handleLoginPress}
          />
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text
              style={{marginLeft: 15, marginTop: 20, color: "#fff"}}>
              Don't have an account ? Click Here for Register
            </Text>
          </TouchableOpacity>
        </ColumnContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(35, 47, 72, 1)",
  },
});
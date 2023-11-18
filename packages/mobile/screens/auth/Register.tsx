import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import { TextInput ,Button,} from "@tarikfp/react-native-ui-kit";
import ColumnContainer from '../showcase/layout/column-container';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {validateInput, validatePassword} from "../utils/validation"
export default function Register({}: NativeStackScreenProps<StackScreens, 'Register'>) {
  
  const deviceWidth = window.innerWidth;
  const [username, setName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const navigation = useNavigation();

  const handleSignUp = useCallback(async() => {

    const valNameResult = validateInput(username,"username");
    const valDisplayNameResult = validateInput(displayName,"displayName");
    const valPassResult = validatePassword(password,confirmPass);
    
    if(valNameResult === ""&&valPassResult === "" && valDisplayNameResult===""){
      fetch(`${process.env.EXPO_PUBLIC_SERVER}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,displayName,password,confirmPass}),
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        alert(data["error"]?data["error"]:data["message"]);
      })
      .catch(error => {
        // Handle the error
        console.log(error);
      });
    }else{
      valNameResult !== ""?alert(valNameResult):"";
      valDisplayNameResult !== ""?alert(valDisplayNameResult):"";
      valPassResult !== ""?alert(valPassResult):"";
    }
    // navigation.navigate('App');
  }, [username,displayName,password,confirmPass]);

  const handleSignUpPress = useCallback(handleSignUp, [handleSignUp]);

  const handleSignInPress = useCallback(() => navigation.navigate('Login'), [navigation?.navigate]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 12 }}>
        <ColumnContainer title="">
          <TextInput
            wrapperStyle={{ marginBottom: 16 }}
            label="Name"
            labelStyle={{ color: "#FFFFFF" }}
            placeholder="Type your name"
            placeholderTextColor="grey"
            startIcon={{ type: "MaterialCommunityIcons", name: "email" }}
            value={username}
            onChangeText={setName}
          />
          <TextInput
            wrapperStyle={{ marginBottom: 16 }}
            label="DisplayName"
            labelStyle={{ color: "#FFFFFF" }}
            placeholder="Type your DisplayName"
            placeholderTextColor="grey"
            startIcon={{ type: "MaterialCommunityIcons", name: "email" }}
            value={displayName}
            onChangeText={setDisplayName}
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
            onChangeText={setPassword}
          />
           <TextInput
            wrapperStyle={{ marginBottom: 16 }}
            isPassword
            label="Confirm Password"
            labelStyle={{ color: "#FFFFFF" }}
            endTextStyle={{ color: "grey" }}
            placeholderTextColor="grey"
            startIcon={{ type: "MaterialCommunityIcons", name: "key" }}
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <Button
            size="large"
            backgroundColor="royalblue"
            label="Sign Up"
            style={{marginTop:20, width: deviceWidth}}
            onPress={handleSignUpPress}
          />
          <TouchableOpacity onPress={handleSignInPress}>
            <Text
              style={{marginLeft: 15, marginTop: 10, color: "#fff"}}>
              Do have an account ? Click Here for LogIn
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

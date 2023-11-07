import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackScreens} from '../../App';
import {StatusBar} from 'expo-status-bar';
import {useCallback} from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default function Home({navigation}: NativeStackScreenProps<StackScreens, 'Home'>) {
  const handleLoginPress = useCallback(() => navigation.navigate('Login'), [navigation?.navigate]);
  const handleRegisterPress = useCallback(() => navigation.navigate('Register'), [navigation?.navigate]);
  const handleWebviewPress = useCallback(() => navigation.navigate('App'), [navigation?.navigate]);

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={handleLoginPress} />
      <Button title="Register" onPress={handleRegisterPress} />
      <Button title="Skip to Webview" onPress={handleWebviewPress} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

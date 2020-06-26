import React, { useState } from 'react';

import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [image, setImage] = useState(null);
  const takePic = async () => {
    const hasPermissions = await askPermissions();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    });

    setImage(img.uri);
  }

  const savePic = async () => {
    await MediaLibrary.saveToLibraryAsync(image).catch(()=> {Alert.alert('Ошибка')});
    setImage(null);
  }

  const askPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (status !== 'granted') {
      Alert.alert('Разрешите доступ');
      return false;
    }
    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Инструмент обрезания фото</Text>
      <Button
      onPress={takePic}
      title="Сделать фото"
      color="orange"/>

      {
        image &&
        <>
          <Image style={styles.image} source={{uri: image}} />
          <Button
          onPress={savePic}
          title="Сохранить"
          color="green"/>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 240,
    marginTop: 14,
    marginBottom: 14,
  }
});
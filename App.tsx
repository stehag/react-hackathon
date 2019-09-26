import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImagePickerComponent from "./ImagePickerComponent";
import { fetchBearerToken } from "./Network";
import { Button } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View>
        <ImagePickerComponent></ImagePickerComponent>
        <Button
          onPress={fetchBearerToken}
          title="Req"
          color="#841584"
          accessibilityLabel="Make"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

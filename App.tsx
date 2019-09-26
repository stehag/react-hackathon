import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImagePickerComponent from "./ImagePickerComponent";

export default function App() {
  return <ImagePickerComponent></ImagePickerComponent>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

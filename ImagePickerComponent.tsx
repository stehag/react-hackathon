import * as React from "react";
import { Button, Image, View, Text, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { fetchBearerToken, analyzeImage } from "./Network";

export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
    material: null,
    isFetching: false
  };

  render() {
    let { image, material, isFetching } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ margin: 10 }}>
          <Button title="Trashscan" onPress={this._pickImage} />
        </View>
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}

        {isFetching && <ActivityIndicator size="large" color="#0000ff" />}
        {material && (
          <View style={{ margin: 10 }}>
            <Text>is {material}</Text>
          </View>
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ isFetching: true, material: null });
      let imgPath = result.uri;
      this.setState({ image: imgPath });

      analyzeImage(imgPath)
        .then((res: any) => {
          console.log(res.data.predictions[0].results[0].label);
          this.setState({ material: res.data.predictions[0].results[0].label });
          this.setState({ isFetching: false });
        })
        .catch((e: any) => {
          this.setState({ isFetching: false });
        });
    }
  };
}

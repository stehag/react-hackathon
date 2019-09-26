import * as React from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class ImagePickerComponent extends React.Component {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Snap a trashpic" onPress={this._pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
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
  /*
  getBearerToken(callback) {
    var token = Buffer.from(clientID + ":" + clientSecret).toString("base64");
    console.log(token);
    request.get(
      {
        url: authenticationURL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic " + token
        }
      },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error("failed:", err);
        }
        callback(JSON.parse(body).access_token);
      }
    );
  }
  */

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

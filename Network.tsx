import axios from "axios";

const username = "";
const password = "";

export const analyzeImage = (uri: any) => {
  return fetchBearerToken().then((token: string) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    };

    var formData = new FormData();

    formData.append("files", {
      uri: uri,
      type: "image/jpeg",
      name: "image.jpg"
    });

    //formData.append("file", { uri: "", name: "", type: "image/jpg" });

    return axios
      .post(
        "https://mlftrial-image-classifier.cfapps.eu10.hana.ondemand.com/api/v2/image/classification/models/brands005/versions/1",
        formData,
        config
      )
      .then((res: any) => {
        //console.log(JSON.stringify(res));
        return new Promise<any>((resolve, reject) => {
          resolve(res);
        });
      })
      .catch((res: any) => {
        console.log("error:" + JSON.stringify(res));
      });
  });
};

export const fetchBearerToken = (): Promise<String> =>
  axios
    .get(
      "https://s0020912941trial.authentication.eu10.hana.ondemand.com/oauth/token?grant_type=client_credentials",
      {
        auth: {
          username,
          password
        }
      }
    )
    .then((resp: any) => {
      console.log("Got access token");
      return new Promise<String>((resolve, reject) => {
        resolve(resp.data.access_token);
      });
    });

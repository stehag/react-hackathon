import axios from "axios";

const username =
  "sb-775187f1-898a-4313-bc8e-a719c685ddb5!b23317|foundation-std-mlftrial!b3410";
const password = "8Z6NiPg4QNcAe3iFUfQp6h+OfO0=";

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

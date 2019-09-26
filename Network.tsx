import axios from "axios";

export const fetchBearerToken = () => {
  axios
    .get(
      "https://s0020912941trial.authentication.eu10.hana.ondemand.com/oauth/token?grant_type=client_credentials",
      {
        params: { clientid: "", clientsecret: "" },
        auth: {
          username:
            "sb-775187f1-898a-4313-bc8e-a719c685ddb5!b23317|foundation-std-mlftrial!b3410",
          password: "8Z6NiPg4QNcAe3iFUfQp6h+OfO0="
        }
      }
    )
    .then((resp: any) => {
      console.log(resp.access_token);
    })
    .catch(() => {
      console.log("Oauth error");
    });
};

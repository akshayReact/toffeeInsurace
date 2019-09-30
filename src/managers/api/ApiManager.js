import axios from "axios";
import * as SessionManager from "../session/SessionManager";
import { ACCESS_TOKEN } from "../session/SessionKeys";
import { logData } from "../logs/LogManager";
import {AsyncStorage} from 'react-native'
export const callPostApi = async (componentName, API_TAG, URL, bodyParams,headerSet) => {
  try {
    logData(API_TAG, {
      COMPONENT_NAME: componentName,
      API_URL: URL,
      HEADER: headerSet,//getHeader(),
      BODY: bodyParams
    });

    let apiResponse = await axios.post(URL, JSON.stringify(bodyParams), {
      headers: headerSet//getHeader()
    });

    logData(
      API_TAG,
      JSON.stringify({
        response: apiResponse.data
      })
    );

    return apiResponse.data;
  } catch (e) {
    logData(
      API_TAG,
      JSON.stringify({
        error: e
      })
    );

    return e;
  }
};

export const callPutApi = async (componentName, API_TAG, URL, bodyParams,headerSet) => {
  try {
    logData(API_TAG, {
      COMPONENT_NAME: componentName,
      API_URL: URL,
      HEADER: headerSet,//getHeader(),
      BODY: bodyParams
    });

    let apiResponse = await axios.put(URL, JSON.stringify(bodyParams), {
      headers: headerSet//getHeader()
    });

    logData(
      API_TAG,
      JSON.stringify({
        response: apiResponse.data
      })
    );

    return apiResponse.data;
  } catch (e) {
    logData(
      API_TAG,
      JSON.stringify({
        error: e
      })
    );

    return e;
  }
};

export const callGetApi = async (componentName, API_TAG, URL,headerSet) => {
  try {
    logData(API_TAG, {
      COMPONENT_NAME: componentName,
      API_URL: URL,
      HEADER: headerSet,// getHeader(),
      BODY: {}
    });

    let apiResponse = await axios.get(URL, {
      headers: headerSet,//getHeader()
    });
    logData(
      API_TAG,
      JSON.stringify({
        response: apiResponse.data
      })
    );

    return apiResponse.data;
  } catch (e) {
    logData(
      API_TAG,
      JSON.stringify({
        error: e
      })
    );

    return e;
  }
};


export const callDeleteApi = async (componentName, API_TAG, URL,headerSet) => {
  try {
    logData(API_TAG, {
      COMPONENT_NAME: componentName,
      API_URL: URL,
      HEADER: headerSet,// getHeader(),
      BODY: {}
    });

    let apiResponse = await axios.delete(URL, {
      headers: headerSet,//getHeader()
    });
    logData(
      API_TAG,
      JSON.stringify({
        response: apiResponse.data
      })
    );

    return apiResponse.data;
  } catch (e) {
    logData(
      API_TAG,
      JSON.stringify({
        error: e
      })
    );

    return e;
  }
};

// export const getHeader = async () => {
//  let token=await AsyncStorage.getItem('ACCESS_TOKEN');
//   console.log("'ttttttt---------", token)
//   if (
//     // SessionManager.getSessionData(ACCESS_TOKEN) === null ||
//     // SessionManager.getSessionData(ACCESS_TOKEN) === undefined
//     (token===null) || (token===undefined)
//   ) {
//     console.log("'null or undefine")
//     return {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": true,
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
//       "Access-Control-Allow-Headers": "application/json",
//     };
//   } else {
//     console.log("'valid token")
//     return {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": true,
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
//       "Access-Control-Allow-Headers": "application/json",
//       "x-access-token":token
//     };
//   }
// };


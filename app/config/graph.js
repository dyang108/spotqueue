import {
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk'

const GraphPromise = function (route, accessToken, fields) {
  return new Promise((resolve, reject) => {
    // Create response callback.
    var _responseInfoCallback = (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    }

    var paramObj = { parameters: { accessToken: { string: accessToken } } }
    if (fields) {
      Object.assign(paramObj.parameters, fields)
    }
    console.log(paramObj)
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      route,
      paramObj,
      _responseInfoCallback
    )

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start()
  })
}

export default GraphPromise

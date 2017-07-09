var request = require('request')
var { SpotifyCredentials } = require('./secret')
var SpotifyWebApi = require('spotify-web-api-node')
var spotApi = new SpotifyWebApi(SpotifyCredentials)
var encodedCredentials = Buffer.from(SpotifyCredentials.clientId + ':' + SpotifyCredentials.clientSecret).toString('base64')

var getToken = () => {
  request({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + encodedCredentials
    },
    body: 'grant_type=client_credentials'
  }, (err, response) => {
    if (err) {
      console.log(err)
    }
    let resObj = JSON.parse(response.body)
    spotApi.setAccessToken(resObj.access_token)
  })
}
getToken()

module.exports = spotApi

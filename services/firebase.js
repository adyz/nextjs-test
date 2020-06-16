//Firebase stuff
var firebase = require("firebase/app");
require("firebase/auth");

var firebaseConfig = {
  apiKey: "AIzaSyB2YL1u6rjC5sn9-7PTTB6YlcZUIlln2x0",
  authDomain: "nextjs-37cd6.firebaseapp.com",
  databaseURL: "https://nextjs-37cd6.firebaseio.com",
  projectId: "nextjs-37cd6",
  storageBucket: "nextjs-37cd6.appspot.com",
  messagingSenderId: "577691325681",
  appId: "1:577691325681:web:305baf9dab8f21363cc550",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var provider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogleFirebase() {
  return firebase.auth().signInWithPopup(provider);
}

function getUserInfo(uid) {
  return firebase.auth().getUser(uid);
}

//To be set laters
let TOKEN = "";
let UID = "";

//Some urls
const apiKey = firebaseConfig.apiKey;
const conf = {
  apiKey,
  setUserInfoUrl: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${apiKey}`,
  getUserInfoUrl: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKey}`,
  signUpUrl: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`,
  loginUrl: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
  baseUrl: `https://nextjs-37cd6.firebaseio.com/`,
  verifyTokenUrl: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyAssertion?key=${apiKey}`,
};

function firebaseLoginWithGoogle() {
  loginWithGoogleFirebase()
    .then((result) => {
      fetch(conf.verifyTokenUrl, {
        method: "POST",
        body: JSON.stringify({
          requestUri: window.location.href,
          postBody: `id_token=${result.credential.idToken}&providerId=google.com`,
          returnSecureToken: true,
        }),
      })
        .then((res) => res.json())
        .then((realTokenRes) => {
          console.log("I've set the real token", realTokenRes);
          TOKEN = realTokenRes.idToken;
          UID = realTokenRes.localId;
        });

      console.log("result", result, { TOKEN, UID });
      return {
        TOKEN,
        UID,
      };
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log("Errorrrr firebaseLoginWithGoogle", {
        errorCode,
        errorMessage,
        email,
        credential,
      });
    });
}

function createPost(post) {
  return fetch(conf.baseUrl + `posts.json`, {
    method: "POST",
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("ok postData success: ", json);
      return json;
    });
}

function getPosts() {
  return fetch(conf.baseUrl + `posts.json`)
    .then((res) => res.json())
    .then((json) => {
      console.log("getPosts success: ", json);
      return json;
    });
}

function getPost(id) {
  return fetch(conf.baseUrl + `posts/${id}.json`)
    .then((res) => res.json())
    .then((json) => {
      console.log("getPost success: ", json);
      return json;
    });
}

function deletePost(id) {
  return fetch(conf.baseUrl + `posts/${id}.json`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("deleteData success: ", json);
      return json;
    });
}

export {
  getPosts,
  getPost,
  createPost,
  deletePost,
  firebaseLoginWithGoogle,
  firebaseConfig,
  getUserInfo,
};

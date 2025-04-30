// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

// ←──– PASTE YOUR WEB APP CONFIG HERE (same as above, minus the vapidKey)
const firebaseConfig = {
  apiKey: "AIzaSyDMa3ehK9Ll5ZLewd99FI4ZXkH4IgbxUyw",
  authDomain: "studyassist-d13b1.firebaseapp.com",
  projectId: "studyassist-d13b1",
  storageBucket: "studyassist-d13b1.firebasestorage.app",
  messagingSenderId: "603258397372",
  appId: "1:603258397372:web:a0a3ad4bdedd23a26d26b9",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, { body });
});

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCHdc51zaX4VqvWZtGvDy9Fp00pitpKF3U",
    authDomain: "classroom-58292.firebaseapp.com",
    projectId: "classroom-58292",
    storageBucket: "classroom-58292.appspot.com",
    messagingSenderId: "220297149419",
    appId: "1:220297149419:web:89d11e490bf9c79dfa77ae",
    measurementId: "G-TBHSSF3K9W"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout };

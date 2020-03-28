import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config=
    {
        apiKey: "AIzaSyA36qrBpFvhSLe5sI2qj3obfwQ1SdBMw94",
        authDomain: "crwn-db-1a79e.firebaseapp.com",
        databaseURL: "https://crwn-db-1a79e.firebaseio.com",
        projectId: "crwn-db-1a79e",
        storageBucket: "crwn-db-1a79e.appspot.com",
        messagingSenderId: "58693095424",
        appId: "1:58693095424:web:9fd3fe3c612ec501dd88e5",
        measurementId: "G-LMS26FTEZ9"
      };

    export const CreateUserProfileDocument = async (userAuth , additionalData) =>{
          if(!userAuth) return;

          const userRef=firestore.doc(`users/${userAuth.uid}`);
          const snapShot=userRef.get();

          if(!snapShot.exists){
                                    const { displayName, email } = userAuth;
                                    const createdAt = new Date();

                                    try {
                                      await userRef.set({
                                        displayName,
                                        email,
                                        createdAt,
                                        ...additionalData
                                      });
                                    } catch (error) {
                                      console.log(
                                        "error creating user" + error.message
                                      );
                                    }
                                  }
                                  return userRef;
    }

      firebase.initializeApp(config);

      export const auth=firebase.auth();
      export const firestore=firebase.firestore();

      const provider=new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      export const signInWithGoogle= () => auth.signInWithPopup(provider);

      export default firebase;
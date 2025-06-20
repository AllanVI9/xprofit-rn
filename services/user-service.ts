import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, UserCredential } from "firebase/auth";
import { auth } from '../firebaseConfig.js';
import { User } from './user-interface.js'

const signUp = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert('Usuário criado com sucesso!');
    // var u: User = { id: user.uid, name: user.displayName!, email: user.email! };
    var u: User = { id: user.uid, email: user.email! };
    return u;
  } catch (error: any) {
    alert(error.message);
    return null;
  }
};

const signIn = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // var u: User = { id: user.uid, name: user.displayName!, email: user.email! };
    var u: User = { id: user.uid, email: user.email! };
    return u;
  } catch (error: any) {
    alert(error.message);
    return null;
  }
};

const signOut = async (): Promise<boolean> => {
  try {
    await auth.signOut();
    alert('Usuário deslogado!');
    return true;
  } catch (error: any) {
    alert(error.message);
    return false;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export { signUp, signIn, signOut, onAuthStateChanged };

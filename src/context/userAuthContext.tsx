import { createContext, useState } from "react";
import { GoogleAuthProvider, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";


interface IUserAuthProviderProps{
    children: React.ReactNode;
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
};

//pass the same auth instance with the firebase
const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};
const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
const logOut = () => {
    return signOut(auth);
};
//google auth provider from Firebase
const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
};

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
});


//Use the UserAuthProvider to wrap out app comp to it 
export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = {{ children }} => {
    const [user, setUser] = useState<User | null>(null);

    const value: AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
    };
    return(
        <userAuthContext.Provider value={value}>
            {children}
        </userAuthContext.Provider>
    )
}
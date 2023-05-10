import { useContext, createContext, useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

type UserProps = {
  name: string;
  email: string;
  photo: string;
};

type AuthEmailPasswordProps = { email: string; password: string };

interface AuthContextProps {
  user: UserProps | null;
  isAuthenticated: boolean;
  AuthGoogle: () => void;
  AuthGitHub: () => void;
  AuthEmailPassword: ({ email, password }: AuthEmailPasswordProps) => void;
  SignOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserProps | any>(null);

  const AuthGoogle = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);

    const { user } = await auth().signInWithCredential(googleCredentials);
    const newUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };
    setUser(newUser);
  };

  const AuthGitHub = async () => {
    alert('Autenticação com GitHub');
  };

  const AuthEmailPassword = async ({
    email,
    password,
  }: AuthEmailPasswordProps) => {
    const userData = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const newUser = {
      name: userData.user.displayName,
      email: userData.user.email,
      photo: userData.user.photoURL,
    };
    setUser(newUser);
  };

  const SignOut = async () => {
    await auth().signOut();
    await GoogleSignin.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        AuthGoogle,
        AuthGitHub,
        AuthEmailPassword,
        isAuthenticated: !!user,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

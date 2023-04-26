import AppRoute from './app.routes';
import AuthRoute from './auth.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      Signup: undefined;
      Home: undefined;
      CreatePost: undefined;
      DetailsPost: {
        id: string;
      };
      UpdatePost: {
        id: string;
      };
    }
  }
}

export default function RouteRoot() {
  return <AppRoute />;
}

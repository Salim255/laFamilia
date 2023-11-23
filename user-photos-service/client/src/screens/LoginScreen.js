import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { loginUser } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await loginUser(email, password);

      authCtx.authenticate(token);
      setIsAuthenticating(false);
    } catch (error) {
      setIsAuthenticating(false);
      authCtx.logout();
      Alert.alert("Authentication failed!", "Could not log you in. Please try again later!");
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Login you in ..."} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

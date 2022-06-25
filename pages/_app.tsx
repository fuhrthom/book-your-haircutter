import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import AuthWrapper from "../firebase/AuthWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthWrapper>
        <Component {...pageProps} />
        <Toaster />
      </AuthWrapper>
    </RecoilRoot>
  );
}

export default MyApp;

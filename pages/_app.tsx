import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import AuthWrapper from "../firebase/AuthWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <AuthWrapper>
        <Component {...pageProps} />
        <Toaster />
      </AuthWrapper>
    </RecoilRoot>
  )
}

export default MyApp
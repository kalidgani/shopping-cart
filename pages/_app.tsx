import Header from "@/Layout/Header";
import "@/styles/globals.css";
import "@/assets/css/main.css"
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import Layout from "@/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return  (
    <>
    <Provider store={store}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </Provider>
    </>
  )
}

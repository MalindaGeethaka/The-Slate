import type { AppProps } from "next/app";
import "../styles/global.css";
import Navbar from "../src/components/Navbar/Navbar";

function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Navbar/>
  <Component {...pageProps} />;
  
</>);
}

export default App;
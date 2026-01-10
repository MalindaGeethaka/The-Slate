import type { AppProps } from "next/app";
import "../styles/global.css";
import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";

function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <Navbar/>
  <Component {...pageProps} />;
  <Footer/>
  
</>);
}

export default App;
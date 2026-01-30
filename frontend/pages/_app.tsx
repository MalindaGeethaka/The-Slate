import "../styles/global.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Component {...pageProps} />
      {!isAdminRoute && <Footer />}
    </>
  );
}

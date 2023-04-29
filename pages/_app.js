import AdminLayout from "layouts/admin";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@lib/AppContextProvider";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || AdminLayout;
  const Title = Component.title || null;

  return (
    <>
      <AppContextProvider>
        <Layout title={Title} key={router.route}>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </AppContextProvider>
    </>
  );
}

export default MyApp;

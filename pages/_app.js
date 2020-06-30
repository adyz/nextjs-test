import "scss/_header.scss";
import GlobalContextProvider from "components/Context";
import cookie from "cookie";
import App from "next/app";
import { appWithTranslation } from "components/i18n/i18n";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

function MyApp({ Component, pageProps, initialAuth }) {
  return (
    <GlobalContextProvider initialAuth={initialAuth}>
      <Component {...pageProps} />;
    </GlobalContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const cookies = parseCookies(appContext.ctx.req);
  const appProps = await App.getInitialProps(appContext);
  return {
    initialAuth: cookies.auth,
    ...appProps,
  };
};

export default appWithTranslation(MyApp);

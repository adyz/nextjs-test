import "scss/_header.scss";
import GlobalContextProvider from "components/Context";
import cookie from "cookie";

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

MyApp.getInitialProps = ({ ctx }) => {
  const cookies = parseCookies(ctx.req);
  return {
    initialAuth: cookies.auth,
  };
};

export default MyApp;

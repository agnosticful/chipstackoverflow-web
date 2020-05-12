import { ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";
import fetch from "isomorphic-fetch";
import { AppProps, AppContext } from "next/app";
import * as React from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/themes/light.css";
import "../global.css";
import useAuthentication, {
  AuthenticationProvider,
} from "../hooks/useAuthentication";
import { MyselfProvider } from "../hooks/useMyself";
import { AnalyticsProvider } from "../hooks/useAnalytics";

interface Props extends AppProps {
  apolloClient?: ApolloClient<any>;
  initialApolloState?: NormalizedCacheObject;
}

export default function AuhtneitcationProviderWrapper(props: Props) {
  return (
    <AuthenticationProvider>
      <App {...props} />
    </AuthenticationProvider>
  );
}

function App(props: Props) {
  const [apolloClient, setApolloClient] = React.useState(
    props.apolloClient ??
      new ApolloClient({
        link: new HttpLink({ fetch, uri: process.env.API_ENDPOINT }),
        cache: new InMemoryCache().restore(props.initialApolloState ?? {}),
      })
  );
  const { authenticationToken } = useAuthentication();

  React.useEffect(() => {
    setApolloClient(
      new ApolloClient({
        link: new HttpLink({
          fetch,
          uri: process.env.API_ENDPOINT,
          headers: authenticationToken
            ? { authorization: `Bearer ${authenticationToken}` }
            : {},
        }),
        cache: new InMemoryCache().restore(apolloClient.extract()),
      })
    );
  }, [authenticationToken]);

  return (
    <ApolloProvider client={apolloClient}>
      <MyselfProvider>
        <AnalyticsProvider>
          <props.Component {...props.pageProps} />
        </AnalyticsProvider>
      </MyselfProvider>
    </ApolloProvider>
  );
}

AuhtneitcationProviderWrapper.getInitialProps = async (context: AppContext) => {
  if (context.ctx.req && context.ctx.res) {
    const { getDataFromTree } = await import("@apollo/react-ssr");
    const apolloClient = new ApolloClient({
      link: new HttpLink({ fetch, uri: process.env.API_ENDPOINT }),
      cache: new InMemoryCache(),
      ssrMode: true,
    });

    await getDataFromTree(
      <context.AppTree apolloClient={apolloClient} pageProps={{}} />
    );

    return { initialApolloState: apolloClient.extract() };
  }

  return {};
};

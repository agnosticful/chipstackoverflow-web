import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { AppProps } from "next/app";
import * as React from "react";
import { RecoilRoot } from "recoil";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/themes/light.css";
import "@@/global.css";
import { useAnalyticsObservation } from "@@/hooks/useAnalytics";
import { useAuthenticationObservation } from "@@/hooks/useAuthentication";
import { useMyselfObservation } from "@@/hooks/useMyself";

function App(props: AppProps) {
  useAuthenticationObservation();
  useMyselfObservation();
  useAnalyticsObservation();

  return <props.Component {...props.pageProps} />;
}

export default (props: AppProps) => {
  const apolloClient = React.useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: process.env.NEXT_PUBLIC_API_ENDPOINT }),
        cache: new InMemoryCache(),
        defaultOptions: {
          query: { fetchPolicy: "no-cache" },
          mutate: { fetchPolicy: "no-cache" },
        },
      }),
    [process.env.NEXT_PUBLIC_API_ENDPOINT]
  );

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <App {...props} />
      </ApolloProvider>
    </RecoilRoot>
  );
};

export function reportWebVitals(metric: any) {
  console.info(metric);
}

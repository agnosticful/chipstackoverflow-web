import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { AppProps } from "next/app";
import * as React from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/themes/light.css";
import "@@/global.css";
import { AnalyticsProvider } from "@@/hooks/useAnalytics";
import { AuthenticationProvider } from "@@/hooks/useAuthentication";
import { MyselfProvider } from "@@/hooks/useMyself";

export default function AuhtneitcationProviderWrapper(props: AppProps) {
  const apolloClient = React.useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: process.env.NEXT_PUBLIC_API_ENDPOINT }),
        cache: new InMemoryCache(),
      }),
    [process.env.NEXT_PUBLIC_API_ENDPOINT]
  );

  return (
    <ApolloProvider client={apolloClient}>
      <AuthenticationProvider>
        <MyselfProvider>
          <AnalyticsProvider>
            <props.Component {...props.pageProps} />
          </AnalyticsProvider>
        </MyselfProvider>
      </AuthenticationProvider>
    </ApolloProvider>
  );
}

export function reportWebVitals(metric: any) {
  console.info(metric);
}

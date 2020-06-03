import Bugsnag from "@bugsnag/js";

Bugsnag.start({
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY!,
  releaseStage: process.env.NEXT_PUBLIC_BUGSNAG_RELEASE_STAGE,
});

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

export default class extends React.Component<AppProps> {
  private apolloClient = new ApolloClient({
    link: new HttpLink({ uri: process.env.NEXT_PUBLIC_API_ENDPOINT }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: "no-cache" },
      mutate: { fetchPolicy: "no-cache" },
    },
  });

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Bugsnag.notify(error, (event) => {
      const reactMetadata = {
        ...info,
        componentStack: info.componentStack
          .split(/\s*\n\s*/g)
          .reduce((formatted, line) => {
            if (line.length === 0) {
              return formatted;
            }

            return `${formatted}\n${line}`;
          }, ""),
      };

      event.addMetadata("react", reactMetadata);
    });
  }

  render() {
    return (
      <RecoilRoot>
        <ApolloProvider client={this.apolloClient}>
          <App {...this.props} />
        </ApolloProvider>
      </RecoilRoot>
    );
  }
}

export function reportWebVitals(metric: any) {
  console.info(metric);
}

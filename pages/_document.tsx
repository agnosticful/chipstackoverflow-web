import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import * as React from "react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head></Head>

        <body>
          <Main />

          <NextScript />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          ></script>
          <script
            // set send_page_view false to prevent sending page_view when the firebase app initializes
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${
                  JSON.parse(process.env.firebaseAppOptions!).measurementId
                }', { 'send_page_view': false });`,
            }}
          ></script>
        </body>
      </Html>
    );
  }

  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

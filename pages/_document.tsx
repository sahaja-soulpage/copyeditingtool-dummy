import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* <script src="https://unpkg.com/mathlive"></script> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;

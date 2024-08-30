import { Html, Head, Main, NextScript } from "next/document";
import Icon from "../static/logo.ico"

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/logo.ico" />
        <title>ConnectFarm</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

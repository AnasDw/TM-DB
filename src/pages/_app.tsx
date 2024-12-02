import { App } from "antd";
import { AppProps } from "next/app";
import { NextAdapter } from "next-query-params";
import { QueryClient, QueryClientProvider } from "react-query";
import { QueryParamProvider } from "use-query-params";

import { ThemeProvider } from "../lib/providers/ThemeProvider";

import "../styles/global.css";



export const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps<any>) => {
  const AnyComponent = Component as any;

  return (
    <ThemeProvider>
      <App component={false}>
          <QueryClientProvider client={queryClient}>
            <QueryParamProvider adapter={NextAdapter}>
                <AnyComponent {...pageProps} />
            </QueryParamProvider>
          </QueryClientProvider>
      </App>
    </ThemeProvider>
  );
};

export default MyApp;

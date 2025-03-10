import { store } from '@/states/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  </SessionProvider>
}

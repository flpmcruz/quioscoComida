import { QuioscoProvider } from '@/context/QuiscoProvider'
import '@/styles/globals.css'

//Puedo envolver este la app con mi context

export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}

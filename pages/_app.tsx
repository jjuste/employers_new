import '@/styles/globals.css'
import './css/ccwb.css'
import './css/nys-global-nav-fonts.css'
import './css/nys-global-nav.css'
import './css/nys-brand/health-and-human-services.css'
import './css/language.css'
// import './fonts/fontawesome/css/all.min.css'
import './fonts/icomoon/style.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

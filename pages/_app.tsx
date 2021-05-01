import { AppProps } from 'next/app'
import 'rc-time-picker/assets/index.css'
import React from 'react'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import Meta from '../foundations/Meta'
import '../styles/globals.scss'
import '../styles/loading-spinner.scss'
import theme from '../styles/theme'
import i18n from '../utils/i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Meta />
          <Component {...pageProps} />
        </I18nextProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp

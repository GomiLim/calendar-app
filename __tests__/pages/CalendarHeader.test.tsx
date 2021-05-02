import * as TLReact from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'
import CalendarHeader from '../../components/CalendarHeader'
import endpoint from '../../endpoints.config'
import i18n from '../../utils/i18n'

describe('헤더 레이아웃', () => {
  const container = TLReact.render(
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <CalendarHeader />
      </I18nextProvider>
    </RecoilRoot>,
  )

  it('컴포넌트 렌더링', async () => {
    const component = await container.findByTestId('calendar-header')
    expect(component).toBeDefined()
  })
  it('헤더 타이틀', async () => {
    const title = i18n.getDataByLanguage(endpoint.systemLocale).translation
      .calendar['header']?.title

    if (endpoint.systemLocale === 'ko') {
      expect(title).toBe('캘린더')
    } else {
      expect(title).toBe('Calendar')
    }
  })
})

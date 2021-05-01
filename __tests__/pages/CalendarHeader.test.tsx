import * as TLReact from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import CalendarHeader from '../../components/CalendarHeader'
// import {useTranslation} from '../../__mocks__/react-i18next'

describe('헤더 레이아웃', () => {
  // jest.mock('react-i18next', () => ({
  //   useTranslation: () => {
  //     return {
  //       t: (str) => str,
  //       i18n: {
  //         changeLanguage: () => new Promise(() => {}),
  //       },
  //     }
  //   },
  // }))

  it('헤더 타이틀', async () => {
    const container = TLReact.render(
      <RecoilRoot>
        <CalendarHeader />
      </RecoilRoot>,
    )

    // console.log('CONTAINER', container)
    const component = await container.findByTestId('calendar-header')
    console.log('COMPONENT', component)
    expect(component.textContent).toBe('캘린더')
    // expect(container).toHaveTextContent('캘린더')
    // expect(true).toBeTruthy()
  })
})

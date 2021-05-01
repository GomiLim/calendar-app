import { configure } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import 'jest-plugin-context/setup'

configure({
  testIdAttribute: 'data-testid',
})

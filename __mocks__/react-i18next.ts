import React from 'react'
// const reactI18next = require('react-i18next')
import { I18nextProvider, initReactI18next } from 'react-i18next'

const hasChildren = (node) =>
  node && (node.children || (node.props && node.props.children))

const getChildren = (node) =>
  node && node.children ? node.children : node.props && node.props.children

const renderNodes = (reactNodes) => {
  if (typeof reactNodes === 'string') {
    return reactNodes
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key]
    const isElement = React.isValidElement(child)

    if (typeof child === 'string') {
      return child
    }
    if (hasChildren(child)) {
      const inner = renderNodes(getChildren(child))
      return React.cloneElement(child, { ...child.props, key: i }, inner)
    }
    if (typeof child === 'object' && !isElement) {
      return Object.keys(child).reduce(
        (str, childKey) => `${str}${child[childKey]}`,
        '',
      )
    }

    return child
  })
}

const useMock: any = [(k) => k, {}]
useMock.t = (k) => (k) => k
useMock.i18n = {}

module.exports = {
  useTranslation: () => useMock,
  I18nextProvider,
  initReactI18next,
}

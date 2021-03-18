import React from 'react'
import {
  cancellablePromise,
  CancellablePromiseType,
  delay,
} from './promise-hooks'

export function useIsMounted() {
  const isMountedRef = React.useRef(true)
  const isMounted = React.useCallback(() => isMountedRef.current, [])

  React.useEffect(
    () => () => {
      isMountedRef.current = false
    },
    [],
  )

  return isMounted
}

export function useCancellablePromises<T>() {
  const pendingPromises = React.useRef<CancellablePromiseType<T>[]>([])

  const appendPendingPromise = (promise: CancellablePromiseType<T>) => {
    pendingPromises.current = [...pendingPromises.current, promise]
  }

  const removePendingPromise = (promise: Promise<T>) => {
    pendingPromises.current = pendingPromises.current.filter(
      (p) => p.promise !== promise,
    )
  }

  const clearPendingPromises = () =>
    pendingPromises.current.map((p) => p.cancel())

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  }

  return api
}

export function useClickPreventionOnDoubleClick<
  T extends (...args: any) => void
>(onClick: T, onDoubleClick: T) {
  const api = useCancellablePromises<T>()

  const handleClick = () => {
    api.clearPendingPromises()
    const waitForClick = cancellablePromise<T>(delay<T>(300))
    api.appendPendingPromise(waitForClick)

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick.promise)
        onClick()
      })
      .catch((errorInfo: { isCanceled: boolean; error: Error }) => {
        api.removePendingPromise(waitForClick.promise)
        if (!errorInfo.isCanceled) {
          throw errorInfo.error
        }
      })
  }

  const handleDoubleClick = () => {
    api.clearPendingPromises()
    onDoubleClick()
  }

  return [handleClick, handleDoubleClick]
}

export const useLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

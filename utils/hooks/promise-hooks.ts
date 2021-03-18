export type CancellablePromiseType<T> = {
  promise: Promise<T>
  cancel: () => void
}

export const cancellablePromise = <T>(
  promise: Promise<T>,
): CancellablePromiseType<T> => {
  let isCanceled = false

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (value: any) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isCanceled ? reject({ isCanceled, value }) : resolve(value),
      (error: Error) => reject({ isCanceled, error }),
    )
  })

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  }
}

export const delay = <T>(num: number) =>
  new Promise<T>((resolve) => setTimeout(resolve, num))

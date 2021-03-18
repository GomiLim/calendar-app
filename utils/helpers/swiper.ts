export default class Swipe {
  yDown: number | null
  element: HTMLDivElement | null
  yDiff: number | null
  onUpAction: null | (() => void)
  onDownAction: null | (() => void)
  onStartAction: null | (() => void)
  onEndAction: null | (() => void)

  constructor(element: HTMLDivElement | string) {
    this.yDown = null
    this.yDiff = null
    this.onUpAction = null
    this.onDownAction = null
    this.onStartAction = null
    this.onEndAction = null
    this.element =
      typeof element === 'string' ? document.querySelector(element) : element

    if (this.element) {
      this.element.ontouchstart = (evt: TouchEvent) => {
        this.yDown = evt.touches[0].clientY
      }
    }
  }

  onUp(callback: () => void) {
    this.onUpAction = callback
    return this
  }

  onDown(callback: () => void) {
    this.onDownAction = callback
    return this
  }

  onStart(callback: () => void) {
    this.onStartAction = callback
    return this
  }

  onEnd(callback: () => void) {
    this.onEndAction = callback
    return this
  }

  handleTouchMove(evt: TouchEvent) {
    if (!this.yDown) {
      return
    }

    const yUp = evt.touches[0].clientY

    this.yDiff = this.yDown - yUp

    if (this.yDiff > 0) {
      if (this.onUpAction) {
        this.onUpAction()
      }
    } else {
      if (this.onDownAction) {
        this.onDownAction()
      }
    }

    this.yDown = null
  }

  run() {
    if (this.element) {
      this.element.ontouchmove = (evt: TouchEvent) => {
        this.handleTouchMove(evt)
        // if (this.onStartAction) {
        //   this.onStartAction()
        // }
      }
      this.element.ontouchend = (evt: TouchEvent) => {
        // evt.preventDefault()
        if (this.onEndAction) {
          this.onEndAction()
        }
      }
      this.element.ontouchcancel = (evt: TouchEvent) => {
        // evt.preventDefault()
        if (this.onEndAction) {
          this.onEndAction()
        }
      }
    }
  }
}

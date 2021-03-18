import Swal, { SweetAlertResult } from 'sweetalert2'
import theme from '../../styles/theme'

type iconType = 'error' | 'success' | 'warning' | 'info'

const AlertOrConfirm = (
  confirm: boolean,
  titleText: string,
  icon: iconType,
  text?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
): Promise<SweetAlertResult> => {
  let fireOptions = {}
  if (confirm) {
    fireOptions = {
      focusConfirm: false,
      focusCancel: true,
      text,
      confirmButtonText,
      showCancelButton: confirm,
      cancelButtonText,
      confirmButtonColor: theme.palette.main.blue,
      reverseButtons: true,
      showCloseButton: true,
    }
  }

  const Confirm = Swal.mixin({
    showConfirmButton: confirm,
    toast: !confirm,
    timer: confirm ? undefined : 3000,
    timerProgressBar: !confirm,
    position: confirm ? 'center' : 'top-end',
    didOpen: confirm
      ? undefined
      : (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
  })

  return Confirm.fire({
    ...fireOptions,
    titleText,
    icon,
  })
}

export function Confirm(
  titleText: string,
  icon: iconType,
  text: string,
  confirmButtonText: string,
  cancelButtonText: string,
): Promise<SweetAlertResult> {
  return AlertOrConfirm(
    true,
    titleText,
    icon,
    text,
    confirmButtonText,
    cancelButtonText,
  )
}

export function Alert(titleText: string, e?: Error): Promise<SweetAlertResult> {
  if (e) console.error(e)

  return AlertOrConfirm(false, titleText, e ? 'error' : 'info')
}

export function Warn(titleText: string): Promise<SweetAlertResult> {
  return AlertOrConfirm(false, titleText, 'warning')
}

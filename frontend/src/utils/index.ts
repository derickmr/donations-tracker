export function hasEmptyFields(fields: object) {
  let hasEmptyField = false

  Object.values(fields).forEach((element) => {
    if (!element) {
      hasEmptyField = true
    }
  })

  return hasEmptyField
}

export function creditCardNumberMask(value = '') {
  let maskValue = value.replace(/[^\d]/g, '')

  if (maskValue.length > 0) {
    if (maskValue.length > 4) {
      maskValue = [maskValue.slice(0, 4), ' ', maskValue.slice(4)].join('')
    }

    if (maskValue.length > 9) {
      maskValue = [maskValue.slice(0, 9), ' ', maskValue.slice(9)].join('')
    }

    if (maskValue.length > 14) {
      maskValue = [maskValue.slice(0, 14), ' ', maskValue.slice(14)].join('')
    }

    if (maskValue.length > 19) maskValue = maskValue.substr(0, 19)

    return maskValue
  }
  return ''
}

export function dateMonthAndYearMask(value = '') {
  let maskValue = value.replace(/[^\d]/g, '')

  if (maskValue.length > 0) {
    if (maskValue.length > 2) {
      maskValue = [maskValue.slice(0, 2), '/', maskValue.slice(2)].join('')
    }

    if (maskValue.length > 7) maskValue = maskValue.substr(0, 7)

    return maskValue
  }
  return ''
}

export function cvvMask(value = '') {
  let maskValue = value.replace(/[^\d]/g, '')

  if (maskValue.length > 0) {
    if (maskValue.length > 4) maskValue = maskValue.substr(0, 4)
    return maskValue
  }
  return ''
}

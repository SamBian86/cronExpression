export function getItem(key) {
  return !!window.localStorage && window.localStorage.getItem(key)
}

export function setItem(key, value) {
  return !!window.localStorage && window.localStorage.setItem(key, value)
}

export function removeItem(key) {
  return !!window.localStorage && window.localStorage.removeItem(key)
}

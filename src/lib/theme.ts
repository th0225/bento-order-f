export function setTheme(mode: 'light' | 'dark') {
  const root = document.documentElement
  if (mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem('theme', mode)
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark')
  setTheme(isDark ? 'light' : 'dark')
}

export function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }
}
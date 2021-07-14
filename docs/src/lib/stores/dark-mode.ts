import { writable, get } from 'svelte/store'

type Theme = 'system' | 'dark' | 'light'

const createDarkMode = () => {
    const { subscribe, set } = writable<Theme>('system')

    return {
        subscribe,
        set: (newTheme: Theme) => {
            localStorage.setItem('theme', newTheme)
            set(newTheme)
        },
    }
}

const darkMode = createDarkMode()
const isDark = writable(false)

const setClass = (newTheme: Theme) => {
    const { classList } = document.body
    let isNowDark = newTheme === 'dark'
    if (newTheme === 'system') isNowDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isNowDark) classList.add('dark')
    else classList.remove('dark')

    isDark.set(isNowDark)
}

const handlePreferenceChange = () => {
    if (get(darkMode) === 'system') setClass('system')
}

const handleLocalStorageChange = () => {
    const theme = localStorage.getItem('theme') as Theme | null
    if (theme) darkMode.set(theme)
}

const setupDarkMode = () => {
    const userPreferences = window.matchMedia('(prefers-color-scheme: dark)')
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme) darkMode.set(savedTheme)
    else darkMode.set('system')

    darkMode.subscribe(setClass)
    userPreferences.addEventListener('change', handlePreferenceChange)
    window.addEventListener('storage', handleLocalStorageChange)
}

if (typeof window !== 'undefined') setupDarkMode()

export { darkMode, isDark }

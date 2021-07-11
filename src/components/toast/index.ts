import { writable } from 'svelte/store'

export type ToastVariant = 'default' | 'error' | 'success'

export type Toast = {
    text: string
    action?: {
        text: string
        onClick: () => void
    }
    cancel?: {
        text: string
        onClick: () => void
    }
    variant?: ToastVariant
    duration?: number
}

export type _ToastItem = Toast & { key: string }

export const _toasts = writable<_ToastItem[]>([])

export const showToast = (toast: Toast): void => {
    _toasts.update((previous) => [
        ...previous,
        { ...toast, key: String(Date.now() + Math.random()) },
    ])
}

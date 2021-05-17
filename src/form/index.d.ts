import type { Writable } from 'svelte/store'

export type FormMethod = 'POST' | 'PATCH' | 'PUT' | 'DELETE' | undefined
export type FormState = 'ready' | 'success' | 'submitting' | 'error'
export type FormDataValue =
    | string
    | Record<string, string>
    | boolean
    | number
    | string[]
    | FileList
    | File
export type FormData = {
    [name: string]: FormDataValue
}
export type UpdateFormCallback = (
    name: string,
    data: FormDataValue,
    validate: () => boolean,
    reset: () => void
) => void
export type FormSyncError =
    | {
          status: number | 'offline' | 'unknown'
      }
    | undefined
export type FormSync =
    | {
          formState: Writable<FormState>
          updateForm: UpdateFormCallback
          error: Writable<FormSyncError>
      }
    | undefined
export type FormOnSuccess = CustomEvent<FormData>
export type FormOnErrorDetail = { status?: number | 'offline'; message?: string; data: FormData }
export type FormDispatcher = {
    error: FormOnErrorDetail
    success: FormData
    stateChange: FormState
}
export type FormOnError = CustomEvent<FormOnErrorDetail>
export type FormOnStateChange = CustomEvent<FormState>
export type HandleSubmit =
    | ((formData: FormData) => Promise<boolean | Omit<FormOnErrorDetail, 'data'>>)
    | undefined

export type FormMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | undefined
export type FormState = 'ready' | 'success' | 'submitting' | 'error'
export type FormDataValue = string | Record<string, string> | boolean | number | string[] | FileList
export type FormData = {
    [name: string]: FormDataValue
}
export type UpdateFormCallback = (
    name: string,
    data: FormDataValue,
    validate: () => boolean,
    reset: () => void
) => void
export type FormSync =
    | {
          formState: Writable<FormState>
          updateForm: UpdateFormCallback
      }
    | undefined
export type FormOnSuccess = CustomEvent<FormData>
export type FormOnErrorDetail = { status?: number; message?: string; data: FormData }
export type FormDispatcher = {
    error: FormOnErrorDetail
    success: FormData
    stateChange: FormState
}
export type FormOnError = CustomEvent<FormOnErrorDetail>
export type HandleSubmit =
    | ((formData: FormData) => Promise<boolean | Omit<FormOnErrorDetail, 'data'>>)
    | undefined

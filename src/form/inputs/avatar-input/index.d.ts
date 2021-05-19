export type ErrorEventDetail = {
    isValid: boolean
    errorMessage: string
}
export type AvatarInputErrorEvent = CustomEvent<ErrorEventDetail>
export type AvatarInputDispatcher = {
    error: ErrorEventDetail
}

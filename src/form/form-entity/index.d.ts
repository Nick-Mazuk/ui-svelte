export type DescriptionLink = {
    value: string
    href: string
}
export type ErrorMessages = {
    default: string
    offline: string | false
    403: string | false
    429: string | false
    400: string | false
    500: string | false
}
export type FormEntityDispatcher = {
    primaryClick: MouseEvent
    secondaryClick: MouseEvent
    destructiveClick: MouseEvent
}

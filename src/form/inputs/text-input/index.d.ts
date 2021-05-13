export type ValidationRules = {
    assert: (value: string) => boolean
    error: string
}[]
export type Parser = ((value: string) => FormDataValue) | undefined
export type Updater = ((value: string, oldValue: string) => string) | undefined
export type Formatter = ((value: string) => string) | undefined

export type ChangeDetail = {
    value: string
    parsedValue: string
}
export type TextInputChangeEvent = CustomEvent<ChangeDetail>
export type TextInputDispatcher = {
    change: ChangeDetail
}

// native HTML typings
export type TextInputType = 'text' | 'email' | 'number' | 'password' | 'search' | 'textarea' | 'url'
export type TextInputKeyboard =
    | 'decimal'
    | 'none'
    | 'email'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'url'
    | undefined
export type TextInputAutocomplete =
    | 'off'
    | 'on'
    | 'name'
    | 'honorific-prefix'
    | 'given-name'
    | 'additional-name'
    | 'family-name'
    | 'honorific-suffix'
    | 'nickname'
    | 'email'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'one-time-code'
    | 'organization-title'
    | 'organization'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level1'
    | 'address-level2'
    | 'address-level3'
    | 'address-level4'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'sex'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-extension'
    | 'impp'
    | 'url'
    | 'photo'
    | undefined

export type OauthTypes = 'apple' | 'facebook' | 'google' | 'twitter'
export type OauthOnClick = CustomEvent<OauthTypes>
export type OauthDispatcher = {
    click: OauthTypes
}

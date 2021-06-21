export const FORM_FEEDBACK = Object.freeze({
    errors: {
        default: 'There was an internal error. Please try again.',
        offline: 'You are offline. Connect to the internet and try again.',
        403: 'You are not authorized to make this request.',
        429: 'You are making too many requests. Wait a few minutes and try again.',
        400: 'There was an internal error. Please try again.',
        500: 'There was an internal error. Please try again.',
    },
    success: {
        default: 'Submitted successfully',
        saved: 'Saved successfully',
    },
    auth: {
        errors: {
            noEmailFound: 'There is not an account with that email.',
            invalidEmailLogin: 'Invalid email or password. Try again.',
            resetPasswordLinkExpired:
                'Password reset link expired. Request a new link and try again.',
        },
        success: {
            passwordIsReset: 'Your password is reset and you can sign in',
            passwordResetLinkSent: 'Check your email for the password reset link.',
        },
    },
})

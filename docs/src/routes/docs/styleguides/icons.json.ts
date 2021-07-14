import type { RequestHandler } from '@sveltejs/kit'
import { getAllIcons } from '$lib/lib/icons'

export const get: RequestHandler = () => {
    return {
        body: {
            icons: getAllIcons(),
        },
    }
}

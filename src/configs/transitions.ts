export type TransitionSpeed = 'none' | 'small' | 'medium' | 'large'

export const TRANSITION_SPEED_MAP: Record<
    TransitionSpeed,
    { in: number; out: number; default: number }
> = Object.freeze({
    none: {
        in: 0,
        out: 0,
        default: 0,
    },
    small: {
        in: 150,
        out: 100,
        default: 150,
    },
    medium: {
        in: 250,
        out: 200,
        default: 250,
    },
    large: {
        in: 300,
        out: 225,
        default: 300,
    },
})

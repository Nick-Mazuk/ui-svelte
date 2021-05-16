import type { Writable } from 'svelte/store'

export type HeaderContext =
    | {
          currentPage: Writable<string>
      }
    | undefined

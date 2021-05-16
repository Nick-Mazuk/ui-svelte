import type { Writable } from 'svelte/store'

export type HeaderContext =
    | {
          currentPage: Writable<string>
          sticky: Writable<boolean>
          scrolledToTop: Writable<boolean>
      }
    | undefined

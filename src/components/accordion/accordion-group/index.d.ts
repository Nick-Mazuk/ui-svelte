import type { Writable } from 'svelte/store'

export type AccordionGroupContext =
    | {
          openedItem: Writable<number>
      }
    | undefined

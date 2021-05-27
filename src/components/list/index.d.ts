import type { Writable } from 'svelte/store'
import type { ListItemVariant, ListItemShape } from './list-item'

export type ListMode = 'display' | 'interactive' | 'singleSelect'
export type RegisterListItem = (options: { selected: boolean; key: string }) => void
export type ListContext =
    | {
          itemKeys: Writable<string[]>
          focusedItem: Writable<string | undefined>
          selectedItem: Writable<string | undefined>
          registerListItem: registerListItem
          variantStore: Writable<ListItemVariant | undefined>
          shapeStore: Writable<ListItemShape | undefined>
          modeStore: Writable<ListMode>
      }
    | undefined

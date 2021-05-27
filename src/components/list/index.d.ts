import type { Writable } from 'svelte/store'
import type { ListItemVariant, ListItemShape } from './list-item'

export type ListMode = 'display' | 'interactive' | 'singleSelect'
export type ListRole = 'list' | 'listbox' | 'menu'
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
          compactStore: Writable<boolean>
          roleStore: Writable<ListRole>
      }
    | undefined

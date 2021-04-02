import { render } from '@testing-library/svelte'

import DarkModeSelect from './dark-mode-select.svelte'

it('renders without crashing', () => {
    const { container } = render(DarkModeSelect)
    expect(container).not.toBeEmptyDOMElement()
})

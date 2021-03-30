import { render } from '@testing-library/svelte'

import Icon from './icon.svelte'

it('renders without crashing', () => {
    const { container } = render(Icon)
    expect(container).not.toBeEmptyDOMElement()
})

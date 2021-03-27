import { render } from '@testing-library/svelte'

import ComponentTemplate from './component-template.svelte'

it('renders without crashing', () => {
    const { container } = render(ComponentTemplate)
    expect(container).not.toBeEmptyDOMElement()
})

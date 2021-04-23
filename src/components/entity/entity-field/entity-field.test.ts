import { render } from '@testing-library/svelte'

import EntityField from './entity-field.svelte'

it('renders without crashing', () => {
    const { container } = render(EntityField)
    expect(container).not.toBeEmptyDOMElement()
})

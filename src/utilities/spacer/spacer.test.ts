import { render } from '@testing-library/svelte'

import Spacer from './spacer.svelte'

it('renders without crashing', () => {
    const { container } = render(Spacer)
    expect(container).not.toBeEmptyDOMElement()
})

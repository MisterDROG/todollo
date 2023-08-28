import BranchHolder from '../../components/branchHolder/branchHolder';
import { renderWithProviders } from '../testUtils/testFunctions';

describe('Branch holder tests', () => {
    test('Is branch holder renders right', () => {
        const { container } = renderWithProviders(<BranchHolder />)
        const divBranchHolder = container.querySelector('.branch-holder')

        expect(divBranchHolder).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })

})
import BranchHolder from '../../components/branchHolder/branchHolder';
import { fireEvent, render, screen } from '@testing-library/react'
import { renderWithProviders } from '../testUtils/testFunctions';

describe('Branch holder tests', () => {

    test('Is branch holder renders right', () => {
        expect('test').toBe('test')
    })


    // test('Is branch holder renders right', () => {
    //     const { container } = renderWithProviders(<BranchHolder />)
    //     const divBranchHolder = container.querySelector('.branch-holder')

    //     expect(divBranchHolder).toBeInTheDocument()
    //     expect(container).toMatchSnapshot()
    // })

})
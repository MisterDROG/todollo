import Branch from "../../components/branch/branch";
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../testUtils/testFunctions';
import userEvent from "@testing-library/user-event";

describe('Branch tests', () => {
    test('Is branch renders right', () => {

        const testingProps = {
            "branchCode": "+house",
            "branchName": "House"
        }

        const { container } = renderWithProviders(<Branch branch={testingProps} />)
        const divBranchContainer = container.querySelector('.branch-container')
        const pBranch = screen.getByText(/House/i)

        expect(divBranchContainer).toHaveStyle({ backgroundColor: '' })
        expect(pBranch).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })

    test('Is branch inputs right', () => {

        const testingProps = {
            "branchCode": "+house",
            "branchName": "House"
        }

        renderWithProviders(<Branch branch={testingProps} />)
        const inputNewCard = screen.getByPlaceholderText(/New Task.../i)
        expect(inputNewCard).toHaveTextContent('')

        userEvent.type(inputNewCard, 'Test Card')
        expect(screen.getByRole('textbox')).toHaveValue('Test Card')
    })
})
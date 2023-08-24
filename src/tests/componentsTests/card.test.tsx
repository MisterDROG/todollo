import { screen } from '@testing-library/react'
import Card from "../../components/card/card";
import { renderWithProviders } from '../testUtils/testFunctions';

describe('Card tests', () => {
    test('Is cards renders', () => {
        const testingProps = {
            "branch": "+work",
            "date": "11.03.22",
            "id": "4",
            "status": "unDone",
            "task": "Write program",
            "order": 1
        }
        const { container } = renderWithProviders(<Card todo={testingProps} />)
        const pTask = screen.getByText(/Write program/i)
        expect(pTask).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })
})
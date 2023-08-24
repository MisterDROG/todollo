import Card from "../../components/card/card";
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../testUtils/testFunctions';

describe('Card tests', () => {

    const testingProps = {
        "branch": "+work",
        "date": "11.03.22",
        "id": "4",
        "status": "Done",
        "task": "Write program",
        "order": 1
    }

    test('Is cards renders right', () => {
        const { container } = renderWithProviders(<Card todo={testingProps} />)
        const pTask = screen.getByText(/Write program/i)

        expect(pTask).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })

    // test('Done button test', () => {
    //     const { container } = renderWithProviders(<Card todo={testingProps} />)

    //     const buttonDone = container.querySelector('.card__button-status_done')
    //     expect(buttonDone).toBeInTheDocument()

    //     buttonDone && fireEvent.click(buttonDone)

    //     const buttonUndone = container.querySelector('.card__button-status_undone')
    //     expect(buttonUndone).toBeInTheDocument()
    // })
})
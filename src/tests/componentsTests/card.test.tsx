import Card from "../../components/card/card";
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../testUtils/testFunctions';

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import APItodollo from "../../utils/APItodollo";

jest.mock('APItodollo', () => ({ 
    sendData: jest.fn(),
    getData: jest.fn(),
  }))

const mocData = [
    {
        "branch": "+house",
        "date": "01.02.22",
        "id": "1",
        "status": "unDone",
        "task": "Wash floor",
        "order": 1
    },
    {
        "branch": "+house",
        "date": "15.05.22",
        "id": "2",
        "status": "unDone",
        "task": "Cook food",
        "order": 2
    },
    {
        "branch": "+house",
        "date": "23.09.22",
        "id": "3",
        "status": "unDone",
        "task": "Buy dishes",
        "order": 3
    },
    {
        "branch": "+work",
        "date": "11.03.22",
        "id": "4",
        "status": "unDone",
        "task": "Write program",
        "order": 1
    },
    {
        "branch": "+work",
        "date": "16.04.22",
        "id": "5",
        "status": "unDone",
        "task": "Work with Excel",
        "order": 2
    },
    {
        "branch": "+work",
        "date": "07.05.22",
        "id": "6",
        "status": "unDone",
        "task": "Send emails",
        "order": 3
    },
    {
        "branch": "+sport",
        "date": "06.04.22",
        "id": "7",
        "status": "unDone",
        "task": "Do squads",
        "order": 1
    },
    {
        "branch": "+sport",
        "date": "22.11.22",
        "id": "8",
        "status": "unDone",
        "task": "Play basketball",
        "order": 2
    },
    {
        "branch": "+sport",
        "date": "17.12.22",
        "id": "9",
        "status": "unDone",
        "task": "Upgrade bike",
        "order": 3
    }
]

export const handlers = [
    rest.get('https://todollo-default-rtdb.firebaseio.com/todos.json', (req, res, ctx) => {
        return res(ctx.json((mocData)), ctx.delay(150))
    })
]

const server = setupServer(...handlers)


describe('Card tests', () => {

    // Enable API mocking before tests.
    beforeAll(() => server.listen())

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers())

    // Disable API mocking after the tests are done.
    afterAll(() => server.close())

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

    test('Done button test', () => {
        const { container } = renderWithProviders(<Card todo={testingProps} />)

        const buttonDone = container.querySelector('.card__button-status_done')
        expect(buttonDone).toBeInTheDocument()

        // const method = jest.spyOn(APItodollo, 'sendData')
        // .mockImplementation(() => Promise.resolve({
        // data: 'value'
        // }));

        APItodollo.sendData.mockImplementation(() => Promise.resolve({ data: 'value' }))

        // const APItodollo = {
        //     sendData: jest.fn(() => Promise.resolve({ data: 'value' })),
        //     getData: jest.fn(() => Promise.resolve({ data: 'value' })),
        //   }

        buttonDone && fireEvent.click(buttonDone)

        const buttonUndone = container.querySelector('.card__button-status_undone')
        expect(buttonUndone).toBeInTheDocument()
    })
})


// import fetchData from './fetchData'

// test('it should call with correct args', function () {
//   const api = {
//     getSomeData: jest.fn(() => Promise.resolve({ data: 'value' }))
//   }
//   const dispatch = jest.fn();
  
//   fetchData(1)(dispatch, null, { api });

//   expect(api.getSomeData).toHaveBeenCalledWith(1);
//   expect(dispatch).toHaveBeenCalledWith({
//     type: FETCH_DATA_SUCCESS, 
//     payload: 'value'
//   });
// });


// import api from './api';
// import fetchData from './fetchData'

// test('it should call with correct args', function () {
//   const method = jest.spyOn(api, 'getSomeData')
//     .mockImplementation(() => Promise.resolve({
//       data: 'value'
//     }));

//   const dispatch = jest.fn();

//   fetchData(1)(dispatch);

//   expect(method).toHaveBeenCalledWith(1);
//   expect(dispatch).toHaveBeenCalledWith({
//     type: FETCH_DATA_SUCCESS, 
//     payload: 'value'
//   });
// });
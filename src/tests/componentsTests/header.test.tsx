import Header from "../../components/header/header"
import { render, screen } from '@testing-library/react'

describe('Header tests', () => {
    test('Is header renders right', () => {

        const { container } = render(<Header />)
        const divLogoContainer = container.querySelector('.header__logo-container')
        const pLogoText = screen.getByText(/ToDollo board/i)

        expect(pLogoText).toBeInTheDocument()
        expect(divLogoContainer).toBeInTheDocument()
        expect(container).toMatchSnapshot()
    })
})
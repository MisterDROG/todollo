import { useState } from "react";

//custom hook for for managing the form input field

export function useInputChange(initialValue: string) {
    const [value, setValue] = useState(initialValue)

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return {
        value,
        onChange,
        setValue
    }

}
import { useState } from "react";

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
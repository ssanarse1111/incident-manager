import React, { useState } from 'react'

export const useInput = (validateValue: any) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    function valueChangeHandler(event: any) {
        setValue(event.target.value);
    }

    function inputBlurHandler(event: any) {
        setIsTouched(true);
    }

    function reset() {
        setValue('');
        setIsTouched(false);
    }


  return {
    value: value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}













import { useState } from 'react';

/**
 * 담당자 : 성아영
 */
function useInput(initialValue, validator) {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return [value, onChange, setValue];
}

export default useInput;

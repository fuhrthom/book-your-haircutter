import { useState } from "react";

const useInput = (value: any) => {
  const [state, setState] = useState(value);
  const updateStateFromEvent = (event: any) => setState(event.target.value);
  return [state, setState, updateStateFromEvent];
};

export default useInput;

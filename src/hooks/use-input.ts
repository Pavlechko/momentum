import { ChangeEvent, useReducer } from 'react';

import { Action } from '../models/action.types';
import {
  INPUT_ACTION_FOCUS,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_CLEAR,
  InputActionType,
} from '../models/input-actions';
import { InputState } from '../models/input.types';
import { Validation } from '../models/validation.types';

const initialInputState: InputState = {
  text: '',
  isFocus: false,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
  const { type, value = '' } = action;

  switch (type) {
    case INPUT_ACTION_CHANGE:
      return { text: value, isFocus: state.isFocus };
    case INPUT_ACTION_FOCUS:
      return { text: state.text, isFocus: true };
    case INPUT_ACTION_CLEAR:
      return { text: '', isFocus: false };

    default:
      return { ...state };
  }
};

const useInput = (validation?: Validation) => {
  const [{ text, isFocus }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;
  let errorText = ' ';

  if (validation) {
    const { isValid, helperText } = validation(text);
    shouldDisplayError = !isValid && isFocus;
    errorText = helperText ? helperText : ' ';
  }

  const changeTextHendler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
  };

  const inputFocusHandler = () => {
    dispatch({ type: INPUT_ACTION_FOCUS });
  };

  const inputClearHandler = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    shouldDisplayError,
    errorText,
    changeTextHendler,
    inputFocusHandler,
    inputClearHandler,
  };
};

export default useInput;
import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  InputLabel,
  TextField,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import useInput from '../../../hooks/use-input';
import { validatePasswod } from '../../../utils/validation/validator-length';
import { validateName } from '../../../utils/validation/validator-name';
import { LoginUser } from '../../../models/Auth/login-uset.types';

const LoginFormComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    text: name,
    shouldDisplayError: isNameError,
    errorText: nameErrorText,
    changeTextHendler: nameTextHendler,
    inputFocusHandler: nameFocusHandler,
    inputClearHandler: nameClearHandler,
  } = useInput(validateName);

  const {
    text: password,
    shouldDisplayError: isPasswordError,
    errorText: passwordErrorText,
    changeTextHendler: passwordTextHendler,
    inputFocusHandler: passwordFocusHandler,
    inputClearHandler: passwordClearHandler,
  } = useInput(validatePasswod);

  const clearForm = () => {
    nameClearHandler();
    passwordClearHandler();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginUser: LoginUser = {
      name,
      password,
    };

    console.log('LoginUser', loginUser);
    clearForm();
  };

  const handleClickShowPassword = () =>
    setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Grid container direction="column" justifyContent="flex-start">
        <Typography variant="h6" component="h1">
          Sign in to Momentum
        </Typography>

        <TextField
          type="name"
          name="name"
          label="Name"
          variant="outlined"
          required={true}
          margin="dense"
          value={name}
          onChange={nameTextHendler}
          onBlur={nameFocusHandler}
          error={isNameError}
          helperText={nameErrorText}
        />

        <FormControl
          variant="outlined"
          required={true}
          margin="dense"
          error={isPasswordError}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            margin="dense"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={passwordTextHendler}
            onBlur={passwordFocusHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error={isPasswordError}>
            {passwordErrorText}
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          disabled={isNameError || isPasswordError}
        >
          Sign In
        </Button>

        <div className="question">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Grid>
    </form>
  );
};

export default LoginFormComponent;
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Checkbox } from '@mui/material';

import useInput from '../../../hooks/use-input';
import { validateName } from '../../../utils/validation/validator-name';
import { validatePasswod } from '../../../utils/validation/validator-length';
import { UserRequest } from '../../../models/Auth/user.types';
import { registration } from '../../../services/api.service';
import { UserContext } from '../../../context/UserContext';

const RegistrationFormComponent = () => {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

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

  const {
    text: confirmPassword,
    shouldDisplayError: isConfirmPasswordError,
    changeTextHendler: confirmPasswordTextHendler,
    inputFocusHandler: confirmPasswordFocusHandler,
    inputClearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswod);

  const clearForm = () => {
    nameClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: UserRequest = {
      name,
      password,
    };

    registration(newUser).then(user => {
      console.log("User registration then")
      setUser(user)
      if (user.loggedIn) {
        navigate('/');
      }
    })
    .catch(error => {
      console.error(error)
    })
    clearForm();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Grid container direction="column" justifyContent="flex-start">
        <Typography variant="h6" component="h1">
          Sign Up
        </Typography>
        <TextField
          type="text"
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

        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          required={true}
          margin="dense"
          value={password}
          onChange={passwordTextHendler}
          onBlur={passwordFocusHandler}
          error={isPasswordError}
          helperText={passwordErrorText}
        />

        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm password"
          variant="outlined"
          required={true}
          margin="dense"
          value={confirmPassword}
          onChange={confirmPasswordTextHendler}
          onBlur={confirmPasswordFocusHandler}
          error={confirmPassword.length > 0 && confirmPassword !== password}
          helperText={
            confirmPassword.length > 0 && confirmPassword !== password
              ? 'Passwords must mutch'
              : ' '
          }
        />

        <Button
          type="submit"
          variant="contained"
          disabled={
            confirmPassword !== password ||
            isNameError ||
            isPasswordError
          }
        >
          Sign Up
        </Button>

        <div className="question">
          <span>Already have a Momentum account? </span>
          <Link to="/signin">Sign In</Link>
        </div>
      </Grid>
    </form>
  );
};

export default RegistrationFormComponent;
import React, {ChangeEvent, FormEventHandler, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {actions} from "../../services/reducers/auth";
import {getUser, updateUser} from "../../services/api";
import {baseUrl, getUserdataEndpoint} from "../../utils/constants";
import {validateEmail} from "../../utils/utils";
import styles from "./edit-profile.module.css";
import {useDispatch, useSelector} from "../../utils/hooks";

function EditProfile() {
  const dispatch = useDispatch();
  const {setUserName, setUserEmail} = actions;

  function isCurrentStateEqualToInitial() {
    return !(initialState.name !== name || initialState.email !== email || initialState.password !== password);

  }

  const {nameInStore, emailInStore} = useSelector((store) => ({
    nameInStore: store.auth.user.name,
    emailInStore: store.auth.user.email
  }))
  const [initDone, setInitDone] = useState(false);
  const [name, setName] = useState(nameInStore);
  const [email, setEmail] = useState(emailInStore);
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const initialState = {
    name: "",
    email: "",
    password: ""
  };
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim().length < 3) {
      setNameError(true);
    } else if (nameError) {
      setNameError(false);
    }
  }
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else if (nameError) {
      setEmailError(false);
    }
  }
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  }
  const init: () => void = useCallback(async () => {
    await dispatch(getUser(baseUrl + getUserdataEndpoint, setUserName, setUserEmail));
    setInitDone(true);
  }, [dispatch, setUserName, setUserEmail]);

  useEffect(() => {
    init()
  }, [init]);
  useEffect(() => {
    setName(nameInStore);
    setEmail(emailInStore);
  }, [nameInStore, emailInStore]);
  if (!initDone) {
    return null;
  }
  const onReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setName(nameInStore);
    setEmail(emailInStore);
    setPassword("");

  }
  const onSave = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(
      baseUrl + getUserdataEndpoint,
      {
        name,
        email,
        password
      },
      setUserName,
      setUserEmail
    ));

  }

  return (
    <section>
      <form onSubmit={onSubmit}>
        <ul>
          <li>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onNameChange}
              icon={'EditIcon'}
              value={name}
              name={'name'}
              error={nameError}
              errorText={'Имя должно быть от Трех символов'}
              size={'default'}
            />
          </li>
          <li className='mt-6 mb-6'>
            <Input
              type={'text'}
              placeholder={'Логин'}
              onChange={onEmailChange}
              icon={'EditIcon'}
              value={email}
              name={'email'}
              error={emailError}
              errorText={'Введите корректный email'}
              size={'default'}
            />
          </li>
          <li>
            <PasswordInput
              onChange={onPasswordChange}
              value={password}
              name={'password'}
            />
          </li>
        </ul>
        {!isCurrentStateEqualToInitial() && (
          <div className={styles.buttonsWrapper + " mt-6"}>
            <Button type="secondary" size="medium" onClick={onReset}>
              Отмена
            </Button>
            <Button type="primary" size="medium" onClick={onSave}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </section>
  )
}

export default EditProfile;

import React, {useCallback, useEffect, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../services/reducers/auth";
import {getUser, updateUser} from "../../services/api";
import {baseUrl, getUserdataEndpoint} from "../../utils/constants";
import {validateEmail} from "../../utils/utils";
import styles from "./edit-profile.module.css";

function EditProfile() {
  const dispatch = useDispatch();
  const {setUserName, setUserEmail} = actions;

  function isCurrentStateEqualToInitial() {
    if (initialState.name !== name || initialState.email !== email || initialState.password !== password) {
      return false;
    }
    return true;
  }

  const {nameInStore, emailInStore} = useSelector(store => ({
    nameInStore: store.auth.user.name,
    emailInStore: store.auth.user.email
  }))
  const [initDone, setInitDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [initialState, setInitialState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const onNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim().length < 3) {
      setNameError(true);
    } else if (nameError) {
      setNameError(false);
    }
  }
  const onEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else if (nameError) {
      setEmailError(false);
    }
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  const init = useCallback(async () => {
    const data = await dispatch(getUser(baseUrl + getUserdataEndpoint, setUserName, setUserEmail));
    if (data) {
      const newName = data.user.name;
      const newEmail = data.user.email;
      await setName(newName);
      await setEmail(newEmail);
      await setInitialState({
        name: newName,
        email: newEmail,
        password: ""
      })
    }
    setInitDone(true);
  }, [dispatch, setUserName, setUserEmail]);
  useEffect(() => {
    init()
  }, [init]);
  if (!initDone) {
    return null;
  }
  const onReset = (e) => {
    setName(nameInStore);
    setEmail(emailInStore);
    setPassword("");

  }
  const onSave = (e) => {
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

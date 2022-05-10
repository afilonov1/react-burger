import React, {ChangeEventHandler, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {baseUrl, registerEndpoint} from "../../utils/constants";
import {actions} from "../../services/reducers/auth";
import {requestData} from "../../services/api";
import {useDispatch, useSelector} from "../../utils/hooks";

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector((store) => store.auth.isAuth);


  const {registerError, registerRequest, registerSuccess} = actions;
  const dispatch = useDispatch();
  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  const onChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
  }
  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
      name
    };
    await dispatch(requestData({
      method: "POST",
      url: baseUrl + registerEndpoint,
      body: body,
      successAction: registerSuccess,
      requestAction: registerRequest,
      errorAction: registerError,
      setCookie: true
    }));

  }
  if (isAuth) {
    return (
      <Redirect to="/"/>
    );
  }
  return (
    <section className="auth__section">
      <form className="auth__form" onSubmit={onSubmit}>
        <h1 className="auth__title text text_type_main-medium">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChangeName}
          value={name}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onChangeEmail}
          value={email}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={'password'}
        />
        <Button type="primary" size="medium">
          Зарегестрироваться
        </Button>
      </form>
      <p className="auth__footer-text text text_type_main-default">
        Уже зарегестрированы? <Link className="auth__link" to="/login">Войти</Link>
      </p>
    </section>
  );
}

export default RegisterPage;

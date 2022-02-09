import React from 'react';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {baseUrl} from "../../utils/constants";
import {useDispatch} from "react-redux";
import {actions} from "../../services/reducers/auth";
import {requestData} from "../../services/api";

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const {loginSuccess, loginError, loginRequest} = actions;
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault();
    const body = {
      email, password
    }
    dispatch(requestData({
      method: "POST",
      url: baseUrl +  "auth/login",
      body: body,
      successAction: loginSuccess,
      requestAction: loginRequest,
      errorAction: loginError
    }));

  }
  return (
    <section className="auth__section" onSubmit={onSubmit}>
      <form className="auth__form">
        <h1 className="auth__title text text_type_main-medium">Вход</h1>
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
          Войти
        </Button>
      </form>
      <p className="auth__footer-text text text_type_main-default">
        Вы - новый пользователь? <Link className="auth__link" to="/register">Зарегестрироваться</Link>
      </p>
      <p className="auth__footer-text text text_type_main-default">
        Забыли пароль? <Link className="auth__link" to="/forgot-password">Восстановить пароль</Link>
      </p>
    </section>
  );
}
export default LoginPage;

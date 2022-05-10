import React, {useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {baseUrl, loginEndpoint} from "../../utils/constants";
import {actions} from "../../services/reducers/auth";
import {requestData} from "../../services/api";
import {useDispatch, useSelector} from "../../utils/hooks";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector((store) => store.auth.isAuth);
  const dispatch = useDispatch();
  const {loginSuccess, loginError, loginRequest} = actions;
  interface LocationState {
    from: {
      pathname: string;
    };
  }
  const location = useLocation<LocationState>();
  const direction = location.state?.from?.pathname || "/";

  const onChangeEmail = (e: { target: HTMLInputElement }) => {
    setEmail(e.target.value)
  }
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const body = {
      email, password
    }
    dispatch(requestData({
      method: "POST",
      url: baseUrl + loginEndpoint,
      body: body,
      successAction: loginSuccess,
      requestAction: loginRequest,
      errorAction: loginError,
      setCookie: true
    }));

  }
  if (isAuth) {
    return (
      <Redirect to={{pathname: direction}}/>
    )
  }

  return (
    <section className="auth__section">
      <form className="auth__form" onSubmit={onSubmit}>
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

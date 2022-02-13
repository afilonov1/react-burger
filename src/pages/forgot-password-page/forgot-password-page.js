import React, {useState} from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {baseUrl, forgotPasswordEndpoint} from "../../utils/constants";
import {forgotPasswordRequest} from "../../services/api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [requestReceived, setRequestReceived] = useState(false);
  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onSubmit = async e => {
    e.preventDefault();
    const result = await forgotPasswordRequest(baseUrl + forgotPasswordEndpoint, email);
    setRequestReceived(result);
  };
  if (requestReceived) {
    return (
      <Redirect to="reset-password"/>
    )
  }

  return (
    <section className="auth__section" onSubmit={onSubmit}>
      <form className="auth__form">
        <h1 className="auth__title text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChangeEmail}
          value={email}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="auth__footer-text text text_type_main-default">
        Вспомнили пароль? <Link className="auth__link" to="/login">Войти</Link>
      </p>
    </section>
  );
}

export default ForgotPasswordPage;

import React from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    // const forgotPasswordRequest = postRequestHandle("password-reset", {
    //   email
    // });
    // forgotPasswordRequest
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.success) {
    //       history.push({
    //         pathname: "/reset-password"
    //       })
    //     }
    //   });
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

import React, {useState} from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";


const ShowIconString = "ShowIcon";
const HideIconString = "HideIcon";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [currentIcon, setCurrentIcon] = useState(ShowIconString);
  const onChangePassword = e => {
    setNewPassword(e.target.value)
  }
  const onChangeCode = e => {
    setCode(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    // const resetPasswordRequest = postRequestHandle(baseUrl +  "password-reset/reset", {
    //   password: newPassword,
    //   token: ""
    // });
    // resetPasswordRequest
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     if (data.success) {
    //
    //     }
    //   });
  }

  const toggleIcon = () => {
    setCurrentIcon(currentIcon === ShowIconString ? HideIconString : ShowIconString);

  }

  return (
    <section className="auth__section" onSubmit={onSubmit}>
      <form className="auth__form">
        <h1 className="auth__title text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={currentIcon === ShowIconString ? 'text' : 'password'}
          placeholder={'Введите новый пароль'}
          onChange={onChangePassword}
          icon={currentIcon}
          value={newPassword}
          name={'name'}
          error={false}
          onIconClick={toggleIcon}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChangeCode}
          value={code}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="auth__footer-text text text_type_main-default">
        Вспомнили пароль? <Link className="auth__link" to="/login">Войти</Link>
      </p>
    </section>
  );
}
export default ResetPasswordPage;

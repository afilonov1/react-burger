import React, {useState} from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {resetPasswordRequest} from "../../services/api";
import {baseUrl, resetPasswordEndpoint} from "../../utils/constants";


const ShowIconString: "ShowIcon" = "ShowIcon";
const HideIconString: "HideIcon" = "HideIcon";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [currentIcon, setCurrentIcon] = useState<"ShowIcon" | "HideIcon">(ShowIconString);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const onChangePassword = (e: any) => {
    setNewPassword(e.target.value)
  }
  const onChangeCode = (e: any) => {
    setCode(e.target.value)
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await resetPasswordRequest(baseUrl + resetPasswordEndpoint, {
      password: newPassword,
      token: code
    });
    setChangeSuccess(result);
  }

  const toggleIcon = () => {
    setCurrentIcon(currentIcon === ShowIconString ? HideIconString : ShowIconString);

  }
  if (changeSuccess) {
    return (
      <Redirect to="/login"/>
    )
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

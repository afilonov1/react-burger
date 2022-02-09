import React, {useState} from "react";
import styles from "./profile-page.module.css";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

function EditProfile() {
  const [name, setName] = useState('Марк');
  const [email, setEmail] = useState('mail@stellar.burgers');
  const [password, setPassword] = useState('Логин1');


  const onNameChange = (e) => {
    setName(e.target.value);
  }
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    console.log("bebra")
  }
  return (
    <section className={styles.section}>
      <form onChange={onSubmit}>
        <ul>
          <li>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onNameChange}
              icon={'EditIcon'}
              value={name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
          </li>
          <li className='mt-6 mb-6'>
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={onEmailChange}
              icon={'EditIcon'}
              value={email}
              name={'email'}
              error={false}
              errorText={'Ошибка'}
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

      </form>
    </section>
  )
}
export default EditProfile;

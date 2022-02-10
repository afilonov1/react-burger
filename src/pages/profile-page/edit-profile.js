import React, {useState} from "react";
import styles from "./profile-page.module.css";
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

function EditProfile() {
  const { nameInStore, emailInStore } = useSelector(store => ({
    nameInStore: store.auth.name,
    emailInStore: store.auth.email
  }))
  const [name, setName] = useState(nameInStore);
  const [email, setEmail] = useState(emailInStore);
  const [password, setPassword] = useState('');


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

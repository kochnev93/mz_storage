export const validationAddUsertForm = (tempValidation, values) => {
  let errorCounter = 0;

  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const NAME_REGEXP = /^[а-яА-ЯёЁ\s]+$/;
  const LOGIN_REGEXP = /^[_a-zA-Z0-9]+$/;

  if (values.name.length == 0) {
    tempValidation.name.status = false;
    tempValidation.name.message = 'Введите имя';
    errorCounter++;
  } else if (values.name.length > 50){
    tempValidation.name.status = false;
    tempValidation.name.message = 'Слишком длинное имя (максимум 50 символов)';
    errorCounter++;
  } else if (!NAME_REGEXP.test(values.name)){
    tempValidation.name.status = false;
    tempValidation.name.message = 'Используйте только кириллицу';
    errorCounter++;
  } else {
    tempValidation.name.status = true;
    tempValidation.name.message = '';
  }

  if (values.surname.length == 0) {
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Введите фамилию';
    errorCounter++;
  } else if (values.surname.length > 50){
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Слишком длинная фамилия (максимум 50 символов)';
    errorCounter++;
  } else if (!NAME_REGEXP.test(values.surname)){
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Используйте только кириллицу';
    errorCounter++;
  } else {
    tempValidation.surname.status = true;
    tempValidation.surname.message = '';
  }

  if (values.email.length == 0) {
    tempValidation.email.status = false;
    tempValidation.email.message = 'Введите e-mail';
    errorCounter++;
  } else if (!EMAIL_REGEXP.test(values.email)) {
    tempValidation.email.status = false;
    tempValidation.email.message = 'Неверный формат e-mail';
    errorCounter++;
  } else {
    tempValidation.email.status = true;
    tempValidation.email.message = '';
  }


  if (values.phone.length == 0) {
    tempValidation.phone.status = false;
    tempValidation.phone.message = 'Введите номер телефона';
    errorCounter++;
  } else if(values.phone.trim().length != 11){
    tempValidation.phone.status = false;
    tempValidation.phone.message = 'Неверный формат номера телефона';
    errorCounter++;
  } else {
    tempValidation.phone.status = true;
    tempValidation.phone.message = '';
  }


  if (values.login.length == 0) {
    tempValidation.login.status = false;
    tempValidation.login.message = 'Введите логин';
    errorCounter++;
  } else if (values.login.length > 15){
    tempValidation.login.status = false;
    tempValidation.login.message = 'Слишком длинный логин (максимум 15 символов)';
    errorCounter++;
  } else if (!LOGIN_REGEXP.test(values.login)){
    tempValidation.login.status = false;
    tempValidation.login.message = 'Используйте только латиницу и цифры';
    errorCounter++;
  } else {
    tempValidation.login.status = true;
    tempValidation.login.message = '';
  }

  if (values.pass.length == 0) {
    tempValidation.pass.status = false;
    tempValidation.pass.message = 'Введите пароль';
    errorCounter++;
  } else if(values.pass.length < 6 || values.pass.length > 32){
    tempValidation.pass.status = false;
    tempValidation.pass.message = 'Длина пароля от 6 до 32 символов';
    errorCounter++;
  }  else if (values.repeat_pass.length == 0) {
    tempValidation.repeat_pass.status = false;
    tempValidation.repeat_pass.message = 'Повторите пароль';
    tempValidation.pass.status = true;
    tempValidation.pass.message = '';
    errorCounter++;
  } else if(values.pass.length != 0 && values.repeat_pass.length != 0 && values.pass != values.repeat_pass){
    tempValidation.repeat_pass.status = false;
    tempValidation.pass.status = false;
    tempValidation.repeat_pass.message = 'Пароли не совпадают';
    tempValidation.pass.message = '';
  } else {
    tempValidation.pass.status = true;
    tempValidation.repeat_pass.status = true;
    tempValidation.repeat_pass.message = '';
    tempValidation.pass.message = '';
  }


  if (values.role.length == 0) {
    tempValidation.role.status = false;
    tempValidation.role.message = 'Выберите роль';
    errorCounter++;
  } else {
    tempValidation.role.status = true;
    tempValidation.role.message = '';
  }


  if (values.position.length == 0) {
    tempValidation.position.status = false;
    tempValidation.position.message = 'Введите должность';
    errorCounter++;
  } else if (values.position.length > 30){
    tempValidation.position.status = false;
    tempValidation.position.message = 'Слишком длинное название (максимум 30 символов)';
    errorCounter++;
  } else if (!NAME_REGEXP.test(values.position)){
    tempValidation.position.status = false;
    tempValidation.position.message = 'Используйте только кириллицу';
    errorCounter++;
  } else {
    tempValidation.position.status = true;
    tempValidation.position.message = '';
  }
  

  return errorCounter;
};

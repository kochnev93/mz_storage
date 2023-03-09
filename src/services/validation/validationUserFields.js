const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const NAME_REGEXP = /^[а-яА-ЯёЁ\s]+$/;
const LOGIN_REGEXP = /^[_a-zA-Z0-9]+$/;

export const validationNameUser = (tempValidation, inputValue) => {
  let errorCounter = 0;

  if (inputValue.trim().length == 0) {
    tempValidation.name.status = false;
    tempValidation.name.message = 'Введите имя';
    errorCounter++;
  } else if (!NAME_REGEXP.test(inputValue.trim())){
    tempValidation.name.status = false;
    tempValidation.name.message = 'Недопустимые символы (используйте кириллицу)';
    errorCounter++;
  } else if (inputValue.trim().length < 2){
    tempValidation.name.status = false;
    tempValidation.name.message = 'Слишком короткое имя (минимум 2 символа)';
    errorCounter++;
  } else if (inputValue.trim().length > 30){
    tempValidation.name.status = false;
    tempValidation.name.message = 'Слишком длинное имя (максимум 30 символов)';
    errorCounter++;
  }  else {
    tempValidation.name.status = true;
    tempValidation.name.message = '';
  }


  return errorCounter;
}


export const validationSurnameUser = (tempValidation, inputValue) => {
  let errorCounter = 0;

  if (inputValue.trim().length == 0) {
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Введите фамилию';
    errorCounter++;
  } else if (!NAME_REGEXP.test(inputValue.trim())){
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Недопустимые символы (используйте кириллицу)';
    errorCounter++;
  } else if (inputValue.trim().length < 2){
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Слишком короткая фамилия (минимум 2 символа)';
    errorCounter++;
  } else if (inputValue.trim().length > 30){
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Слишком длинная фамилия (максимум 30 символов)';
    errorCounter++;
  }  else {
    tempValidation.surname.status = true;
    tempValidation.surname.message = '';
  }


  return errorCounter;
}


export const validationEmailUser = (tempValidation, inputValue) => {
  let errorCounter = 0;


  if (inputValue.trim().length == 0) {
    tempValidation.email.status = false;
    tempValidation.email.message = 'Введите e-mail';
    errorCounter++;
  } else if (!EMAIL_REGEXP.test(inputValue.trim())) {
    tempValidation.email.status = false;
    tempValidation.email.message = 'Неверный формат e-mail';
    errorCounter++;
  } else {
    tempValidation.email.status = true;
    tempValidation.email.message = '';
  }


  return errorCounter;
}


export const validationPhoneUser = (tempValidation, inputValue) => {
  let errorCounter = 0;


  if (inputValue.length == 0) {
    tempValidation.phone.status = false;
    tempValidation.phone.message = 'Введите номер телефона';
    errorCounter++;
  } else if(inputValue.length != 11){
    tempValidation.phone.status = false;
    tempValidation.phone.message = 'Неверный формат номера телефона';
    errorCounter++;
  } else {
    tempValidation.phone.status = true;
    tempValidation.phone.message = '';
  }

  return errorCounter;
}


export const validationLoginUser = (tempValidation, inputValue) => {
  let errorCounter = 0;

  if (inputValue.trim().length == 0) {
    tempValidation.login.status = false;
    tempValidation.login.message = 'Введите логин';
    errorCounter++;
  } else if (!LOGIN_REGEXP.test(inputValue.trim())){
    tempValidation.login.status = false;
    tempValidation.login.message = 'Недопустимые символы (используйте латиницу и цифры, без пробелов, кроме "_")';
    errorCounter++;
  } else if (inputValue.trim().length < 3){
    tempValidation.login.status = false;
    tempValidation.login.message = 'Слишком короткий логин (минимум 3 символа)';
    errorCounter++;
  } else if (inputValue.trim().length > 15){
    tempValidation.login.status = false;
    tempValidation.login.message = 'Слишком длинный логин (максимум 15 символов)';
    errorCounter++;
  } else {
    tempValidation.login.status = true;
    tempValidation.login.message = '';
  }

  return errorCounter;
}


export const validationPositionUser = (tempValidation, inputValue) => {
  let errorCounter = 0;

  if (inputValue.trim().length == 0) {
    tempValidation.position.status = false;
    tempValidation.position.message = 'Введите должность';
    errorCounter++;
  } else if (!NAME_REGEXP.test(inputValue.trim())){
    tempValidation.position.status = false;
    tempValidation.position.message = 'Недопустимые символы (используйте кириллицу)';
    errorCounter++;
  } else if (inputValue.trim().length < 5){
    tempValidation.position.status = false;
    tempValidation.position.message = 'Слишком короткое название (минимум 5 символов)';
    errorCounter++;
  } else if (inputValue.trim().length > 30){
    tempValidation.position.status = false;
    tempValidation.position.message = 'Слишком длинное название (максимум 30 символов)';
    errorCounter++;
  }  else {
    tempValidation.position.status = true;
    tempValidation.position.message = '';
  }

  return errorCounter;
}


export const validationRoleUser = (tempValidation, inputValue) => {
  let errorCounter = 0;

  if (inputValue.length == 0) {
    tempValidation.role.status = false;
    tempValidation.role.message = 'Выберите роль';
    errorCounter++;
  } else {
    tempValidation.role.status = true;
    tempValidation.role.message = '';
  }


  return errorCounter;
}


export const validationAddUserForm = (tempValidation, values) => {
  let errorCounter = 0;

  errorCounter += validationNameUser(tempValidation, values.name);
  errorCounter += validationSurnameUser(tempValidation, values.surname);
  errorCounter += validationEmailUser(tempValidation, values.email);
  errorCounter += validationPhoneUser(tempValidation, values.phone);
  errorCounter += validationLoginUser(tempValidation, values.login);
  errorCounter += validationPositionUser(tempValidation, values.position);


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




 
  

  return errorCounter;
};
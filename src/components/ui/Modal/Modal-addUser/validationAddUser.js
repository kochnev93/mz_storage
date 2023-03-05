export const validationAddUsertForm = (tempValidation, values) => {
  let errorCounter = 0;
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const NAME_REGEXP = /[^А-Яа-яЁё ]/g;
  
  if (values.name.trim().length == 0) {
    tempValidation.name.status = false;
    tempValidation.name.message = 'Введите имя';
    errorCounter++;
  } else if (!NAME_REGEXP.test(values.name)){
    tempValidation.name.status = false;
    tempValidation.name.message = 'Используйте кириллицу';
    errorCounter++;
  } else {
    tempValidation.name.status = true;
    tempValidation.name.message = '';
  }

  if (values.surname.trim().length == 0) {
    tempValidation.surname.status = false;
    tempValidation.surname.message = 'Введите фамилию';
    errorCounter++;
  } else {
    tempValidation.surname.status = true;
    tempValidation.surname.message = '';
  }

  if (values.email.trim().length == 0) {
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

  return errorCounter;
};

export const validationReceiptForm = (tempValidation, values) => {
   
    let errorCounter = 0;

    if (values.product.length == 0) {
      tempValidation.product.status = false;
      tempValidation.product.message = 'Выберите позицию';
      errorCounter++;
      return errorCounter;
    } else {
      tempValidation.product.status = true;
      tempValidation.product.message = null;
    }

    if (values.warehouse.length == 0) {
      tempValidation.warehouse.status = false;
      tempValidation.warehouse.message = 'Выберите склад';
      errorCounter++;
    } else {
      tempValidation.warehouse.status = true;
      tempValidation.warehouse.message = null;
    }

    // Серийный учет
    if (values.product[0]?.accounting_sn && values.sn.length == 0) {
      tempValidation.sn.status = false;
      tempValidation.sn.message = 'Введите серийный номер(а)';
      errorCounter++;
    } else {
      tempValidation.sn.status = true;
      tempValidation.sn.message = null;
    }

    // Не серийный учет
    if (!values.product[0]?.accounting_sn && !values.count) {
      tempValidation.count.status = false;
      tempValidation.count.message = 'Введите количество';
      errorCounter++;
    } else {
      tempValidation.count.status = true;
      tempValidation.count.message = null;
    }

    if (values.count < 1 && values.count) {
      tempValidation.count.status = false;
      tempValidation.count.message = 'Количество должно быть >= 1';
      errorCounter++;
    } 

    // Не серийный учет
    if (!values.product[0]?.accounting_sn && !values.min_count) {
      tempValidation.min_count.status = false;
      tempValidation.min_count.message = 'Введите минимальный остаток';
      errorCounter++;
    } else {
      tempValidation.min_count.status = true;
      tempValidation.min_count.message = null;
    }

    if (values.min_count < 1 && values.min_count) {
      tempValidation.min_count.status = false;
      tempValidation.min_count.message = 'Минимальный остаток должен быть >= 1';
      errorCounter++;
    } 

    if (!values.contract) {
      if (!values.contractCheckbox) {
        tempValidation.contract.status = false;
        tempValidation.contract.message = 'Введите номер счета';
        errorCounter++;
      } else {
        tempValidation.contract.status = true;
        tempValidation.contract.message = null;
      }
    } else {
      tempValidation.contract.status = true;
      tempValidation.contract.message = null;
    }

    if (values.contragent.length == 0) {
      if (!values.contragentCheckbox) {
        tempValidation.contragent.status = false;
        tempValidation.contragent.message = 'Выберите контрагента';
        errorCounter++;
      } else {
        tempValidation.contragent.status = true;
        tempValidation.contragent.message = null;
      }
    }

    if (values.contragentCheckbox && !values.newContragentName) {
      tempValidation.newContragentName.status = false;
      tempValidation.newContragentName.message = 'Введите наименование нового контрагента';
      errorCounter++;
    } else {
      tempValidation.newContragentName.status = true;
      tempValidation.newContragentName.message = null;
    }

    if (values.contragentCheckbox && !values.newContragentINN) {
      tempValidation.newContragentINN.status = false;
      tempValidation.newContragentINN.message = 'Введите ИНН контрагента';
      errorCounter++;
    } else {
      tempValidation.newContragentINN.status = true;
      tempValidation.newContragentINN.message = null;
    }

    if (!values.guarantee) {
      if (!values.guaranteeCheckbox) {
        tempValidation.guarantee.status = false;
        tempValidation.guarantee.message = 'Введите дату окончания гарантии';
        errorCounter++;
      } else {
        tempValidation.guarantee.status = true;
        tempValidation.guarantee.message = null;
      }
    } else {
      tempValidation.guarantee.status = true;
      tempValidation.guarantee.message = null;
    }

    if(new Date() > new Date(values.guarantee) && values.guarantee){
      tempValidation.guarantee.status = false;
      tempValidation.guarantee.message = 'Дата окончания гарантии не может быть в прошлом';
      errorCounter++;
    } 

    return errorCounter;

  };

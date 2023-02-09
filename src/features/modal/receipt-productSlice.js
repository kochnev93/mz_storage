import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
    errors: false,
    message: '',
    reset: false,
    isLoading: false,
    
    category: [],
    warehouse: [],
    product: [],
    urlProduct: 'get_receipt_products/0',
    count: null,
    sn: [],
    inputSN: null,
    guarantee: null,
    guaranteeCheckbox: true,
    contract: null,
    contractCheckbox: true,
    contragent: [],
    contragentCheckbox: true,
    newContragentName: null,
    newContragentINN: null,
    url: null,

    validation:{
        warehouse: true,
        product: true,
        contract: true,
        contragent: true,
        newContragentName: true,
        newContragentINN: true,
        URL: true,
        guarantee: true,
        count: true,
        sn:{
            status: true,
            message: null
        }
    }
}

export const receiptProductSlice = createSlice({
    name: 'modal_receipt_product',
    initialState,
    reducers: {
        setActiveReceipt: (state, action) => {
            state.active = action.payload.active
        },
        setErrorsReceipt: (state, action) => {
            state.errors = action.payload.errors
        },
        setMessageReceipt: (state, action) => {
            state.message = action.payload.message
            state.errors = action.payload.errors
        },
        setResetReceipt: (state, action) => {
            state.reset = action.payload.reset
        },
        setIsLoadingReceipt: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setDefaultReceipt: (state, action) => {
            state.errors = false,
            state.message = '',
            state.reset = false,
            state.isLoading = false
        },

        //Receipt Form
        setProduct: (state, action) => {
            state.product = action.payload.product
        },

        setProductUrl: (state, action) => {
            state.urlProduct = action.payload.urlProduct
        },

        setInputSN: (state, action) => {
            state.inputSN = action.payload.inputSN
        },

        setSN: (state, action) => {
            state.sn = action.payload.sn
        },

        setCount: (state, action) => {
            state.count = action.payload.count
        },

        setValidation: (state, action) => {
            state.validation = action.payload.validation
        }
    }
});

export const {
    setActiveReceipt, 
    setErrorsReceipt, 
    setMessageReceipt, 
    setResetReceipt, 
    setIsLoadingReceipt, 
    setDefaultReceipt,
    setProduct,
    setProductUrl,
    setInputSN,
    setCount,
    setValidation,
    setSN,
} = receiptProductSlice.actions
export default receiptProductSlice.reducer
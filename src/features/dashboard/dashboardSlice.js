import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: [],
}

export const dashboard = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload.products
        },
        editProduct: (state, action) => {

            const id = action.payload.unit.id;
            const sn = action.payload.unit.sn;
            const accounting_sn = Boolean( action.payload.unit.accounting_sn );

            const new_warehouse_id = action.payload.new_warehouse[0].id;
            const new_warehouse_title = action.payload.new_warehouse[0].title;

            if (accounting_sn) {
                let index = state.products.findIndex( el => el.sn === sn);

                if(index !== -1){
                    state.products[index].id_warehouse = new_warehouse_id;
                    state.products[index].warehouse_title = new_warehouse_title;
                }
            }
        }
    }
});

export const {addProducts, editProduct} = dashboard.actions
export default dashboard.reducer
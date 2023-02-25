import {createSlice} from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('mz_storage_user'));

const initialState = {
    id: user?.id ?? null,
    login: user?.login ?? null,
    role: user?.role ?? null,
    img: user?.img ?? null,
    accessToken: user?.accessToken ?? null
}

// const initialState = {
//     id: 1,
//     login: 'Testov Test',
//     role: 'admin',
//     accessToken: '1234'
// }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.login = action.payload.login
            state.role = action.payload.role
            state.img = action.payload.imig
            state.accessToken = action.payload.accessToken
        },
        removeUser: (state) => {
            state.id = null,
            state.login = null,
            state.role = null,
            state.img = null,
            state.accessToken = null
        },

        refreshImgUser: (state, action) => {
            state.img = action.payload.filename

            localStorage.setItem(
                'mz_storage_user',
                JSON.stringify({
                  id: state.id,
                  login: state.login,
                  role: state.role,
                  img: action.payload.filename,
                  accessToken: state.accessToken,
                })
              );
        }
    }
});

export const {setUser, removeUser, refreshImgUser} = userSlice.actions
export default userSlice.reducer
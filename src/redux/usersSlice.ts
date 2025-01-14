import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

interface User {
    id: number;
    name: string;
}

interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: [
        {id: 1, name: 'Иван'},
        {id: 2, name: 'Анна'},
        {id: 3, name: 'Петр'},
        {id: 4, name: 'Мария'},
        {id: 5, name: 'Дмитрий'},
        {id: 6, name: 'Елена'},
        {id: 7, name: 'Сергей'},
        {id: 8, name: 'Алексей'},
        {id: 9, name: 'Александр'},
        {id: 10, name: 'Николай'},
    ],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUserName: (state, action: PayloadAction<{ id: number; name: string }>) => {
            const {id, name} = action.payload;
            const user = state.users.find((user) => user.id === id);
            if (user) {
                user.name = name;
            }
        },
    },
});

export const {updateUserName} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUserById = (id: number) =>
    createSelector([selectUsers], (users) => users.find((user) => user.id === id));

export default usersSlice.reducer;

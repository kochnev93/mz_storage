import React, { useState } from 'react';
import { MyTable } from '../../components/elements/Table/MyTable.jsx';


export const AdminUsers = () => {
    const [titleColumn] = useState(['ID', 'Имя', 'Логин', 'e-mail', 'Действие'])
    return(
        <section>
            <h2>Пользователи</h2>
            <MyTable titleColumn={titleColumn} />
        </section>
    )
}
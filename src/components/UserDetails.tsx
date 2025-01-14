import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {selectUserById, updateUserName} from '../redux/usersSlice';
import {RootState} from '../redux/store';

const UserDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const userId = Number(id);
    const user = useSelector((state: RootState) => selectUserById(userId)(state));
    const [name, setName] = useState(user?.name || '');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(updateUserName({id: userId, name}));
        }
    };

    const handleBack = () => {
        navigate(-1); // Возвращает пользователя на предыдущую страницу
    };

    return (
        <div className="container">
            <h1>Детали пользователя</h1>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Введите новое имя"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" disabled={!name.trim()}>
                        Обновить
                    </button>
                </form>
            ) : (
                <p className="message">Пользователь не найден</p>
            )}
            <button onClick={handleBack} style={{marginTop: '20px'}}>
                Назад
            </button>
        </div>
    );
};

export default UserDetails;
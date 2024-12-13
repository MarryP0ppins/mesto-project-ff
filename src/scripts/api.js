const PATH = 'https://nomoreparties.co/v1/cohort-mag-4';
const TOKEN = '6878c6bd-80e8-49e3-abf9-36ab4df4915c';


const handleResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

//получаем информацию о профиле
export const getUserInfo = () => { 
    return fetch(`${PATH}/users/me`, {
        headers: {
            authorization: TOKEN
        }
    })
    .then(handleResponse)
}

//получаем карточки на стр
export const getAllCards = () => {
    return fetch(`${PATH}/cards`, {
        headers: {
            authorization: TOKEN
        }
    })
    .then(handleResponse)
} 

//меняем информацию профиля
export const editUserInfo = (name, job) => {
    return fetch(`${PATH}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(handleResponse)
}

//добавляем новую карточку на сервер
export const createNewCard = (object) => {
    return fetch(`${PATH}/cards`, {
        method: 'POST',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: object.name,
            link: object.link
        })
    })
    .then(handleResponse)
}


//удаляем карточки
export const removeCard = (idCard) => {
    return fetch(`${PATH}/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN,
        },
    })
    .then(handleResponse)
}

//ставим лайк карточке
export const likeCardDev = (idCard) => {
    return fetch(`${PATH}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: {
            authorization: TOKEN,
        },
    })
    .then(handleResponse)
}

//убираем лайк с карточки
export const likeCardDevDel = (idCard) => {
    return fetch(`${PATH}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: TOKEN,
        },
    })
    .then(handleResponse)
}

//Обновляем аватарку
export const changeAvatar = (linkAvatar) => {
    return fetch(`${PATH}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: linkAvatar
        })
    })
    .then(handleResponse)
}
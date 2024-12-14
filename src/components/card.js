import {
  likeCardDev,
  likeCardDevDel,
  removeCard
} from '../components/api.js'
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placeElement = cardTemplate.querySelector(".places__item");

//Функция создания карточки
export function createCard(cardParams, meId, deleteFunction, likeFunction, openImageFunction) {
  const cardElement = placeElement.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');



  if (cardParams.owner._id == meId) {
    deleteButton.classList.add('card__delete-button-visible');
  }

  cardElement.querySelector('.card__like-quantity').textContent = cardParams.likes.length;

  if (meId && cardParams.likes.some((like) => {
    return like._id == meId;
  })
  ) {
    likeCard(likeButton)
  };
  deleteButton.addEventListener('click', deleteFunction);
  deleteButton.targetElement = cardElement;

  cardElement.querySelector('.card__title').textContent = cardParams.name;

  cardImage.setAttribute('alt', cardParams.name);
  cardImage.setAttribute('src', cardParams.link);
  cardElement.setAttribute('id', `card${cardParams._id}`);
  cardImage.addEventListener('click', openImageFunction)
  likeButton.addEventListener('click', likeFunction);
  likeButton.targetElement = cardElement;
  return cardElement;
}

export function likeCardListener(event) {
  const likeButtonElement = event.currentTarget;
  const cardElement = likeButtonElement.targetElement;

  let idCard = cardElement.getAttribute('id');
  idCard = idCard.replace(/^card/, '');
  let likeRequest = null

  if (likeButtonElement.classList.contains('card__like-button_is-active')) {
    likeRequest = likeCardDevDel(idCard);
  } else {
    likeRequest = likeCardDev(idCard);
  }

  likeRequest
    .then((result) => {
      cardElement.querySelector('.card__like-quantity').textContent = result.likes.length;
      likeCard(event.target)
    })
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(cardLikeButtonElement) {
  cardLikeButtonElement.classList.toggle('card__like-button_is-active')
}

//Функция удаления карточки
export function deleteCard(event) {
  let card = event.currentTarget.targetElement;
  let idCard = card.getAttribute('id');
  idCard = idCard.replace(/^card/, '');

  removeCard(idCard)
    .then((result) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}



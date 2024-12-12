//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

//Функция создания карточки
export function makeCard(cardData, deleteCard, likeCard, handleImageClick) {
  const placeElementClone = placeElement.cloneNode(true);
  const cardImage = placeElementClone.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = "Пейзажное фото места " + cardData.name;

  placeElementClone.querySelector(".card__title").textContent = cardData.name;
  placeElementClone.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  placeElementClone.querySelector(".card__like-button").addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  return placeElementClone;
}

//Функция удаления карточки
export function deleteCard(ev) {
  ev.target.closest(".places__item").remove();
}

//функция лайка
export function likeCard(ev) {
  ev.target.classList.toggle("card__like-button_is-active");
}

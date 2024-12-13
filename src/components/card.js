//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placeElement = cardTemplate.querySelector(".places__item");

//Функция создания карточки
export function makeCard(cardData, onDeleteCard, likeCard, handleImageClick, userId) {
  const placeElementClone = placeElement.cloneNode(true);
  const cardImage = placeElementClone.querySelector(".card__image");
  const buttonLike = placeElementClone.querySelector(".card__like-button");
  const deleteButton = placeElementClone.querySelector(".card__delete-button");
  const cardLikeNumber = placeElementClone.querySelector(".card__like-number");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeNumber.textContent = cardData.likes.length;

  placeElementClone.querySelector(".card__title").textContent = cardData.name;

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      onDeleteCard(cardData._id, placeElementClone);
    });
  } else {
    deleteButton.style.display = "none"
  }

  cardData.likes.some((el) => {
    if (el._id === userId) {
      buttonLike.classList.toggle("card__like-button_is-active");
      }
  })

  buttonLike.addEventListener("click", () => {
    likeCard(cardData, cardLikeNumber, buttonLike)
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  return placeElementClone;
}

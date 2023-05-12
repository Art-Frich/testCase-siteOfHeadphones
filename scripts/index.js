import { cardsHeadphonesData } from "./cards.js";

const templateCard = document.querySelector('.template');
const cardsHeadphonesListContainer = document.querySelector('.products_type_headphones')
const cardsHeadphonesList = document.querySelector('.cards__grid')


function generateCards( arr ){
  arr.forEach( dataCard => {
    cardsHeadphonesList.append( createCard( dataCard ) );
  });
}

function createCard( data ){
  const card = getCardElement();
  const cardImg = card.querySelector( '.card__photo' );
  const cardTitle = card.querySelector( '.card__title' );
  const cardPrice = card.querySelector( '.card__price' );
  const cardOldPrice = card.querySelector( '.card__old-price' );
  const cardRate = card.querySelector( '.card__rate' );

  cardImg.src = data.url;
  cardImg.alt = cardImg.alt + data.name;
  cardTitle.textContent = data.name;
  cardPrice.textContent = data.currentPrice;
  data.oldPrice 
    ? cardOldPrice.textContent = `${ data.oldPrice } ${ cardOldPrice.textContent }`
    : cardOldPrice.textContent = '';
  cardRate.textContent = data.rate;

  return card;
}

function getCardElement() {
  return templateCard
    .content
    .querySelector( '.cards__grid-item' )
    .cloneNode( true );
}

generateCards( cardsHeadphonesData );
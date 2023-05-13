import { cardsHeadphonesData, cardsWirelessHeadphonesData } from "./cards.js";

// Элементы разметки
const templateCard = document.querySelector('.template');
const cardsHeadphonesListContainer = document.querySelector('.products_type_headphones');
const cardsWirelessHeadphonesListContainer = document.querySelector('.products_type_wireless-headphones');
const cardsHeadphonesList = cardsHeadphonesListContainer.querySelector('.cards__grid');
const cardsWirelessHeadphonesList = cardsWirelessHeadphonesListContainer.querySelector('.cards__grid');
const basketLink = document.querySelector( '.header__buttons-link_type_trash' ); 
const basketCounter = basketLink.querySelector( '.header__button-counter' );

let justCounter = 0;
/**
 * 
 * @param {Array} arr - массив данных для карточек
 * @param {HTMLElement} container - контейнер для карточек
 */
function generateCards( arr, container ){
  arr.forEach( dataCard => {
    container.append( createCard( dataCard ) );
  });
}

/**
 * 
 * @param {object} data - объект с данными конкретной карточки
 * @returns - готовая карточка
 */
function createCard( data ){
  data.id = justCounter;
  justCounter++;

  // ищем элементы карточки
  const card = getCardElement();
  const cardImg = card.querySelector( '.card__photo' );
  const cardTitle = card.querySelector( '.card__title' );
  const cardPrice = card.querySelector( '.card__price' );
  const cardOldPrice = card.querySelector( '.card__old-price' );
  const cardRate = card.querySelector( '.card__rate' );
  const cardBtnBuy = card.querySelector( '.card__buy' );

  //заполняем карточку
  cardImg.src = data.url;
  cardImg.alt = cardImg.alt + data.name;
  cardTitle.textContent = data.name;
  cardPrice.textContent = data.currentPrice;
  data.oldPrice 
    ? cardOldPrice.textContent = `${ data.oldPrice } ${ cardOldPrice.textContent }`
    : cardOldPrice.textContent = '';
  cardRate.textContent = data.rate;

  setAddToBasketOnClick( data, cardBtnBuy );

  return card;
}

/**
 * 
 * @param {object} data - объект с данными конкретной карточки
 * @param {HTMLElement} cardBtnBuy
 */
function setAddToBasketOnClick( data, cardBtnBuy ) {
  let countThisCards;
  try {
    countThisCards = JSON.parse( window.sessionStorage.getItem( `card${data.id}` ) ).count
  } catch {}
  const dataObject = {
    count: countThisCards || 0,
    key: `card${data.id}`,
    data: data
  }

  cardBtnBuy.addEventListener( 'click', () => {
    dataObject.count++;
    window.sessionStorage.setItem( dataObject.key, JSON.stringify( dataObject ));
    const currentCountProducts = window.sessionStorage.getItem('countProducts');
    window.sessionStorage.setItem( `countProducts`, `${Number(currentCountProducts) + 1}`);
    basketCounter.textContent++;
  } )
}

/**
 * 
 * @returns экземпляр разметки для карточки
 */
function getCardElement() {
  return templateCard
    .content
    .querySelector( '.cards__grid-item' )
    .cloneNode( true );
}


function setProductsInBasket(){
  const count = window.sessionStorage.getItem('countProducts');
  basketCounter.textContent = count || 0;
}

generateCards( cardsHeadphonesData, cardsHeadphonesList );
generateCards( cardsWirelessHeadphonesData, cardsWirelessHeadphonesList );
setProductsInBasket();
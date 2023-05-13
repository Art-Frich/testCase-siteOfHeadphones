const basketLink = document.querySelector( '.header__buttons-link_type_trash' ); 
const basketCounter = basketLink.querySelector( '.header__button-counter' );
const cardsContainer = document.querySelector( '.cards__grid' );
const templateCard = document.querySelector('.template');
const sumPrice = document.querySelector( '.result-container__price-counter' );

/**
 * 
 * @param {HTMLElement} container - контейнер для карточек
 */
function generateCards( container ){
  let resPrice = 0;
  const l = window.sessionStorage.length;
  for ( let i = 0; i < l; i++ ){
    let dataElement =  JSON.parse( window.sessionStorage.getItem( sessionStorage.key(i) ) );
    if ( dataElement.count ){
      resPrice += dataElement.data.currentPrice * dataElement.count;
      container.append( createCard( dataElement ) );
    }
  }
  sumPrice.textContent = resPrice;
}

/**
 * 
 * @param {object} data - объект с данными конкретной карточки
 * @returns - готовая карточка
 */
function createCard( dataCard ){
  // ищем элементы карточки
  let card = getCardElement();
  const cardImg = card.querySelector( '.card__photo' );
  const cardTitle = card.querySelector( '.card__title' );
  const cardPrice = card.querySelector( '.card__price' );
  const itemCount = card.querySelector( '.card__counter-item' );
  const resultPrice = card.querySelector( '.card__result-price' );
  const btnCardDel = card.querySelector( '.card__btn-delete' );
  const btnIncrementItems = card.querySelector( '.card__increment-count-item' );
  const btnDecrementItems = card.querySelector( '.card__decrement-count-item' );

  const data = dataCard.data;

  //заполняем карточку
  cardImg.src = `.${data.url}`;
  cardImg.alt = cardImg.alt + data.name;
  cardTitle.textContent = data.name;
  cardPrice.textContent = data.currentPrice;
  itemCount.textContent = dataCard.count;
  resultPrice.textContent = data.currentPrice * dataCard.count;

  btnCardDel.addEventListener( 'click', () => {
    deleteCard( card, resultPrice, dataCard.key, dataCard.count );
  });
  
  btnIncrementItems.addEventListener( 'click', () => {
    itemCount.textContent++;
    resultPrice.textContent = data.currentPrice * itemCount.textContent;
    sumPrice.textContent = Number( sumPrice.textContent ) + Number( cardPrice.textContent );
    let countBefore = window.sessionStorage.getItem('countProducts');
    window.sessionStorage.setItem('countProducts', ++countBefore );
    setProductsInBasket();
    dataCard.count++;
    window.sessionStorage.setItem( dataCard.key, JSON.stringify( dataCard ) );
  })

  btnDecrementItems.addEventListener( 'click', () => {
    if ( itemCount.textContent > 0 ) {
      itemCount.textContent--;
      resultPrice.textContent = data.currentPrice * itemCount.textContent;
      sumPrice.textContent -= cardPrice.textContent;
      let countBefore = window.sessionStorage.getItem('countProducts');
      window.sessionStorage.setItem('countProducts', --countBefore );
      setProductsInBasket();
      dataCard.count--;
      window.sessionStorage.setItem( dataCard.key, JSON.stringify( dataCard ) );
    }
  })

  return card;
}

/**
 * 
 * @param {HTMLElement} card - разметка карточки
 * @param {HTMLElement} resultPrice - контейнер с суммарной стоимостью позиции
 */
function deleteCard( card, resultPrice, key, countDel ) {
  card.remove();
  card = null;

  const countBefore = window.sessionStorage.getItem('countProducts');
  window.sessionStorage.setItem('countProducts', countBefore - countDel );
  setProductsInBasket();

  sumPrice.textContent -= resultPrice.textContent;
  window.sessionStorage.removeItem( key );
}

// function updateCardResult(){

// }

// function updateCountInBasket(){

// }

// function increaseSumPriceCards( resultPrice ){
//   sumPrice.textContent += resultPrice.textContent;
// }

// function decreadeSumPriceCards( resultPrice ) {
//   sumPrice.textContent -= resultPrice.textContent;
// }

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

setProductsInBasket();
generateCards( cardsContainer );

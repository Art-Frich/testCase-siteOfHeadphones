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
 * P.S. по хорошему надо это в отдельный класс выкинуть
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
  updateResultPrice();

  btnCardDel.addEventListener( 'click', () => {
    deleteCard( card, resultPrice, dataCard.key, dataCard.count );
  });
  
  btnIncrementItems.addEventListener( 'click', () => {
    itemCount.textContent++;
    updateResultPrice();
    sumPrice.textContent = Number( sumPrice.textContent ) + Number( cardPrice.textContent );
    updateBasketValue( true );
    dataCard.count++;
    dataCardUpdate();
  })

  btnDecrementItems.addEventListener( 'click', () => {
    if ( itemCount.textContent > 0 ) {
      itemCount.textContent--;
      updateResultPrice();
      sumPrice.textContent -= cardPrice.textContent;
      updateBasketValue( false );
      dataCard.count--;
      dataCardUpdate();
    }
  })

  function updateResultPrice(){
    resultPrice.textContent = data.currentPrice * itemCount.textContent;
  }

  function dataCardUpdate() {
    window.sessionStorage.setItem( dataCard.key, JSON.stringify( dataCard ) );
  }

  return card;
}

/**
 * Увеличивает или уменьшает на 1 значение в корзине
 * @param {Boolean} plusBoolean 
 */
function updateBasketValue( plusBoolean ){
  let countBefore = window.sessionStorage.getItem('countProducts');
  plusBoolean
    ? window.sessionStorage.setItem('countProducts', ++countBefore )
    : window.sessionStorage.setItem('countProducts', --countBefore );
  setProductsInBasket();
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

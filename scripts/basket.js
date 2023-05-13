const basketLink = document.querySelector( '.header__buttons-link_type_trash' ); 
const basketCounter = basketLink.querySelector( '.header__button-counter' );
const cardsContainer = document.querySelector( '.cards__grid' );
const templateCard = document.querySelector('.template');

/**
 * 
 * @param {HTMLElement} container - контейнер для карточек
 */
function generateCards( container ){
  const l = window.sessionStorage.length;
  for ( let i = 0; i < l; i++ ){
    let dataElement =  JSON.parse( window.sessionStorage.getItem( sessionStorage.key(i) ) );
    if ( dataElement.count ){
      container.append( createCard( dataElement ) );
    }
  }
}

/**
 * 
 * @param {object} data - объект с данными конкретной карточки
 * @returns - готовая карточка
 */
function createCard( dataCard ){
  // ищем элементы карточки
  const card = getCardElement();
  const cardImg = card.querySelector( '.card__photo' );
  const cardTitle = card.querySelector( '.card__title' );
  const cardPrice = card.querySelector( '.card__price' );
  const itemCount = card.querySelector( '.card__counter-item' );
  const resultPrice = card.querySelector( '.card__result-price' );

  const data = dataCard.data;

  //заполняем карточку
  cardImg.src = `.${data.url}`;
  cardImg.alt = cardImg.alt + data.name;
  cardTitle.textContent = data.name;
  cardPrice.textContent = data.currentPrice;
  itemCount.textContent = dataCard.count;
  resultPrice.textContent = data.currentPrice * dataCard.count;

  //объект количества таких карточек в корзине
  // const dataObject = {
  //   count: 0,
  //   data: data
  // }

  // cardBtnBuy.addEventListener( 'click', () => {
  //   dataObject.count++;
  //   window.sessionStorage.setItem( `card${data.id}`, JSON.stringify( dataObject ));
  //   const currentCountProducts = window.sessionStorage.getItem('countProducts');
  //   window.sessionStorage.setItem( `countProducts`, `${Number(currentCountProducts) + 1}`);
  //   basketCounter.textContent++;
  // } )

  return card;
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
  basketCounter.textContent = count;
}

setProductsInBasket();
generateCards( cardsContainer );

const l = window.sessionStorage.length;
for ( let i = 0; i < l; i++ ){
  console.log( JSON.parse( window.sessionStorage.getItem( sessionStorage.key(i) ) ) );
}

console.log(window.sessionStorage)
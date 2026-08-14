const searchInput = document.getElementById('search');
const noResults = document.getElementById('no_results');

searchInput.addEventListener('input', (event) => {
   // Corrigido de 'formaString' para 'formatString'
   const value = formatString(event.target.value);

   // Atualizado para buscar os cards de produto do seu HTML
   const items = document.querySelectorAll('.produto-card');

   let hasResults = false;

   items.forEach(item => {
       // Pega o texto especificamente de dentro da div produto-info
       const productInfo = item.querySelector('.produto-info');
       
       if(formatString(productInfo.textContent).indexOf(value) !== -1){
           item.style.display = 'block'; // Use 'flex' se o seu CSS original exigir
           hasResults = true;
       } else {
           item.style.display = 'none';
       }
   });

   // Mostra ou esconde a mensagem de erro
   if (hasResults || value === '') {
       noResults.style.display = 'none';
   } else {
       noResults.style.display = 'block';
   }
});

function formatString(value){
   return value.toLowerCase()
   .trim();
}
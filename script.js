const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const value = formaString(event.target.value);

    const items = document.querySelectorAll('.items .item');
    const noResults = document.getElementById(`no_results`);

    let hasResults = false;

    items.forEach(item => {
        
    })
});

function formatString(value){
    return value.toLowerCase().trim();
}
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const value = event.target.value;

    const items = document.querySelectorAll('.items .item')

    console.log(item)
});

function formatString(value){
    return value.toLowerCase().trim();
}
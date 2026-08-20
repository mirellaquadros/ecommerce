/* =========== BARRA DE PESQUISA ============ */
    const searchInput = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');

    // Variável para guardar qual item está focado com o teclado
    let currentFocus = -1; 

    searchInput.addEventListener('input', (event) => {
        const value = formatString(event.target.value);
        const items = document.querySelectorAll('.produto-card');
        
        let hasResults = false;
        currentFocus = -1; // Reseta o foco toda vez que a pessoa digita uma letra nova
        
        if (suggestionsBox) suggestionsBox.innerHTML = ''; 

        if(value !== ''){
            items.forEach(item => {
                const titleElement = item.querySelector('.produto-title');
                const descElement = item.querySelector('.produto-info');
                
                const itemTitle = titleElement ? titleElement.textContent : '';
                const itemDescription = descElement ? descElement.textContent : '';

                if(formatString(itemTitle).includes(value) || formatString(itemDescription).includes(value)) {
                    hasResults = true;

                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = itemTitle; 
                    
                    // Evento de clique do mouse (mantido igual)
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = itemTitle; 
                        if (suggestionsBox) suggestionsBox.style.display = 'none'; 
                        // Exemplo de redirecionamento:
                        window.location.href = `pagina-do-produto.html?nome=${encodeURIComponent(itemTitle)}`;
                    });

                    if (suggestionsBox) suggestionsBox.appendChild(suggestionItem);
                } 
            });

            if (hasResults){
                if (suggestionsBox) suggestionsBox.style.display = 'block'; 
            } else {
                const noSuggestion = document.createElement('div');
                noSuggestion.classList.add('no-suggestion-item');
                noSuggestion.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px;"></i> Nenhum produto encontrado.';
                
                if (suggestionsBox) {
                    suggestionsBox.appendChild(noSuggestion);
                    suggestionsBox.style.display = 'block'; 
                }
            }
        } else {
            if (suggestionsBox) suggestionsBox.style.display = 'none'; 
        }
    });

    searchInput.addEventListener('keydown', function(event) {
        let items = suggestionsBox.querySelectorAll('.suggestion-item');
        if (!items || items.length === 0) return;

        if (event.key === "ArrowDown") {
            // Se apertar seta para baixo, desce o foco
            currentFocus++;
            addActive(items);
        } else if (event.key === "ArrowUp") {
            // Se apertar seta para cima, sobe o foco
            currentFocus--;
            addActive(items);
        } else if (event.key === "Enter") {
            // Se apertar Enter, evita enviar formulários e "clica" no item focado
            event.preventDefault();
            if (currentFocus > -1) {
                // Se tiver um item focado pelas setinhas, simula o clique nele
                items[currentFocus].click();
            } else if (items.length > 0) {
                // Se a pessoa só digitou e apertou Enter (sem usar as setinhas), clica na primeira opção
                items[0].click(); 
            }
        }
    });

    // Função para pintar o item selecionado
    function addActive(items) {
        if (!items) return false;
        
        // Primeiro remove a classe ativa de todos
        removeActive(items);
        
        // Cria o "carrossel" infinito (se passar do último, volta pro primeiro e vice-versa)
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (items.length - 1);
        
        // Adiciona a classe visual no item atual
        items[currentFocus].classList.add("suggestion-item-active");
        
        // BÔNUS: Faz a barra de rolagem da div de sugestões acompanhar a setinha do teclado
        items[currentFocus].scrollIntoView({ block: 'nearest' });
    }

    // Função para limpar as seleções antigas
    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("suggestion-item-active");
        }
    }
    // --- FIM DA NAVEGAÇÃO POR TECLADO ---

    document.addEventListener('click', (event) => {
        if (suggestionsBox && !searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = 'none';
        }
    });

    function formatString(value){
        return value
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }
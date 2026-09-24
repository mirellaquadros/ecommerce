//                    BUSCA DE PRODUTO

const campoBusca = document.getElementById("campoPesquisa");
const botaoBusca = document.getElementById("botaoBusca");
const suggestionsBox = document.getElementById("suggestions-dropdown");

let currentFocus = -1;

// Normalizar Texto -----------------------
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// PESQUISAR PRODUTOS

function pesquisarProdutos() {

    if (!campoBusca) return;

    const pesquisa = normalizarTexto(campoBusca.value.trim());

    const produtos = document.querySelectorAll(".produto");

    let encontrou = false;

    produtos.forEach(produto => {

        const nomeProduto =
            produto.getAttribute("data-nome") || "";

        const titulo =
            (produto.querySelector("h3")?.textContent || "")
            .replace(/\s+/g, " ")
            .trim();

        const descricao =
            produto.querySelector(".descricao")?.textContent || "";

        const textoProduto = normalizarTexto(
            nomeProduto + " " + titulo + " " + descricao
        );

        if (
            pesquisa === "" ||
            textoProduto.includes(pesquisa)
        ) {
            produto.style.display = "";
            encontrou = true;
        } else {
            produto.style.display = "none";
        }

    });

    mostrarMensagemBusca(!encontrou && pesquisa !== "");
}


//NENHUM RESULTADO

function mostrarMensagemBusca(mostrar) {

    const mensagem = document.getElementById("no_results");

    if (!mensagem) return;

    mensagem.style.display = mostrar ? "block" : "none";
}


//Sugestões

function mostrarSugestoes() {

    if (!campoBusca || !suggestionsBox) return;

    const valor = normalizarTexto(campoBusca.value);

    suggestionsBox.innerHTML = "";
    currentFocus = -1;

    if (valor === "") {
        suggestionsBox.style.display = "none";

        document.querySelectorAll(".produto").forEach(produto => {
            produto.style.display = "";
        });

        mostrarMensagemBusca(false);

        return;
    }

    const produtos = document.querySelectorAll(".produto");

    let encontrou = false;

    produtos.forEach(produto => {

        const titulo =
            produto.querySelector("h3")?.textContent || "";

        const descricao =
            produto.querySelector(".descricao")?.textContent || "";

        const nome =
            produto.getAttribute("data-nome") || "";

        const texto = normalizarTexto(
            nome + " " + titulo + " " + descricao
        );

        if (texto.includes(valor)) {

    console.log("Sugestão criada:", titulo); // debug


            encontrou = true;

            produto.style.display = "";

            const sugestao =
                document.createElement("div");

            sugestao.classList.add("suggestion-item");

            sugestao.textContent = titulo;

            sugestao.addEventListener("click", function () {

                campoBusca.value = titulo.trim();

                suggestionsBox.style.display = "none";

                pesquisarProdutos();

                produto.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                produto.classList.add("produto-destaque");

                setTimeout(() => {
                    produto.classList.remove("produto-destaque");
                }, 1000);

            });

            suggestionsBox.appendChild(sugestao);

        } else {

            produto.style.display = "none";

        }

    });


//RESUTADOS

    if (encontrou) {

        suggestionsBox.style.display = "block";
        mostrarMensagemBusca(false);

    } else {

        const semResultado =
            document.createElement("div");

        semResultado.classList.add("no-suggestion-item");

        semResultado.textContent =
            "Nenhum produto encontrado.";

        suggestionsBox.appendChild(semResultado);

        suggestionsBox.style.display = "block";

        mostrarMensagemBusca(true);
    }
}


//BOTÃO DE BUSCA

if (botaoBusca) {

    botaoBusca.addEventListener("click", function () {
        mostrarSugestoes();
    });

}


//DIGITAÇÃO

if (campoBusca) {

    campoBusca.addEventListener("input", function () {
        mostrarSugestoes();
    });


    campoBusca.addEventListener("keydown", function(event) {

        if (!suggestionsBox) return;

        const sugestoes =
            suggestionsBox.querySelectorAll(".suggestion-item");
    

// SETA PARA BAIXO 

        if (event.key === "ArrowDown") {

    event.preventDefault();

    if (sugestoes.length === 0) {
        return;
    }

    currentFocus++;

    if (currentFocus >= sugestoes.length) {
        currentFocus = 0;
    }

    atualizarSugestaoAtiva(sugestoes);
}

//SETA PARA CIMA 

        else if (event.key === "ArrowUp") {

    event.preventDefault();

    if (sugestoes.length === 0) {
        return;
    }

    currentFocus--;

    if (currentFocus < 0) {
        currentFocus = sugestoes.length - 1;
    }

    atualizarSugestaoAtiva(sugestoes);
}

//ENTER

        else if (event.key === "Enter") {

    event.preventDefault();

    if (
        currentFocus >= 0 &&
        currentFocus < sugestoes.length
    ) {

        sugestoes[currentFocus].click();

    } else {

        pesquisarProdutos();

        suggestionsBox.style.display = "none";
    }
}



//DESTACAR SUGESTAO ATIVA

function atualizarSugestaoAtiva(sugestoes) {

    sugestoes.forEach(function(sugestao) {
        sugestao.classList.remove("suggestion-item-active");
    });

    if (currentFocus >= 0 && currentFocus < sugestoes.length) {

        sugestoes[currentFocus].classList.add(
            "suggestion-item-active"
        );

        sugestoes[currentFocus].scrollIntoView({
            block: "nearest"
        });
    }
}


//FECHAR SUGETAO DE FORA

document.addEventListener("click", function(event) {

    if (!campoBusca || !suggestionsBox) return;

    if (
        !campoBusca.contains(event.target) &&
        !suggestionsBox.contains(event.target)
    ) {

        suggestionsBox.style.display = "none";

        currentFocus = -1;
    }

});


// MOSTRAR DE NOVO AO FOCAR

if (campoBusca) {

    campoBusca.addEventListener("focus", function() {

        if (
            this.value.trim() !== "" &&
            suggestionsBox &&
            suggestionsBox.children.length > 0
        ) {

            suggestionsBox.style.display = "block";
        }

    });

}

//                              CARRINHO
 
// function adicionarCarrinho(nomeProduto, botao) {

//     let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

//     carrinho.push(nomeProduto);

//     localStorage.setItem("carrinho", JSON.stringify(carrinho));

//     atualizarContador();

//     botao.textContent = "Produto adicionado";
//     botao.style.backgroundColor = "#718442";
//     botao.style.borderColor = "#718442";
//     botao.style.color = "#fff";

//     setTimeout(function() {

//         botao.textContent = "Adicionar ao carrinho";
//         botao.style.backgroundColor = "#f86464";
//         botao.style.borderColor = "#f86464";
//         botao.style.color = "#fff";

//     }, 2000);
// }


// function atualizarContador() {

//     let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

//     const contador = document.getElementById("contadorCarrinho");

//     if (contador) {
//         contador.textContent = carrinho.length;
//     }

// }

// atualizarContador();

// const botaoCarrinho = document.getElementById("botaoCarrinho");
// const carrinhoLateral = document.getElementById("carrinhoLateral");
// const fundoCarrinho = document.getElementById("fundoCarrinho");
// const fecharCarrinho = document.getElementById("fecharCarrinho");
// const continuarComprando = document.getElementById("continuarComprando");

// function abrirCarrinho() {
//     carrinhoLateral.classList.add("ativo");
//     fundoCarrinho.classList.add("ativo");
//     mostrarProdutosCarrinho();

// }

// function fecharCarrinhoLateral() {
//     carrinhoLateral.classList.remove("ativo");
//     fundoCarrinho.classList.remove("ativo");

// }

// function mostrarProdutosCarrinho() {
//     const carrinho = JSON.parse(
//         localStorage.getItem("carrinho")
//     ) || [];

//     const container = document.getElementById("carrinhoProdutos");

//     container.innerHTML = "";

//     if (carrinho.length === 0) {
//         container.innerHTML = `
//             <div class="carrinho-vazio">
//                 Seu carrinho está vazio.
//             </div>
//         `;
//         document.getElementById("totalCarrinho").textContent = "R$ 0,00";

//         return;
//     }

//     const produtos = {};

//     carrinho.forEach(function(nome) {
//         if (produtos[nome]) {
//             produtos[nome]++;
//         } else {
//             produtos[nome] = 1;
//         }
//     });

//     let totalGeral = 0;

//     Object.keys(produtos).forEach(function(nomeProduto) {
//         const quantidade = produtos[nomeProduto];

//         const produto = Array.from(
//             document.querySelectorAll(".produto")
//         ).find(function(item) {

//             return item.querySelector("h3")?.textContent.trim()
//                 === nomeProduto;

//         });

//         let preco = 0;

//         if (produto) {
//             preco = parseFloat(
//                 produto.getAttribute("data-preco")
//             ) || 0;
//         }

//         const totalProduto = preco * quantidade;

//         totalGeral += totalProduto;

//         const item = document.createElement("div");

//         item.classList.add("item-carrinho");

//         /*item.innerHTML = `

//             <div class="item-carrinho-info">
//                 <h3>
//                     ${nomeProduto}
//                 </h3>

//                 <span class="preco-unitario">
//                     R$ ${preco.toFixed(2).replace(".", ",")}
//                 </span>
//             </div>

//             <div class="item-carrinho-quantidade">

//                 <button 
//                     type="button"
//                     onclick="alterarQuantidade('${nomeProduto.replace(/'/g, "\\'")}', -1)"
//                 >
//                     −
//                 </button>

//                 <span>
//                     ${quantidade}
//                 </span>

//                 <button 
//                     type="button"
//                     onclick="alterarQuantidade('${nomeProduto.replace(/'/g, "\\'")}', 1)"
//                 >
//                     +
//                 </button>

//             </div>

//             <div class="item-carrinho-total">
//                 <strong>
//                     R$ ${totalProduto.toFixed(2).replace(".", ",")}
//                 </strong>

//                 <button 
//                     type="button"
//                     class="excluir-produto"
//                     onclick="excluirProduto('${nomeProduto.replace(/'/g, "\\'")}')"
//                 >
//                     Excluir
//                 </button>
//             </div>
//         `;*/

//         item.innerHTML = `

//             <div class="item-carrinho-topo">

//                 <h3>
//                     ${nomeProduto}
//                 </h3>

//                 <div class="item-carrinho-acoes">

//                     <div class="item-carrinho-quantidade">

//                         <button 
//                             type="button"
//                             onclick="alterarQuantidade(
//                                 '${nomeProduto.replace(/'/g, "\\'")}',
//                                 -1
//                             )"
//                         >
//                             −
//                         </button>

//                         <span>
//                             ${quantidade}
//                         </span>

//                         <button 
//                             type="button"
//                             onclick="alterarQuantidade(
//                                 '${nomeProduto.replace(/'/g, "\\'")}',
//                                 1
//                             )"
//                         >
//                             +
//                         </button>

//                     </div>

//                     <button 
//                         type="button"
//                         class="excluir-produto"
//                         onclick="excluirProduto(
//                             '${nomeProduto.replace(/'/g, "\\'")}'
//                         )"
//                     >
//                         Excluir
//                     </button>

//                 </div>

//             </div>


//             <div class="item-carrinho-info">

//                 <span class="preco-unitario">
//                     R$ ${preco.toFixed(2).replace(".", ",")}
//                 </span>

//             </div>


//             <div class="item-carrinho-total">

//                 <strong>
//                     R$ ${totalProduto.toFixed(2).replace(".", ",")}
//                 </strong>

//             </div>

//         `;

//         container.appendChild(item);
//     });

//     document.getElementById("totalCarrinho").textContent =
//         "R$ " + totalGeral.toFixed(2).replace(".", ",");

// }

// function alterarQuantidade(nomeProduto, quantidade) {
//     let carrinho =
//         JSON.parse(localStorage.getItem("carrinho")) || [];

//     if (quantidade === 1) {
//         carrinho.push(nomeProduto);
//     } else {

//         const indice = carrinho.indexOf(nomeProduto);
//         if (indice !== -1) {

//             carrinho.splice(indice, 1);
//         }
//     }

//     localStorage.setItem(
//         "carrinho",
//         JSON.stringify(carrinho)
//     );

//     atualizarContador();
//     mostrarProdutosCarrinho();

// }

// function excluirProduto(nomeProduto) {
//     let carrinho =
//         JSON.parse(localStorage.getItem("carrinho")) || [];

//     carrinho = carrinho.filter(function(nome) {
//         return nome !== nomeProduto;
//     });

//     localStorage.setItem(
//         "carrinho",
//         JSON.stringify(carrinho)
//     );

//     atualizarContador();
//     mostrarProdutosCarrinho();

// }

// if (botaoCarrinho) {
//     botaoCarrinho.addEventListener("click", function(event) {
//         event.preventDefault();
//         abrirCarrinho();
//     });
// }

// if (fecharCarrinho) {
//     fecharCarrinho.addEventListener("click", function() {
//         fecharCarrinhoLateral();
//     });
// }

// if (fundoCarrinho) {
//     fundoCarrinho.addEventListener("click", function() {
//         fecharCarrinhoLateral();
//     });
// }

// if (continuarComprando) {
//     continuarComprando.addEventListener("click", function() {
//         fecharCarrinhoLateral();
//     });

// }

// /* =========================================
//    MENU MOBILE
// ========================================= */

// const botaoMenuMobile = document.getElementById("botaoMenuMobile");
// const menuLateralMobile = document.getElementById("menuLateralMobile");
// const fundoMenuMobile = document.getElementById("fundoMenuMobile");
// const fecharMenuMobile = document.getElementById("fecharMenuMobile");

// const botaoProdutosMobile = document.getElementById("botaoProdutosMobile");
// const submenuProdutosMobile = document.getElementById("submenuProdutosMobile");


// function abrirMenuMobile() {

//     menuLateralMobile.classList.add("ativo");
//     fundoMenuMobile.classList.add("ativo");

// }


// function fecharMenuMobileFuncao() {

//     menuLateralMobile.classList.remove("ativo");
//     fundoMenuMobile.classList.remove("ativo");

// }


// if (botaoMenuMobile) {

//     botaoMenuMobile.addEventListener("click", function() {

//         abrirMenuMobile();

//     });

// }


// if (fecharMenuMobile) {

//     fecharMenuMobile.addEventListener("click", function() {

//         fecharMenuMobileFuncao();

//     });

// }


// if (fundoMenuMobile) {

//     fundoMenuMobile.addEventListener("click", function() {

//         fecharMenuMobileFuncao();

//     });

// }


// /* ABRIR PRODUTOS */

// if (botaoProdutosMobile) {

//     botaoProdutosMobile.addEventListener("click", function() {

//         submenuProdutosMobile.classList.toggle("ativo");

//         botaoProdutosMobile.classList.toggle("aberto");

//     });

// }


// /*Confirmar exclusão de conta*/

// document.addEventListener("DOMContentLoaded", function () {

//     var linksExclusao = document.querySelectorAll(".confirmar-exclusao");

//     linksExclusao.forEach(function (link) {

//         link.addEventListener("click", function (evento) {

//             var confirmou = confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.");

//             if (!confirmou) {
//                 evento.preventDefault();
//             }

//         });

//     });

// });
<!DOCTYPE html>
<html>
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta naem="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" integrity="sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <link rel="stylesheet" href="pagPrincipal.css">
      </head>
  <body>


<div class="page-container">
    <header>
        <div class="logo-container"></div>
        
        <div class="search-container">
            
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" id="search" placeholder="Pesquisar produtos...">

            <div id="suggestions" class="suggestions-dropdown"></div> 
        </div>
        
        <div class="header-icons"></div>
    </header>

   <nav></nav>


   <main>
       <section class="sec-banner split-section">
           <div class="text-content">
               <div class="btn"></div>
           </div>
           <div class="image-content">
               <div class="img-placeholder"></div>
           </div>
       </section>


       <section class="sec-categories">
           <div class="section-header">
               <div class="header-title-placeholder">ingredientes</div>
               <a xlink:href="pagProdutos.php" class="btn-VerTodos">
                    Ver todos ->
                </a>
           </div>

           <div class="scroll-container">
               <div class="item-circulo">
                    <a xlink:href="pagIngrediente.php" class="btn-ingBall">
               </div>
               <div class="item-circulo">
                    <a xlink:href="pagIngrediente.php" class="btn-ingBall">
               </div>
               <div class="item-circulo">
                    <a xlink:href="pagIngrediente.php" class="btn-ingBall">
               </div>
               <div class="item-circulo">
                    <a xlink:href="pagIngrediente.php" class="btn-ingBall">
               </div>
               <div class="item-circulo">
                    <a xlink:href="pagIngrediente.php" class="btn-ingBall">
               </div>
           </div>
       </section>

       <section class="sec-ingredients split-section">
           <div class="text-content">
               <div class="btn">

               </div>
           </div>
           <div class="image-content">
               <div class="img-placeholder">

               </div>
           </div>
       </section>


       <section class="sec-produtos">
           <div class="section-header">
               <div class="header-title-placeholder">Produtos</div>
               <a xlink:href="pagProdutos.php" class="btn-VerTodos">
                    Ver todos ->
                </a>
           </div>

           <div class="scroll-container">
               <div class="produto-card">
                   <div class="produto-img"></div>
                   <div class="produto-title">Sabonete de Morango</div>
                   <div class="produto-info">Sabonete de Morango</div>
                   <a xlink:href="" class="btn-add">Adicionar no carrinho</a>
               </div>
               <div class="produto-card">
                   <div class="produto-img"></div>
                   <div class="produto-title">Sabonete de Melancia</div>
                   <div class="produto-info">Sabonete de Melancia</div>
                   <a xlink:href="" class="btn-add">Adicionar no carrinho</a>
               </div>
               <div class="produto-card">
                   <div class="produto-img"></div>
                   <div class="produto-title">Sabonete de Mirtilo</div>
                   <div class="produto-info">Sabonete de Mirtilo</div>
                   <a xlink:href="" class="btn-add">Adicionar no carrinho</a>
               </div>
               <div class="produto-card">
                   <div class="produto-img"></div>
                   <div class="produto-title">Sabonete de Abacaxi</div>
                   <div class="produto-info">Sabonete de abacaxi</div>
                   <a xlink:href="" class="btn-add">Adicionar no carrinho</a>
               </div>
               <div class="produto-card">
                   <div class="produto-img"></div>
                   <div class="produto-title">Sabonete de Morango</div>
                   <div class="produto-info">Produto teste</div>
                   <div class="btn-add">
                   <a xlink:href="">Adicionar no carrinho</a>
                   </div>

               </div>
           </div>
       </section>
   </main>


   <footer></footer>
</div>
<script src="script.js"></script>
</body>
</html>

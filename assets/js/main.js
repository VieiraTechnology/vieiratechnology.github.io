/* VieiraTechnology — comportamento do site.
   Duas coisas: barra fixa de contato no celular e ano do rodapé.
   O menu é sempre visível e o FAQ usa <details> nativo: nada aqui depende de JS. */
(function () {
  'use strict';

  /* --- barra fixa de contato (só no celular) ----------------------------
     Aparece depois que a pessoa passou pelos serviços, não logo no topo:
     quem chegou agora precisa ler antes de ser convidado a chamar. */
  var sticky = document.getElementById('sticky-cta');
  var gatilho = document.getElementById('servicos');
  var contato = document.getElementById('contato');

  if (sticky && gatilho) {
    var dispensada = false;
    var fechar = sticky.querySelector('.sticky-close');

    var mostrar = function (visivel) {
      if (dispensada) { visivel = false; }
      sticky.hidden = !visivel;
      sticky.classList.toggle('is-visible', visivel);
    };

    if (fechar) {
      fechar.addEventListener('click', function () {
        dispensada = true;
        mostrar(false);
      });
    }

    if ('IntersectionObserver' in window) {
      var passouServicos = false;
      var contatoVisivel = false;
      var sincronizar = function () { mostrar(passouServicos && !contatoVisivel); };

      new IntersectionObserver(function (entradas) {
        var e = entradas[0];
        /* passou do bloco de serviços, rolando para baixo */
        if (!e.isIntersecting && e.boundingClientRect.top < 0) { passouServicos = true; }
        if (e.isIntersecting) { passouServicos = false; }
        sincronizar();
      }, { threshold: 0 }).observe(gatilho);

      if (contato) {
        new IntersectionObserver(function (entradas) {
          contatoVisivel = entradas[0].isIntersecting;
          sincronizar();
        }, { threshold: 0.15 }).observe(contato);
      }
    } else {
      window.addEventListener('scroll', function () {
        mostrar(window.scrollY > window.innerHeight * 1.6);
      }, { passive: true });
    }
  }

  /* --- ano do rodapé ----------------------------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = new Date().getFullYear(); }
})();

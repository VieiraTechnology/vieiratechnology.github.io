/* VieiraTechnology — comportamento do site.
   Três coisas: menu do celular, barra fixa de contato e ano do rodapé.
   Todo o conteúdo funciona sem JS; o FAQ usa <details> nativo. */
(function () {
  'use strict';

  /* --- menu do celular -------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-primary');

  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') { closeNav(); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { closeNav(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 840) { closeNav(); }
    });
  }

  /* --- barra fixa de contato (só no celular) ---------------------------- */
  var sticky = document.getElementById('sticky-cta');
  var contato = document.getElementById('contato');
  var hero = document.querySelector('.hero');

  if (sticky && hero) {
    var dismissed = false;
    var closeBtn = sticky.querySelector('.sticky-close');

    var show = function (visible) {
      if (dismissed) { visible = false; }
      sticky.hidden = !visible;
      sticky.classList.toggle('is-visible', visible);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dismissed = true;
        show(false);
      });
    }

    if ('IntersectionObserver' in window) {
      /* aparece quando o hero sai da tela; some quando a seção de contato entra,
         para não cobrir o botão principal com outro botão igual */
      var heroOut = false;
      var contatoIn = false;

      var sync = function () { show(heroOut && !contatoIn); };

      new IntersectionObserver(function (entries) {
        heroOut = !entries[0].isIntersecting;
        sync();
      }, { threshold: 0 }).observe(hero);

      if (contato) {
        new IntersectionObserver(function (entries) {
          contatoIn = entries[0].isIntersecting;
          sync();
        }, { threshold: 0.15 }).observe(contato);
      }
    } else {
      /* navegador antigo: mostra depois de uma rolagem simples */
      window.addEventListener('scroll', function () {
        show(window.scrollY > window.innerHeight * 0.8);
      }, { passive: true });
    }
  }

  /* --- ano do rodapé ---------------------------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) { ano.textContent = new Date().getFullYear(); }
})();

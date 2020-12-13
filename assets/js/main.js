import '../styles/main.scss';
import routes from '../routes';

function navigation() {
  const nav = document.getElementById('nav');
  const menu = document.getElementById('menu');
  const menuBtns = document.querySelectorAll('.nav-btn');
  const subMenuBtn = document.querySelectorAll('.open-sub-menu');
  const pagesMenu = document.getElementById('pages-menu');
  const gamesMenu = document.getElementById('games-menu');
  const uisMenu = document.getElementById('ui-menu');

  // Generate HTML elements for the routes
  routes.forEach((route) => {
    const gameMenu = document.getElementById('games-menu');
    const pageMenu = document.getElementById('pages-menu');
    const uiMenu = document.getElementById('ui-menu');
    const footerMenu = document.querySelector('.footer-nav__links');

    const anchor = document.createElement('a');
    const link = document.createElement('li');

    anchor.classList.add('link');
    anchor.href = route.route;
    anchor.textContent = route.name;

    link.appendChild(anchor);

    if (route.page) {
      pageMenu.appendChild(link);
      footerMenu.appendChild(link);
    }
    if (route.game) {
      gameMenu.appendChild(link);
    }
    if (route.ui) {
      uiMenu.appendChild(link);
    }
  });

  // Handle opening and closing of sub menu's
  subMenuBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { open } = e.target.dataset;

      if (open === 'pages menu') {
        gamesMenu.classList.add('hide');
        uisMenu.classList.add('hide');
        setTimeout(() => {
          pagesMenu.classList.toggle('hide');
        }, 40);
      }
      if (open === 'games menu') {
        pagesMenu.classList.add('hide');
        uisMenu.classList.add('hide');
        setTimeout(() => {
          gamesMenu.classList.toggle('hide');
        }, 40);
      }
      if (open === 'ui menu') {
        gamesMenu.classList.add('hide');
        pagesMenu.classList.add('hide');
        setTimeout(() => {
          uisMenu.classList.toggle('hide');
        }, 40);
      }
    });
  });

  // Handle opening and closing of the mobile menu
  menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => menu.classList.toggle('menu__hide'));
  });

  document.addEventListener('scroll', (e) => {
    const scrollPos = document.documentElement.scrollTop;
    const pos = 10;

    if (scrollPos > pos) {
      nav.classList.add('nav-shadow');
    }
    if (scrollPos < pos) {
      nav.classList.remove('nav-shadow');
    }
  });
}

function contentLinks() {
  const allGames = document.querySelector('.all-content-links');

  routes.forEach((route) => {
    const anchor = document.createElement('a');
    const link = document.createElement('li');

    anchor.classList.add('link');
    anchor.href = route.route;
    anchor.textContent = route.name;

    link.appendChild(anchor);
    if (route.game) {
      allGames.appendChild(link);
    }
  });
}

function footer() {
  const nav = document.querySelector('.footer-nav__links');
}

function main() {
  navigation();
  contentLinks();
  footer();
}
document.addEventListener('DOMContentLoaded', () => {
  main();
});

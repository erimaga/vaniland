import '../styles/main.scss';
import routes from '../routes';

function navigation() {
  const menu = document.getElementById('menu');
  const menuBtns = document.querySelectorAll('.nav-btn');
  const subMenuBtn = document.querySelectorAll('#sub-menu__btn');
  const pagesMenu = document.getElementById('pages-menu');
  const gamesMenu = document.getElementById('games-menu');
  const uisMenu = document.getElementById('ui-menu');

  // Generate HTML elements for the routes
  routes.forEach((route) => {
    const gameMenu = document.getElementById('games-menu');
    const pageMenu = document.getElementById('pages-menu');
    const uiMenu = document.getElementById('ui-menu');

    const link = document.createElement('a');
    link.classList.add('link');
    link.href = route.route;
    link.textContent = route.name;

    if (route.page) {
      return pageMenu.appendChild(link);
    }
    if (route.game) {
      return gameMenu.appendChild(link);
    }
    if (route.ui) {
      return uiMenu.appendChild(link);
    }
  });

  // Handle opening and closing of sub menu's
  subMenuBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { open } = e.target.dataset;

      if (open === 'pages menu') {
        pagesMenu.classList.toggle('hide');
      }
      if (open === 'games menu') {
        gamesMenu.classList.toggle('hide');
      }
      if (open === 'ui menu') {
        uisMenu.classList.toggle('hide');
      }
    });
  });

  // Handle opening and closing of the mobile menu
  menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => menu.classList.toggle('menu__hide'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  navigation();
});

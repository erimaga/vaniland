import '../styles/main.scss';
import routes from '../routes';

document.addEventListener('DOMContentLoaded', () => {
  // Generate HTML elements for the routes
  routes.forEach((route) => {
    const gameMenu = document.getElementById('game-menu');
    const pageMenu = document.getElementById('page-menu');
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
});

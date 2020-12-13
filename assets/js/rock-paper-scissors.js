import '../styles/rock-paper-scissors.scss';

document.addEventListener('DOMContentLoaded', () => {
  /* DOM elements */
  const choicesBtn = document.querySelectorAll('.action-btn');
  const outcomeTitle = document.querySelector('.outcome-title');
  const outcomeDetail = document.querySelector('.outcome-detail');

  /* Global variables */
  const choices = ['rock', 'paper', 'scissors'];
  /*
      A list of possible outcomes. Comparisons are made left to right.
        i.e the player takes the value to the left and the computer takes the value to the right
        example:
          Player wins and computer loses: pr = paper covers rock.
          Player loses and computer wins: ps = scissor cuts paper.
          Player and computer draw: pp = paper and paper.
    */
  const wins = ['rs', 'pr', 'sp'];
  const loses = ['sr', 'rp', 'ps'];
  const draws = ['rr', 'pp', 'ss'];

  const duration = 750;

  let playerScore = 0;
  let computerScore = 0;

  /* Global Functions */
  // Transform the parsed value to a string and lowercase
  function caps(str) {
    return str.toString().substr(0, 1).toLowerCase();
  }
  // Get the computer choice from an array of available choices.
  function computerChoices() {
    const sorted = choices.sort(() => 0.5 - Math.random());
    return caps(sorted[Math.floor(Math.random() * choices.length)]);
  }

  /*
    GAME FUNCTIONS
  */

  function updateScore(winner) {
    if (winner !== 'draw') {
      const win = document.getElementById(`${winner}-score`);
      if (winner === 'player') {
        playerScore += 5;
        win.textContent = playerScore;
      }
      if (winner === 'computer') {
        computerScore += 5;
        win.textContent = computerScore;
      }
    }
  }

  function paint({ winner, loser, draw }) {
    const winColor = '#00d37d';
    const loseColor = '#e63946';
    const drawColor = '#01b8fa';

    const get = (id) => document.getElementById(id);

    const relation = { r: 'rock', p: 'paper', s: 'scissors' };

    const winnerBtn = get(relation[winner]);
    const loserBtn = get(relation[loser]);

    winnerBtn.style.backgroundColor = draw ? drawColor : winColor;
    loserBtn.style.backgroundColor = draw ? drawColor : loseColor;

    return setTimeout(() => {
      winnerBtn.style.backgroundColor = 'transparent';
      loserBtn.style.backgroundColor = ' transparent';
    }, duration);
  }

  function resultant({ player, computer }) {
    let output;
    const combo = player + computer;

    if (combo === 'rs' || combo === 'sr') {
      output = 'Rock breaks Scissors.';
    }
    if (combo === 'pr' || combo === 'rp') {
      output = 'Paper covers Rock.';
    }
    if (combo === 'sp' || combo === 'ps') {
      output = 'Scissors cut Paper.';
    }
    if (combo === 'rr' || combo === 'pp' || combo === 'ss') {
      output = 'No Opposition.';
    }

    return output;
  }
  // Display the outcome to the user
  function outcome({ result, player, computer }) {
    const { winner, draw } = result;
    outcomeDetail.textContent = resultant({ player, computer });
    // paint({ player, computer });

    if (!draw) {
      outcomeTitle.classList.remove('draw');
      outcomeTitle.classList.add('success');

      if (winner === 'player') {
        outcomeTitle.textContent = 'You win! 🎊';
      } else {
        outcomeTitle.textContent = 'Computer wins! 🎊';
      }
    }
    if (draw) {
      outcomeTitle.classList.remove('success');
      outcomeTitle.classList.add('draw');
      outcomeTitle.textContent = "It's a draw!";
    }
  }
  // Compare the player and computer choices and determine the outcome.
  function game({ player, computer }) {
    // Merge the player and computer choices
    const combo = player + computer;

    choicesBtn.forEach((btn) => {
      btn.setAttribute('disabled', true);
    });

    setTimeout(() => {
      choicesBtn.forEach((btn) => {
        btn.removeAttribute('disabled');
      });
    }, duration + 50);

    if (wins.includes(combo)) {
      paint({ winner: player, loser: computer, draw: false });
      updateScore('player');

      return outcome({
        result: { winner: 'player', draw: false },
        player,
        computer,
      });
    }
    if (loses.includes(combo)) {
      paint({ winner: computer, loser: player, draw: false });
      updateScore('computer');

      return outcome({
        result: { winner: 'computer', draw: false },
        player,
        computer,
      });
    }
    if (draws.includes(combo)) {
      paint({ winner: player, loser: computer, draw: true });
      updateScore('draw');

      return outcome({
        result: { winner: false, draw: true },
        player,
        computer,
      });
    }

    return outcome({
      result: { winner: false, draw: false },
      player,
      computer,
    });
  }

  /* Get the player and computer choices */
  choicesBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { choice } = e.target.dataset;
      const player = caps(choice);
      const computer = computerChoices();

      // Call the function to compare the choices and determine the outcome.
      game({ player, computer });
    });
  });
});

const titleCase = (str) => {
  const words = str.toLowerCase().split('-');

  words.forEach((word, idx) => {
    words[idx] = words[idx][0].toUpperCase() + words[idx].slice(1);
  });

  return words.join(' ');
};

module.exports = { titleCase };

const foods = [];

const prom = fetch('data.json')
  .then(blob => blob.json())
  .then(data => {
    for(let rating in data) {
      data[rating].forEach(category => {
        category.items.forEach(food => {
          let item = {
            rating: rating,
            name: food
          };
          foods.push(item);
        })
      })
    }
  });

function findMatches(wordToMatch, foods) {
  return foods.filter(food => {
    const regex = new RegExp(wordToMatch, 'gi');
    return food.name.match(regex);
  });
}

function displayMatches() {
  if(!this.value.length) return suggestions.innerHTML = '';
  const matchArray = findMatches(this.value, foods);
  const html = matchArray.map(food => {
    const regex = new RegExp(this.value, 'gi');
    const foodName = food.name.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
      <li class="${food.rating}">
        <span class="name">${foodName}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

console.log('searchInput')

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('input', displayMatches);

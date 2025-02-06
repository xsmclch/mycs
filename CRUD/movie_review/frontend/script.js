const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<your_api_key>&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=<your_api_key>&query=';

const IMG_SIZES = ['w1280', 'w780', 'w500', 'w342', 'w185', 'w154', 'w92'];

const main = document.querySelector('#section');
const form = document.querySelector('#form');
const search = document.querySelector('#query');

returnMovies(APILINK)
function returnMovies(url) {
  fetch(url).then(res => res.json())
    .then(data => {
      console.log(data.results);
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.className = 'card';

        const div_row = document.createElement('div');
        div_row.className = 'row';

        const div_column = document.createElement('div');
        div_column.className = 'column';

        const image = document.createElement('img');
        image.className = 'thumbnail';
        image.id = 'image';

        const title = document.createElement('h3');
        title.id = 'title';

        const center = document.createElement('center');

        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;

        image.src = IMG_PATH + element.poster_path;

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      })
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = '';
  }
})
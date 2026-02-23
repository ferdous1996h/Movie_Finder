'use strict';
const form = document.querySelector('.search_movie');
const inputData = document.querySelector('#movie_search_input');
const grabBottom = document.querySelector('.search_bottom');
const mdlICON = document.querySelector('.explore_icon');

let wishListArr = [];

const localData = localStorage.getItem('wishItems');
if (localData) {
  const info = JSON.parse(localData);
  wishListArr = [...info];
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const searchValue = inputData.value;
  grabBottom.textContent = '';

  async function movieData(name) {
    try {
      const searchinfo = await fetch(
        `https://www.omdbapi.com/?apikey=92a425b3&s=${name}`,
      );
      const data = await searchinfo.json();

      data.Search.map(async ele => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=92a425b3&i=${ele.imdbID}`,
        );
        const data = await response.json();
        const mainE = document.createElement('main');
        mainE.className = 'card';
        mainE.innerHTML = `<section class="left">
        <img
          src=${data.Poster}
          alt="">
      </section>
      <section class="right">
        <div>
          <h2>${data.Title}</h2>
          <div style="display: flex;align-items: center;gap: 5px;">
            <img src="https://img.icons8.com/?size=100&id=bSBJ7165l9Vr&format=png&color=000000" alt="" width="30px">
            <p>${data.imdbRating}</p>
          </div>
        </div>
        <div>
          <p>${data.Runtime} min</p>
          <p>${data.Genre}</p>
          <a href="#" class="add_icon" style="color: black;text-decoration:none ;gap: 5px;">
            <img src="./public/add.png" alt="" width="30px">
            <p>Watchlist</p>
          </a>
        </div>
        <div style="width: 500px;">
          <p style="color: #6B7280;line-height: 23px;">
            ${data.Plot}
          </p>
        </div>
        </section>
      `;

        const singleWish = mainE.querySelector('.add_icon');

        singleWish.addEventListener('click', e => {
          e.preventDefault();
          wishListArr.push(data);
        });

        grabBottom.appendChild(mainE);
      });
    } catch (err) {
      grabBottom.innerHTML = `
      <div class="explore_icon">
      <h3>Unable to find what you’re looking for. Please try another search.</h3>
      </div>
      `;
    }
  }
  movieData(searchValue);
});

document.querySelector('.nextPage').addEventListener('click', () => {
  localStorage.setItem('wishItems', JSON.stringify(wishListArr));
});

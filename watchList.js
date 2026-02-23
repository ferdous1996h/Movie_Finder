'use strict';
const grabBottom = document.querySelector('.search_bottom');
// const localData = localStorage.getItem('wishItems');
let info = [];
try {
  const localData = localStorage.getItem('wishItems');
  info = localData ? JSON.parse(localData) : [];
} catch (err) {
  info = [];
}

function renderData() {
  grabBottom.innerHTML = '';

  if (info.length === 0) {
    grabBottom.innerHTML = `<div class="explore_icon">
        <h3>
          Your watchlist is looking a little empty...
        </h3>
      </div>`;
  }

  try {
    info.map(data => {
      const mainEle = document.createElement('main');
      mainEle.className = 'card';
      mainEle.innerHTML = `<section class="left">
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
          <a href="#" class="add_icon" data-imdb=${data.imdbID} style="color: black;text-decoration:none ;gap: 5px;">
            <img src="./public/remove.png" alt="" width="30px">
            <p>Remove</p>
          </a>
        </div>
        <div style="width: 500px;">
          <p style="color: #6B7280;line-height: 23px;">
            ${data.Plot}
          </p>
        </div>
        </section>`;
      grabBottom.appendChild(mainEle);
    });
  } catch (err) {
    grabBottom.innerHTML = `<div class="explore_icon">
        <h3>
          ${err.message}
        </h3>
      </div>`;
  }
}

grabBottom.addEventListener('click', e => {
  const removeWish = e.target.closest('.add_icon');
  if(!removeWish) return
  info = info.filter(movie => movie.imdbID !== removeWish.dataset.imdb);

  localStorage.setItem('wishItems',JSON.stringify(info));
  renderData()
});

renderData();

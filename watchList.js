'use strict';
const grabBottom = document.querySelector('.search_bottom');
const localData = localStorage.getItem('wishItems');

if (localData.length === 2) {
  console.log(localData);
  grabBottom.innerHTML = ` <div class="explore_icon">
      <h3>Your watchlist is looking a little empty...</h3>
      </div>`;
}
if (localData) {
  const info = JSON.parse(localData);
  info.map(data => {
    try {
      console.log(data);
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
                <img src="./public/remove.png" alt="" width="30px">
                <p>Watchlist</p>
              </a>
            </div>
            <div style="width: 500px;">
              <p style="color: #6B7280;line-height: 23px;">
                ${data.Plot}
              </p>
            </div>
            </section>`;

      grabBottom.appendChild(mainE);
    } catch (err) {
      grabBottom.innerHTML = ` <div class="explore_icon">
      <h3>Error loading watchlist</h3>
      </div>`;
    }
  });
}

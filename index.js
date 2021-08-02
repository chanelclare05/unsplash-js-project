const imageToDisplay = document.querySelector('.imageToDisplay');
const getImagesButton = document.querySelector('.btn')
getImagesButton.addEventListener('submit', handleSubmit);

let searchQuery;
const form = document.querySelector('.js-form');
form.addEventListener('submit', handleSubmit);

const requestUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=vvW0vsDFLMXsZm-LNFiTr4HLp6NLUlyWR1ppxnBkFlw`;




function handleSubmit(event) {
  event.preventDefault();
  const inputValue = document.querySelector('.js-search-input').value;
  searchQuery = inputValue.trim();
  console.log(searchQuery);
  getNewImage(searchQuery);
}

async function getNewImage(searchQuery) {
let randomNumber = Math.floor(Math.random() * 10);
return fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&client_id=vvW0vsDFLMXsZm-LNFiTr4HLp6NLUlyWR1ppxnBkFlw`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let allImages = data.results[randomNumber];
    displayResults(allImages)
    return allImages.urls.small;
  });
}

function displayResults(allImages) {
    const imageDisplay = document.querySelector(".imageDisplayWrapper");
    let imageToDisplay = document.createElement('img');
    imageToDisplay.classList.add('.imageToDisplay');
    imageToDisplay.src = allImages.urls.full
    // inline stlyes
    imageToDisplay.style.maxWidth = "50vh";
    imageToDisplay.style.maxHeight = "50vh";
    imageToDisplay.style.border = "3px solid black";
    imageToDisplay.style.maxWidth = "50vh";
    imageDisplay.appendChild(imageToDisplay);

    const searchResults = document.querySelector('.img-info');
    searchResults.textContent = '';
      const unsplashLink = allImages.links.html;
      const photographer = allImages.user.name;
      const description = allImages.alt_description;
      searchResults.insertAdjacentHTML(
        'beforeend',
        `<div>
          <p class="description"> 
            <a href="${unsplashLink}" target="_blank" 
            style="margin: 0px; color: grey; text-decoration: none; font-size: 10px;"> 
            Credit: "${description}" by Photo by ${photographer}
            </a>
          </p>
        </div>`
      );  
};


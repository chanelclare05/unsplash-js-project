const getImagesButton = document.querySelector('.btn')
getImagesButton.addEventListener('submit', handleSubmit);
const captionDisplay = document.querySelector('.comment-container');
captionDisplay.addEventListener('submit', captionSubmit);

const imageToDisplay = document.querySelector(".imageToDisplay");

const polaroidToDisplay = document.querySelector(".polaroidToDisplay")
const polaroidContainer = document.querySelector(".polaroid-container")

const paragraphAppear = document.querySelector("#paragraphAppear")

let searchQuery;
let captionValue;

const form = document.querySelector('.js-form');
form.addEventListener('submit', handleSubmit);


function handleSubmit(event) {
  event.preventDefault();
  const inputValue = document.querySelector('.js-search-input').value;
  searchQuery = inputValue.trim();
  console.log(searchQuery);
  getNewImage(searchQuery);
}

function captionSubmit(event){
    event.preventDefault();
    const captionInput = document.querySelector('#caption-description').value;
    captionValue = captionInput;
    let captionText = document.querySelector('#polaroid-text');
    captionText.innerHTML = captionValue;
    polaroidContainer.style.visibility = "visible";
}

async function getNewImage(searchQuery) {
let randomNumber = Math.floor(Math.random() * 10);
return fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&client_id=vvW0vsDFLMXsZm-LNFiTr4HLp6NLUlyWR1ppxnBkFlw`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let allImages = data.results[randomNumber];
    displayResults(allImages)
    getImagesButton.innerHTML = "Another?";
    paragraphAppear.style.visibility = "visible";
    return allImages.urls.small;
  });
}

function displayResults(allImages) {
    imageToDisplay.src = allImages.urls.full
    polaroidToDisplay.src = allImages.urls.full
    

    // extra info 
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
            style="margin: 0px; color: grey; text-decoration: none; font-size: 10px;" title:"title text"> 
            (Image Credit: "${description}" by Photo by ${photographer} - Unsplash)
            </a>
          </p>
        </div>`
      ); 
      console.log(allImages);
}


const auth = "563492ad6f91700001000001856a92a6b2b54a0d88c05aa7735a35a3";
const gallery = document.querySelector(".content__gallery");
const searchInput = document.querySelector(".header__input");
const form = document.querySelector(".header__search");
const more = document.querySelector(".navButton__btn");
let searchValue;
let page = "1";
let fetchLink;
let currentSearch;

//EventListeners
searchInput.addEventListener('input', updateInput);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);


//Functions
async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("content__img");
        galleryImg.innerHTML =
            `<img src=${photo.src.large} alt="img">
            <div class="content__galleryInfo">
                <p>${photo.photographer}</p>
                <a href=${photo.src.original} class="content__galleryLink">Download</a>
            </div>
            `;
        gallery.appendChild(galleryImg);
    });
}

function updateInput(e) {
    searchValue = e.target.value;
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

function clear () {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore () {
    page++;
    if (currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();
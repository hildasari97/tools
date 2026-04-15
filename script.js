const API_KEY = "ugCNcyHjCz3VP5oh0r3ZiHZ6BEF5SkyVUTMn9YKuD2LgdDKGa8unb5S7";

let page = 1;
let category = "nsfw girl";
let loading = false;

const gallery = document.getElementById("gallery");
const tg = window.Telegram.WebApp;

tg.expand();
tg.ready();

// Telegram Ads Controller
const AdsController = window.TelegramAdsController;

function showAds(){
  if(AdsController){
    try{
      AdsController.show?.();
    }catch(e){
      console.log("Ads error",e);
    }
  }
}

async function loadImages(){

if(loading) return;
loading = true;

const url = `https://api.pexels.com/v1/search?query=${category}&per_page=20&page=${page}`;

const res = await fetch(url,{ headers:{ Authorization: API_KEY }});
const data = await res.json();

if(data.photos){

 data.photos.forEach(photo=>{
    createCard(photo.src.medium, photo.src.large, photo.src.original);
 });

}

page++;
loading=false;
}

function createCard(img, low, hd){

const div=document.createElement("div");
div.className="card";

div.innerHTML=`
<img src="${img}">

<div class="buttons">

<div class="low" onclick="downloadLow('${low}')">LOW</div>

<div class="hd" onclick="downloadHD('${hd}')">HD</div>

</div>
`;

gallery.appendChild(div);
}

function setCategory(cat){

showAds();

gallery.innerHTML="";
page=1;
category=cat;

loadImages();
}

function searchImages(){

const keyword=document.getElementById("searchInput").value;

if(keyword==="") return;

showAds();

category=keyword;
gallery.innerHTML="";
page=1;

loadImages();
}

function downloadLow(url){
window.open(url);
}

function downloadHD(url){

showAds();

setTimeout(()=>{
window.open(url);
},2000);

}

window.addEventListener("scroll",()=>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
loadImages();
}
});

loadImages();

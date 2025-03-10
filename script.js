var Cname;
var offName;
var Capital;
var population;
var region;
var flag;
var flagalt;
var neighbours;
let ULneighbours;

function search() {
    Cname = document.getElementById("inputTxt").value;
    console.log(Cname);
    getData();
}

async function getData() {
    const url = "https://restcountries.com/v3.1/name/" + Cname;
    ULneighbours = document.getElementById("neighbours");

    ULneighbours.innerHTML = "";
    document.getElementById('flag').src = "";
    document.getElementById('flag').alt = "No Flag(Invalid-country)";
    document.getElementById('name').innerText = "Name: ";
    document.getElementById('capital').innerText = "Capital: ";
    document.getElementById('population').innerText = "Population: ";
    document.getElementById('region').innerText = "Region: ";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
        getCountryInfo(json);
        showStuff(json);
        getNeighbours(json);
    } catch (error) {
        console.error(error.message);
        alert("Country not found. Please check the spelling.");
    }
}

async function getNeighbourData(CODE) {
    const url = "https://restcountries.com/v3.1/alpha/" + CODE;
    console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const json = await response.json();
        showNeighbour(json);
    } catch (error) {
        console.error(error.message);
    }
} 

function getCountryInfo(json) {
    offName = json[0]['name']['official'];
    Capital = json[0]['capital'] ? json[0]['capital'][0] : 'No capital info';
    population = json[0]['population'];
    region = json[0]['region'];
    flag = json[0]['flags']['png'];
    flagalt = json[0]['flags']['alt'];
}

function showStuff(json) {
    document.getElementById('name').innerText = "Name: " + offName;
    document.getElementById('capital').innerText = "Capital: " + Capital;
    document.getElementById('population').innerText = "Population: " + population;
    document.getElementById('region').innerText = "Region: " + region;
    document.getElementById('flag').src = flag;
    document.getElementById('flag').alt = flagalt;
}

function getNeighbours(json) {

    ULneighbours.innerHTML = "";

    json.forEach(element => {
        if (element.hasOwnProperty('borders') && element['borders'].length > 0) {

            var neighs = element['borders'];
            neighs.forEach(code => {
                getNeighbourData(code); 
            });
        } else {
            const noNeighbours = document.createElement('li');
            noNeighbours.textContent = "No neighboring countries found.";
            ULneighbours.appendChild(noNeighbours);
        }
    });
}


function showNeighbour(json) {
    var nName = json[0]['name']['official'];
    var nflag = json[0]['flags']['png'];
    var nflagalt = json[0]['flags']['alt'];

    var LIneighbours = document.createElement("li");
    var cname = document.createTextNode(nName);
    var flag = document.createElement("img");

    flag.src = nflag;
    flag.alt = nflagalt;

    LIneighbours.appendChild(cname);
    LIneighbours.appendChild(flag);
  
    ULneighbours.appendChild(LIneighbours);
}

const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector(".inputSearch");

const buttonPrev = document.querySelector(".btnPrev");
const buttonNext = document.querySelector(".btnNext");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }

   
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = "";
        searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found!';
        pokemonNumber.innerHTML = '';
    }

  
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
    
})

buttonPrev.addEventListener("click", ()=>{
    
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }

   
    
})

buttonNext.addEventListener("click", ()=>{
    
    searchPokemon++;
    renderPokemon(searchPokemon);
    
})




renderPokemon(searchPokemon);

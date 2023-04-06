const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")

const form = document.querySelector(".formulario")
const input = document.querySelector(".input_search")
const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")


let searchpokemon = 1;

const fetchpokemon = async (pokemon) => {

    const APIresponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )

    if(APIresponse.status === 200){
        const data = await APIresponse.json()
        return data
    }

}

const renderpokemon = async (pokemon) =>{
    pokemonName.innerHTML = "loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchpokemon(pokemon)

    if(data) {
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        input.vaule = "";
        searchpokemon = data.id
    }else{
      pokemonImage.style.display = "nome";
      pokemonName.innerHTML = "Não encontrado";
      pokemonNumber.innerHTML = "";
    }
}

form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    renderpokemon(input.value.toLowerCase())
})




buttonPrev.addEventListener("click", ()=>{
    if(searchpokemon > 1){
        searchpokemon -= 1;
        renderpokemon(searchpokemon)
    }
})

buttonNext.addEventListener("click", ()=>{
    searchpokemon += 1;
    renderpokemon(searchpokemon);
})

renderpokemon(searchpokemon);
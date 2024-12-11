
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Nidoqueen' , height:1.3 , types: ['GROUND', 'POISEN']},
        {name: 'Omanyte' , height:0.4 , types: ['WATER', 'ROCK']},
        {name: 'Weavile' , height:1.1 , types: ['DARK', 'ICE']},
        {name: 'Crobat' , height:1.8 , types: ['FLYING', 'POISEN']},
        {name: 'Pignite' , height:1.0 , types: ['FIRE', 'FIGHTING']}
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object' && Object.keys(pokemonList[0]).every(key => key in pokemon))
            {

            pokemonList.push(pokemon);
            
        } else {
            console.log('This data type is not accepted.');
        }
       
    }
    function getAll() {
        return pokemonList;
    }

    function filterItem(name) {

       return pokemonList.filter(randomName => randomName.name === name);
    }
    function addListItem(pokemon){
        let unorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        unorderedList.appendChild(listItem);
    

    }

    function showDetails(pokemon){
        console.log(pokemon.name)
    }

    return {
        add: add,
        getAll: getAll,
        filterItem: filterItem,
        addListItem: addListItem
    };
})();



//this code is just for testing the typeof
pokemonRepository.add( {x: 'TANNAZ' , height: 1.6 , types: ['haha','hihi']})

pokemonRepository.add( {name: 'Vileplume' , height: 1.2 , types: ['GRASS','POISEN']})
console.log(pokemonRepository.filterItem('Crobat'))
console.log(pokemonRepository.getAll());




//printing the name and the height of the Pokemons

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon)
});












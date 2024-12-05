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

       return pokemonList.filter(pokemon => pokemon.name === name);
    }

    return {
        add: add,
        getAll: getAll,
        filterItem: filterItem
    };
})();

pokemonRepository.add( {x: 'TANNAZ' , height: 1.6 , types: ['haha','hihi']})
pokemonRepository.add( {name: 'Pishi' , height: 1.6 , types: ['haha','hihi']})
console.log(pokemonRepository.filterItem('Crobat'))
console.log(pokemonRepository.getAll());




//printing the name and the height of the Pokemons

pokemonRepository.getAll().forEach(function(pokemon){
    document.write("<p>" + `${pokemon.name} : ${pokemon.height}` + "</p>" )
});



/*for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        label = 'You are the biggest Pokemon!'
    }else{
        label=''
    }
    document.write("<p>" + `${pokemonList[i].name} (H:${pokemonList[i].height}) ${label}` + "</p>")
}*/










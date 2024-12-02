let pokemonList = [
    {name: 'Nidoqueen' , height:1.3 , types: ['GROUND', 'POISEN']},
    {name: 'Omanyte' , height:0.4 , types: ['WATER', 'ROCK']},
    {name: 'Weavile' , height:1.1 , types: ['DARK', 'ICE']},
    {name: 'Crobat' , height:1.8 , types: ['FLYING', 'POISEN']},
    {name: 'Pignite' , height:1.0 , types: ['FIRE', 'FIGHTING']}
];


//printing the name and the height of the Pokemons

for (let i = 0; i < pokemonList.length; i++) {
    document.write("<p>" + `${pokemonList[i].name} (H:${pokemonList[i].height})` + "</p>")
}



for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        label = 'You are the biggest Pokemon!'
    }else{
        label=''
    }
    document.write("<p>" + `${pokemonList[i].name} (H:${pokemonList[i].height}) ${label}` + "</p>")
}
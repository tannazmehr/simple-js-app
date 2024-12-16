/* eslint-disable no-undef */

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon)
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
    
    function showLoadingMessage() {
        let loadingMessage = document.createElement('div');
        loadingMessage.id = 'loading-message';
        loadingMessage.textContent = 'Loading, please wait...';
        document.body.appendChild(loadingMessage);
    }

    function hideLoadingMessage() {
        let loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            hideLoadingMessage();
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
            hideLoadingMessage();
          console.error(e);
        })
      }

    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
            }).then(function (details) {
                hideLoadingMessage();
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types ='';
                for(let i=0; i<details.types.length; i++){
                    pokemon.types += details.types[i].type.name + ' ';
                }               
            }).catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
     }

    function showDetails(pokemon){
    
        loadDetails(pokemon).then(function () {    
            let pokemonName = document.querySelector('#pokemonModalLabel');
            let pokemonHeight = document.querySelector('.pokemon-height');
            let pokemonTypes = document.querySelector('.pokemon-types');
            let pokemonImage = document.querySelector('.pokemon-image');
            pokemonName.innerText = pokemon.name;
            pokemonImage.src = pokemon.imageUrl;
            pokemonHeight.innerText = `Height: ${pokemon.height}`;
            pokemonTypes.innerText = `Powers: ${pokemon.types}`;

            const pokemonModal = document.getElementById('pokemonModal');
            const modal = new bootstrap.Modal(pokemonModal);
            modal.show();

        });

     }

    function addListItem(pokemon){
        let unorderedList = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn','btn-outline-info', 'pokemonButton');
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target','#pokemonModal');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        listItem.appendChild(button);
        unorderedList.appendChild(listItem);
    }
    return {
        add: add,
        getAll: getAll,
        filterItem: filterItem,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
     };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

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
            console.log(pokemon);
          });
        }).catch(function (e) {
            hideLoadingMessage();
          console.error(e);
        })
      }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
            }).then(function (details) {
                hideLoadingMessage();
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
     }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
        console.log(pokemon);
        });
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













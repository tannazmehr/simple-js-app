
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



    function showModal(title, text, type, image) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML ='';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = title;
    
        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = text;
    
        let pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = type;
    
        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('img-properties');
        pokemonImage.src = image;
    
    
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    
        function hideModal() {
          let modalContainer = document.querySelector('#modal-container');
          modalContainer.classList.remove('is-visible');
        }
    
        window.addEventListener('keydown', (e) => {
          let modalContainer = document.querySelector('#modal-container');
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });
    
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
    
    
    }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
        showModal(pokemon.name , 'Height:' + pokemon.height, 'Powers:'+ pokemon.types , pokemon.imageUrl);
        console.log(pokemon);
        });

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

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
            }).then(function (details) {
                hideLoadingMessage();
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types ='';
                for(let i=0; i<details.types.length; i++){
                    item.types += details.types[i].type.name + ' ';
                }               
            }).catch(function (e) {
                hideLoadingMessage();
                console.error(e);
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




















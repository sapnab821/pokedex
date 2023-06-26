let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector("#modal-container");


    let newModal = (function () {

        function showModal(names, height, image) {

            modalContainer.innerHTML = '';
            let modal = document.createElement('div');
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            let namesElement = document.createElement('h1');
            namesElement.innerText = names;

            let heightElement = document.createElement('p');
            heightElement.innerText = height;

            let imageElement = document.createElement('img');
            imageElement.setAttribute('src', image);



            modal.appendChild(closeButtonElement);
            modal.appendChild(namesElement);
            modal.appendChild(heightElement);
            modal.appendChild(imageElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');
        }

        function hideModal() {
            modalContainer.classList.remove('is-visible');
        }

        window.addEventListener('keydown', (e) => {
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

        document.querySelector('#modal-container').addEventListener('click', () => {
            showModal(names, height, image);
        });

        return {
            showModal
        }

    })()


    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }


    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.name = details.name;
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            item.image = details.sprites.front_default;

        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            newModal.showModal(item.name, 'height: ' + item.height, item.image);
        });
    }



    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


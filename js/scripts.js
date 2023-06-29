let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let newModal = (function () {


        function showModal(names, height, image) {
            let body = document.querySelector('.modal-body');
            let body2 = document.querySelector('.modal2');
            let body3 = document.querySelector('.modal3');

            let namesElement = document.createElement('h1');
            let newName = namesElement.innerText = names;

            let heightElement = document.createElement('h2');
            let newHeight = heightElement.innerText = height;


            let imageElement = document.createElement('img');
            imageElement.setAttribute('src', image);

            body.innerText = newName;
            body2.innerText = newHeight;
            body3.innerHTML = '';
            body3.appendChild(imageElement);

        }

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
        let pokemonList = document.querySelector('.list-group');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        listpokemon.classList.add('list-group-item');
        pokemonList.appendChild(listpokemon);
        listpokemon.appendChild(button);
        listpokemon.setAttribute('style', 'border: none');
        button.classList.add('btn');
        button.setAttribute('id', 'button-main');
        button.setAttribute('type', 'button')
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
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


let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bounsweet',
            height: 0.3,
            type: 'grass'
        },
        {
            name: 'Nosepass',
            height: 1.0,
            type: 'rock'
        },
        {
            name: 'Trevenant',
            height: 1.5,
            type: ['ghost', 'grass']
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(user) {
        let ul = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        console.log(button.innerText);
        button.innerText = user.name;
        console.log(button.innerText);
        button.classList.add('pokemon-name');
        listItem.appendChild(button);
        ul.appendChild(listItem);
        button.addEventListener('click', function(user) {
            showDetails(user);
        });
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };

})();

pokemonRepository.getAll().forEach(function(user) {
    pokemonRepository.addListItem(user);
});
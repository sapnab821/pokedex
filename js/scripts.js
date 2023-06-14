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

    return {
        getAll: getAll,
        add: add
    };

})();

/*for (let i=0; i< pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' is height ' + pokemonList[i].height+'m and type ' + pokemonList[i].type + '. ');
    if (pokemonList[i].height < 0.5) {
        document.write('Wow that is small! ');
    }
    document.write('\n');
    
} */

pokemonRepository.getAll().forEach(function(user) {
    document.write(user.name + ' is height ' + user.height + 'm and type ' + user.type + '. ');
    if (user.height < 0.5) {
        document.write('Wow that is small! ');
    }
    document.write('\n');

});
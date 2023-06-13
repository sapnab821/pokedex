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

for (let i=0; i< pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' is height ' + pokemonList[i].height+'m and type ' + pokemonList[i].type + '. ');
    if (pokemonList[i].height < 0.5) {
        document.write('Wow that is small! ');
    }
    document.write('\n');
    
}
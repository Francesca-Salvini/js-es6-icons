/*jshint esversion: 6 */
/*jshint esversion: 9 */

// ESERCIZIO 

// MILESTONE 1 
// Partendo dalla struttura dati, mostriamo in pagina tutte le icone disponibili come da layout


// MILESTONE 2 
// Coloriamo le icone per tipo


// MILESTONE 3
// Creiamo una select con i tipi di icone e usiamola per filtrare le icone


// Creo un array di oggetti. Ciascun oggetto rappresenta un'icona con diverse caratteristiche.
const icons = [
	{
		name: 'cat',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'crow',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dog',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dove',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dragon',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'horse',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'hippo',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'fish',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'carrot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'apple-alt',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'lemon',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'pepper-hot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'user-astronaut',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-graduate',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-ninja',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-secret',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	}
];

// Creo un array che contiene stringhe. Ogni stringa rappresenta un colore (da attribuire alle icone)
const color = [
    'blue',
    'orange',
    'purple'
];

// PER CHIAREZZA IMPORTO DALL'HTML IL TEMPLATE DI COME ANDRÀ COMPILATO IL DIV DELLA SINGOLA ICONA

/* <div class="icon">
    <i class="fas fa-cat"></i>
    <div>
        Nome icona
    </div>
</div> */


// DICHIARAZIONE COSTANTI
const iconsContainer = $('#icons-container');
const coloredArray = colorIcons(icons, color);
console.log(coloredArray); // verifico che il nuovo array contenente gli oggetti "icone" abbiano la proprietà color (corretta)
const selectEl = $('#type');
const iconsTypes = getIconsTypes(coloredArray);

// stampo l'array di oggetti "colorati" in base al tipo scelto dall'utente
printFilterOptions(iconsTypes, selectEl);
// stampo l'array di oggetti "colorati" all'interno del loro contenitore
printIcons(coloredArray, iconsContainer);

// con il cambio del type ( a discrezione dell'utente) cambia la categoria di icone visualizzabili
selectEl.change(function() {
    // leggere il tipo di icona scelta dall'utente
    const selectedType = selectEl.val();

    // ottenere un array di icone con solo quelle del tipo selezionato
    const filteredIcons = filterIconsByType(coloredArray, selectedType);

    console.log(filteredIcons);
    // stampare le icone

    printIcons(filteredIcons, iconsContainer);

});


// FUNZIONI

// 1
// Popola un container con le icone
//
// iconsArray --> array di oggetti. Ogni oggetto è un'icona
// container --> un oggetto jQuery che rappresenta l'elemento in cui stampare le icone
// return : void (undefined)
function printIcons(iconsArray, container) {
    
    // ogni volta cancella e riscrive, altrimenti sovrascrive i tipi di icons 
    container.html('');
    
    // forEach per scrivere le icone nel container
    iconsArray.forEach((element) => {

        // Destrutturiamo element per leggere le informazioni
        const {name, prefix, family, color} = element;
        // funzione per rendere un testo tutto maiuscolo/ alternativa: text-transform: uppercase; nel CSS
        const nameUpperCase = name.toUpperCase();

        // TEMPLATE LITERAL 
        const iconElementHTML = `
        <div class="icon">
            <i class="${family} ${prefix}${name}" style = "color: ${color}"></i>
            <div>
                ${nameUpperCase}
            </div>
        </div>
        `;

        container.append(iconElementHTML);
    });
}

// 2
// Crea un nuovo array di icone con anche i colori
//
// originalIconsArray --> Array di oggetti in cui ogni oggetto rappresenta un'icona
// colorsArray --> Array di stringhe in cui ogni stringa rappresenta un colore css
// return :  Array di oggetti in cui ogni oggetto rappresenta un'icona con anche i colori
function colorIcons(originalIconsArray, colorsArray) {
    const iconTypes = getIconsTypes(originalIconsArray);
    // console.log(iconTypes);

    // per creare un nuovo array da quello originale uso map()
    const iconsWithColors = icons.map((element) => {
        
        // creo una copia del'array di oggetti originale
        const newIconObj = {
            ...element
        };

        // prendiamo l'indice del tipo dall'array dei tipi 
        const iconTypeIndex = iconTypes.indexOf(newIconObj.type);
        console.log(newIconObj.type + ' - ' + iconTypeIndex);

        // il colore del nuovo oggetto sarà quello con lo stesso indice del tipo
        if(iconTypeIndex != -1) {
            newIconObj.color = colorsArray[iconTypeIndex];
        }
        
        // console.log(newIconObj);
        return newIconObj;
    });

    
    // console.log(iconsWithColors);
    return iconsWithColors;
}

// 3
// Crea un array con i tipi di icone
//
// iconsArray --> Array di oggetti in cui ogni oggetto rappresenta un'icona
// return : Array di stringhe, ogni stringa è un tipo di icona senza duplicati
function getIconsTypes(iconsArray) {

    const typesArray = [];

    iconsArray.forEach((element) => {
        const elementType = element.type;

        if(!typesArray.includes(elementType)) {
            typesArray.push(elementType);
        }

    });

    return typesArray;
    
}

// 4
// Popola la select per filtrare le icone
//
// iconTypesArray --> Array di stringhe, ogni stringa è un tipo di icona
// selectElement --> Oggetto jQuery che rappresenti la select a cui aggiungere le options
// return : void(undefined)
function printFilterOptions(iconTypesArray , selectElement ) {

    iconTypesArray.forEach((element) => {
        const newOption = `
        <option value = "${element}">${element}</option>
        `;

        selectElement.append(newOption);
    });
}

// 5
//Filtra le icone per tipo

// iconsArray --> Array di oggetti in cui ogni oggetto rappresenta un'icona
// type --> una stringa che rappresenta il tipo di icona da filtrare
// return : Array di oggetti in cui ogni oggetto rappresenta un'icona filtrato per tipo
function filterIconsByType(iconsArray, type) {

    if(type.length == 0) {

        return iconsArray;

    } 

    const filteredArray = iconsArray.filter((element) => {

        return element.type == type;
    });

    return filteredArray;
}
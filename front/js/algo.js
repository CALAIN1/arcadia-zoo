/* VARIABLES */
//Créer une variable compteur et lui affecter la valeur 20
let compteur = 20;
console.log(compteur);



//Additionner au 20 compteur 
compteur += 20;

//Combien vaut compteur ?
console.log(compteur)
40

//Si on fait
compteur *= 2;
console.log(compteur * 2);
//On obtient :
160

//Puis si on fait

console.log(compteur * 10);
//On obtient :
800

//Multiplier compteur par 2
compteur *= 2;
160




/* CONDITIONS */
//Ecrire le code : Si compteur est supérieur ou égal à 20
//Diviser compteur par 2
if (compteur >= 20) {
    compteur /= 2;
}

//Combien vaut compteur ?

//Ecrire le code : Si compteur vaut 60, affecter 100 au compteur
//Sinon affecter 60 au compteur
if (compteur == 60) {
    compteur = 100;
}
else {
    compteur = 60;
}

/* BOUCLES */
//Faire une boucle Tant que compteur < 200 : multiplier compteur par 2
while (compteur < 200) {
    compteur *= 2;
}

//Faire une boucle qui compte de 0 à 9 et qui divise compteur par 10 à chaque fois
for (let i = 0; i < 10; i++) {
    compteur /= 10;
}


const maxValue = max(4, 10, 95);

function max(a, b, c) {
    if (a > b && a > c) {
        return a;
    }

    if (b > c && b > a) {
        return b;
    }
    else {
        return c;
    }
}

//clamp : Prends en paramètre min, max, value
//Si value < min, renvoyer min
//Si value > max, renvoyer max
//Sinon renvoyer value
function clamp(min, max, value) {
    if (value < min) {
        return min;
    }
    else if (value > min) {
        return max;
    }
    else {
        return value;

    }
}

//f(x) = 3x + 4
function f(x) {
    return 3 * x + 4;
}

//isBetween : Prends en paramètre min, max, value
//Renvoie true / false si value est entre min et max
//Une seule ligne, utiliser la fonction clamp
function isBetween(min, max, value) {
    return clamp(min, max, value) == value;
}


let array = [50, 65, 879, 0, 45];

//Récupérer le premier élément du tableau
console.log(array[0]);

let total = 0;
//Itérer sur les éléments avec un for
for (let i = 0; i < array.length; i++) {
    total += array[i];
}

console.log("La somme des valeurs du tableau est", total);

//Faire une fonction mean qui prends en paramètre un tableau et qui renvoie la moyenne des valeurs du tableau

function mean(table) {
    let total = 0;
    for (let i = 0; i < table.length; i++) {
        total += table[i];
    }
    return total / table.length;
}


//Faire une fonction contains qui prends en paramètre un tableau et un nombre et qui renvoie true si le nombre est présent dans le tableau



//Faire une fonction merge qui prends en paramètre deux tableaux et qui ajoute au premier tableau le contenu du 2e tableau


//BONUS (ChatGPT -> tri à bulles)
//Faire une fonction sortArray qui prends en paramètre un tableau et qui trie le tableau



//Faire une fonction isPalindrome qui prends en paramètre un texte et qui renvoie true / false si le mot est un palindrome


//Faire une fonction count qui prends en paramètre un texte et une lettre et qui renvoie le nombre de fois que cette lettre apparait dans le texte


//Faire une fonction cutWordsOfSize qui prends en paramètre un texte et un nombre et qui renvoie un tableau qui contient la liste des mots ayant un nombre de lettre égal au nombre


// con la DOM Manipulation potremo alterare il contenuto di una pagina pre-caricata
// potremo INSERIRE / MODIFICARE / ELIMINARE qualsiasi cosa renderizzata al suo interno

// il processo si compone di DUE FASI:
// 1) SELEZIONE dei nostri elementi (DOM Traversing)
// 2) MANIPOLAZIONE degli elementi per stile o esistenza (DOM Manipulation)

// FASE 1 - vado a selezionare i miei elementi

// per SELEZIONARE faremo SEMPRE riferimento al nostro document
// document è un oggetto già disponibile per essere utilizzato nel nostro DOM
// rappresenta l'intera pagina o l'html

console.dir(document);
console.dir(document.body); // con console.dir possiamo ispezionare le vere proprietà del nodo (oggetto)

// tutti i metodi che useremo per la selezione dovranno essere applicati al nostro document o ad un altro nodo

// 1) Selezione tramite id
const menu = document.getElementById("main-menu"); // questo metodo chiede una stringa corrispondente all'id sull'elemento e
//  ritorna o un HTMLElement oppure null
console.log("menu", menu); // così visualizziamo l'elemento con tag html connesso direttamente alla nostra pagina
console.dir(menu); // così visualizziamo le proprietà del nodo (object)

// 2) Selezione tramite classi
const allMenuItems = document.getElementsByClassName("menu-items"); // ritorna HTMLCollection[]
console.log(allMenuItems);
// HTMLCollection è un simil-array e va pertanto attraversato grazie ad un ciclo for

for (let i = 0; i < allMenuItems.length; i++) {
  const li = allMenuItems[i];
  console.log("list item", li);
}
// questo metodo ci serve per ottenere più elementi, se presenti.
// anche nel caso in cui avessimo una sola classe utilizzata nel documento otterremo SEMPRE una collezione di elementi con un singolo elemento all'interno
const allFooterClasses = document.getElementsByClassName("my-footer");
console.log(allFooterClasses); // legge la collezione di elementi (simil-array) che in questo caso contiene un singolo elemento
console.log(allFooterClasses[0]); // lette l'elemento che ERA CONTENUTO all'interno dell'array, quindi è già un nodo (object)

const singleFooter = allFooterClasses[0]; // l'operazione di selezione di un indice tramite [0] ci restituisce l'elemento che era contenuto in quella posizione
console.log(singleFooter); // la variabile contiene il singolo nodo del footer già precedentemente estratto dall'array

// 3) Selezione per tag name
const allTheH1s = document.getElementsByTagName("h1");
// HTMLCollection con solo un elemento, in questo caso <h1> all'interno
console.log("collezione h1", allTheH1s);

const h1 = allTheH1s[0];
console.log("h1", typeof h1); // object

const allTheArticles = document.getElementsByTagName("article");
console.log("tutti gli article", allTheArticles); // collezione di nodi di article

const firstArticle = allTheArticles[0];
console.log("primo articolo", firstArticle);

const lastArticle = allTheArticles[allTheArticles.length - 1];
console.log("ultimo articolo", lastArticle);

for (let i = 0; i < allTheArticles.length; i++) {
  const article = allTheArticles[i]; // così stiamo selezionando via via ogni article contenuto nella collezione allTheArticles
  console.log("article node", article); // questo è il nodo di ogni article presente nella pagina
  console.log("article h3 node", article.children[0]); // il nodo del primo figlio di article, ovvero h3
}

const allPs = document.getElementsByTagName("p"); // HTMLCollection[]
console.log("tutti i p", allPs);
// forEach non esiste sulle HTMLCollection
// dovrà quindi essere convertita (l'HTMLCollection) in un VERO array

// const allPsArr = Array.from(allPs); // converto HTMLCollection[] in Array
// allPsArr.forEach(p => console.log(p)); // uso il vero array per ciclarlo col forEach

Array.from(allPs).forEach(p => console.log(p)); // uguale all'operazione precedente

// converto article per ciclare gli articoli questa volta con un forEach
Array.from(allTheArticles).forEach(article => {
  console.log("article node forEach", article); // questo è il nodo di ogni article presente nella pagina
  console.log("article h3 node forEach", article.children[0]);
});

// 4) selezione di singolo elemento tramite querySelector
// questo metodo fa largo uso di selettori CSS (anche avanzati!)
// dobbiamo ricordarci di usare quindi i simboli per id (#) e classi (.)
// con querySelector, se cerchiamo un elemento tramite una classe, ci verrà tornato solo IL PRIMO trovato
// se volessimo più di un elemento con la stessa classe useremo il metodo successivo 👇

const menuItem = document.querySelector(".menu-items"); // torna il primo elemento li con class menu-items
console.log("primo menu item", menuItem);

const mainMenu = document.querySelector("#main-menu"); // !! DA EVITARE di usare un querySelector per selezionare un singolo id,
// per quello sarebbe meglio usare getElementById in questo caso, perché più efficiente
console.log(mainMenu);

// un query selector trova la sua perfetta applicazione in combinazione con selettori CSS avanzati. TUTTI i selettori che funzionano in CSS funzionano qui
const menuItem2 = document.querySelector("#main-menu li:nth-of-type(2)"); // ritorna sempre il primo elemento sfruttando un selettore css più avanzato
console.log("secondo li tramite selettore CSS avanzato", menuItem2);

const lastArticleWithSelector = document.querySelector("article:last-of-type");
console.log("last article with CSS selector", lastArticleWithSelector);

// 5) selezione di elementi multipli tramite querySelectorAll
// ritorna una nodeList con i nodi selezionati all'interno, la quale accetta un metodo forEach ma non un map
// qual'ora vi servissero metodi degli array più avanzati, occorre operare la conversione con Array.from() come visto prima.
const allArticlesWithSelector = document.querySelectorAll("article:nth-of-type(odd)"); // ritorna una nodeList
console.log(allArticlesWithSelector);

allArticlesWithSelector.forEach(article => console.log(article));

const footerUl = document.querySelector("footer ul");
console.log(footerUl);

// per risalire i nodi verso l'alto ci sono due metodi:
// parentElement
// .closest()

// menu è la ul con id main-menu
const nav = menu.parentElement; // il nav che contiene la ul
const header = menu.parentElement.parentElement; // header che contiene nav che contiene ul
const body = menu.parentElement.parentElement.parentElement; // questo è body che contiene tutto :D

const headerAlt = menu.closest("header"); // closest taglia tutti i passaggi e va a cercare verso l'esterno un elemento che corrisponda al selettore css passatogli
// header è la selezione che faremmo di un tag dal css, se stessimo cercando un genitore con una qualche classe useremmo il puntino: es. .closest(".container")

// ELIMINAZIONE (definitiva!) di un elemento del DOM

// header.remove(); // su un qualsiasi nodo possiamo eseguire il metodo remove, questo lo rimuoverà definitivamente dalla pagina

// MANIPOLAZIONE DEGLI ELEMENTI DEL DOM
console.dir(h1);

// h1.innerHTML = `<u>Hello Epicoders!</u>`; // interpreta la stringa e quindi eventuali tag all'interno

// cambiare il contenuto di un elemento, il suo testo
h1.innerText = "Hello Epicoders!"; // cambia solo il testo di un elemento

Array.from(allPs).forEach(p => (p.innerText = "ciao belli!"));

// cambiare lo stile ad un elemento precedentemente selezionato
// applicazione di stile diretto tramite attributo style

// metodo 1
// h1.style.backgroundColor = "blue";
// h1.style.color = "white";

// metodo 2
h1.style = "background-color: blue; color: white;";

console.dir(menu);

// APPLICAZIONE DI CLASSI
// metodo di applicazione di classi da usare solo in caso di creazione di nuovi elementi
// menu.className = "blackBgAndRedBorder"; // attenzione che sovrascrive l'intera classe, se presenti elementi precedenti verranno persi

// metodo di applicazione di classi da poter usare sempre
menu.classList.add("blackBgAndRedBorder", "classToRemove"); // inserirà "gentilmente" una nuova classe, preservando le esistenti

menu.classList.remove("classToRemove");

// CREAZIONE DI NUOVI ELEMENTI
const createLi = function (text) {
  const articleUl = document.querySelector("article ul");
  //   console.log(articleUl);

  // creare un nuovo elemento html
  const newLi = document.createElement("li"); // questo restituisce un vero nodo del tipo specificato, in questo caso un <li>
  newLi.innerText = text;
  newLi.className = "newClass";

  // inserimento di un elemento in un altro elemento (contenitore)
  articleUl.appendChild(newLi); // appendChild richiede un nodo, deve essergli fornito come argomento
  // da questo punto il nostro newLi esisterà nella pagina!
  // console.log(newLi);
};

createLi("element-7");
createLi("element-8");
createLi("element-9");
createLi("element-10");

// CREANDO FUNZIONI le operazioni verranno effettuate solo all'esecuzione della funzione stessa,
// se mancherà niente di quello che abbiamo definito nella funzione verrà applicato

const createNewImg = function () {
  const newImg = document.createElement("img");
  console.dir(newImg);

  // applicazione di valori come attributo
  // modalità 1: sovrascrittura della proprietà del nodo
  // sovrascrivere src applicherà un attributo src sul tag appena creato
  newImg.src =
    "https://images.unsplash.com/photo-1696593488550-d740f3396611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  // modalità 2: tramite metodo dedicato
  newImg.setAttribute("alt", "forest image"); // questo funziona anche con attributi custom

  document.body.appendChild(newImg);
};

// createNewImg() // possiamo chiamarla qui o dalla console del browser

const readAttributeFromAnchor = function () {
  const myAnchor = document.getElementById("footer-link");

  //   alert(myAnchor.href);
  alert(myAnchor.getAttribute("href"));
};
// readAttributeFromAnchor()

const changeMainImage = function () {
  const mainImage = document.querySelector("main img");
  mainImage.src =
    "https://images.unsplash.com/photo-1443632864897-14973fa006cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
};

// questa funzione non verrà chiamata immediatamente, ma verrà passata come referenza all'onclick del bottone sottostante

const changeImgBtn = document.getElementById("change-img-btn");
changeImgBtn.onclick = changeMainImage; // stiamo applicando la referenza di una funzione che il browser chiamerà se il bottone riceve un click
// DA NON FARE ASSOLUTAMENTE
// changeImgBtn.onclick = changeMainImage(); // VIETATO!!!! in questo caso la funzione non aspetta il click per partire, parte immediatamente
console.dir(changeImgBtn);

// prendo tutti gli h3 di articoli
const H3s = document.querySelectorAll("article h3");

// per ogni h3 contenuto nell'array...
H3s.forEach(h3 => {
  // ricevo il nodo h3 dal parametro
  // e assegno una funzione associata all'evento click sull'h3
  h3.onclick = function () {
    // solo quando un h3 viene cliccato si eseguirà questa funzione
    // che colorerà l'h3 specifico che ha ricevuto il click
    h3.style.color = "red"; // h3 in questo caso rappresenta UNO SPECIFICO h3 contenuto nella lista H3s
  };
});

// qui stiamo applicando una funzione all'evento click di menu
menu.onclick = function () {
  // ad ogni click andiamo a raccogliere gli elementi dal DOM con classe .menu-items, ovviamente saranno di meno dopo ogni click
  const menuItems = document.querySelectorAll(".menu-items");
  const lastMenuItem = menuItems[menuItems.length - 1]; // prendiamo l'ultimo
  lastMenuItem.remove(); // ed eliminiamo l'ultimo (ad ogni click)
};

// main.js

import * as util from "./utils.js";

const lib = new util.Library();

const idI = document.getElementById("id");
const titleI = document.getElementById("title");
const authorI = document.getElementById("author");
const copiesI = document.getElementById("copies");

const create = document.getElementById("create");
const result = document.getElementById("result");
const show = document.getElementById("show");


create.addEventListener("click", () => {

  const id = idI.value;
  const title = titleI.value;
  const author = authorI.value;
  const copies = parseInt(copiesI.value, 10);

  if (!id || !title || !author || Number.isNaN(copies)) {
    result.innerHTML = "<br>⚠️ Please fill ID, Title, Author, and Copies (number).";
    return;
  };

  const book = new util.Book(id, title, author, copies);
  lib.addBook(book);

});

show.addEventListener("click", () => {

  const lines = lib.listBooks();
  result.innerHTML = `<strong>Books:</strong><br>${lines.join("<br>")}`;

})



/*
const book1 = new Book(1, "Skyyyy", Sia, 50);
const book2 = new Book(2, "PC", 2000, 1);
const book3 = new Book(432, "Monitor", 740, 3);
const pro4 = new Book(775, "Keyboard", 280, 6);




const cart = new Cart();
cart.addProduct(pro1);
cart.addProduct(pro2);
cart.addProduct(pro3);
cart.addProduct(pro4);

console.log("cart.list() : ", cart.list())
console.log("cart.total() : ", cart.total());

//console.log("cart.list().forEach(p => console.log(p.getInfo())); : ")
//cart.list().forEach(p => console.log(p.getInfo()));

console.log("cart.updateQuantity(id, newQty) : ", cart.updateQuantity(775, 5))
console.log("cart.list() : ", cart.list());


console.log("cart.remove(id) : ", cart.remove(775))
console.log("cart.list() : ", cart.list());


console.log("applyDiscount(id, percentage) : ", cart.applyDiscount(2, 20))
console.log("cart.list() : ", cart.list());
console.log("cart.total() : ", cart.total());


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

const eBook = new DigitalProduct(111, "Ebook", 65, 1024);
cart.addProduct(eBook);


console.log("cart.list() : ", cart.list());
console.log("cart.total() : ", cart.total());
*/
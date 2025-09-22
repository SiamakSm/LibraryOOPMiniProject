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
  result.innerHTML = `<br><br><br><strong>Books:</strong><br>${lines.join("<br>")}`;
})




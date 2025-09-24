// main.js

import * as util from "./utils.js";

const lib = new util.Library();
lib.loadStorage();

const typeInput = document.getElementById("typeInput");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const copiesInput = document.getElementById("copiesInput");
const filesizeInput = document.getElementById("filesizeInput");

const createBtn = document.getElementById("createBtn");
const showBtn = document.getElementById("showBtn");
const result = document.getElementById("result");
const filesizeLabel = document.getElementById("filesize-label");
const copiesLabel = document.getElementById("copies-label");

const borrowBtn = document.getElementById("borrowBtn");
const returnBtn = document.getElementById("returnBtn");
const borrowIdInput = document.getElementById("borrowIdInput");
const returnIdInput = document.getElementById("returnIdInput");

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


typeInput.addEventListener("change", (e) => {
  const value = e.target.value;
  copiesLabel.classList.toggle("hidden", value !== "book");
  filesizeLabel.classList.toggle("hidden", value !== "ebook");
});


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


createBtn.addEventListener("click", () => {

  const type = typeInput.value;
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    result.textContent = "⚠️ Please fill Title and Author.";
    return;
  };

  const copiesOrSize = parseInt((type === "book" ? copiesInput.value : filesizeInput.value), 10);
  if (Number.isNaN(copiesOrSize) || copiesOrSize < 0) {
    result.textContent = (type === "book") ? "⚠️ Copies must be a non-negative number." : "⚠️ File size (MB) must be a positive number.";
    return;
  };

  const book = bookFactory(null, type, title, author, copiesOrSize);
  const res = lib.addBook(book);
  result.textContent = res?.msg ?? "Added.";


  titleInput.value = "";
  authorInput.value = "";
  copiesInput.value = "";
  filesizeInput.value = "";

});


showBtn.addEventListener("click", () => {
  const lines = lib.listBooks();
  let ul = document.createElement("ul");
  lines.forEach(function (line) {
    let li = document.createElement("li");
    if (line.type === "book") {
      li.textContent = `${line.id}. The Book ${line.title} , written by ${line.author},  has ${line.copies} copies !`;
    } else {
      li.textContent = `${line.id}. The Ebook ${line.title} , recorded by ${line.author},  has ${line.fileSizeMB} MB size !`;
    };
    ul.appendChild(li);
  });
  result.innerHTML = "";
  result.appendChild(ul);
});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


borrowBtn.addEventListener("click", function () {
  result.innerHTML = "";
  const borrowId = parseInt(borrowIdInput.value, 10);

  if (Number.isNaN(borrowId)) {
    result.textContent = "⚠️ Enter a valid numeric ID.";
    return;
  };

  const res = lib.borrowById(borrowId);
  result.innerHTML = res.msg;

});



returnBtn.addEventListener("click", function () {
  result.innerHTML = "";
  const returnId = parseInt(returnIdInput.value, 10);

  if (Number.isNaN(returnId)) {
    result.textContent = "⚠️ Enter a valid numeric ID.";
    return;
  };

  const res = lib.returnById(returnId);
  result.innerHTML = res.msg;

});


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


function bookFactory(id, type, title, author, copiesOrSize) {
  if (type === "book") return new util.Book(id, title, author, copiesOrSize);
  if (type === "ebook") return new util.EBook(id, title, author, copiesOrSize);
  throw new Error("Unknown type: " + type);
};



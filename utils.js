// utils.js

export class Book {
  constructor(id, title, author, copies) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.copies = copies;
  };

  getInfo() {
    return `${this.title} - ${this.author} - x${this.copies}`;
  };

  borrowOne(title) {
    return this.title;
  };

  returnOne(title) {
    return this.title;
  };

}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export class EBook extends Book {
  constructor(id, title, author, fileSizeMB) {
    super(id, title, author, 1);
    this.fileSizeMB = fileSizeMB;
  };

  overrideInfo() {
    return this.title;
  };
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export class Library {
  constructor() {
    this.items = [];
  };

  addBook(book) {
    this.items.push(book);
    this.saveStorage();
  };

  saveStorage() {
    localStorage.setItem("library", JSON.stringify(this.items));
  };

  loadStorage() {
    const raw = localStorage.getItem("library");
    if (raw) {
      const arr = JSON.parse(raw);
      this.items = arr.map(obj => new Book(obj.id, obj.title, obj.author, obj.copies))
    };
  };

  listBooks() {
    this.loadStorage();
    return this.items.map(b => b.getInfo());
  };

  findByTitle(title) {
    return this.items[title];
  };

  borrowById(id) {
    return this.items[id];
  };

  returnByTitle(title) {
    return this.items[id];
  };

  totalPhysical() {
    //let total = this.items.filter(p => p.id !== id);
    return total;
  };

}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

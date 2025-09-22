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
  };

  listBooks() {
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

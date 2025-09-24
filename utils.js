// utils.js

class LibraryItem {
  constructor(id, title, author) {
    if (new.target === LibraryItem) {
      throw new Error("Cannot instantiate abstract class LibraryItem directly");
    };
    this.id = id ?? null;
    this.title = title;
    this.author = author;
  };

  borrowOne() {
    throw new Error("borrowOne() must be implemented in subclass");
  };

  returnOne() {
    throw new Error("returnOne() must be implemented in subclass");
  };
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export class Book extends LibraryItem {
  constructor(id, title, author, copies) {
    super(id, title, author);
    this.type = "book";
    this.copies = copies;
  };

  borrowOne() {
    if (this.copies > 0) { this.copies -= 1; return true; }
    return false;
  };

  returnOne() {
    this.copies += 1;
    return this.copies;
  };
};


export class EBook extends LibraryItem {
  constructor(id, title, author, fileSizeMB) {
    super(id, title, author);
    this.type = "ebook";
    this.fileSizeMB = fileSizeMB;
  };

  borrowOne() {
    return true;
  };

  returnOne() {
    return Infinity;
  };
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

export class Library {
  #items = [];
  #nextId = 1;

  generateId() {
    return this.#nextId++;
  };

  addBook(book) {
    if (!(book instanceof LibraryItem)) {
      return { ok: false, msg: "Only LibraryItem instances can be added." };
    };

    if (!book.id) book.id = this.generateId();
    this.#items.push(book);
    this.saveStorage();
    return { ok: true, msg: `Added [${book.id}] ${book.title}` };
  };

  saveStorage() {
    localStorage.setItem("library", JSON.stringify({
      items: this.#items,
      nextId: this.#nextId
    }));
    return { ok: true, msg: `Saved to Storage!` };
  };

  loadStorage() {
    const raw = localStorage.getItem("library");
    if (raw) {
      const arr = JSON.parse(raw);
      this.#nextId = arr.nextId || 1;
      this.#items = arr.items.map(obj => {
        return (obj.type === "ebook")
          ? new EBook(obj.id, obj.title, obj.author, obj.fileSizeMB)
          : new Book(obj.id, obj.title, obj.author, obj.copies)
      });
    };
  };

  listBooks() {
    this.loadStorage();
    return this.#items;
  };

  findById(id) {
    this.loadStorage();
    return this.#items.find(b => b.id === (Number(id)));
  };

  borrowById(id) {
    const res = this.findById(id);
    if (!res) return { ok: false, msg: `Not found with : "${id}"` };

    const ok = res.borrowOne();
    if (!ok) {
      return { ok: false, msg: `No more copies for "${res.title}"` };
    }

    if (res.type === "book") this.saveStorage();

    return {
      ok: true,
      msg: res.type === "book"
        ? `Borrowed (Book): ${res.title} — left: ${res.copies}`
        : `Borrowed (EBook): ${res.title} — unlimited`
    };
  };

  returnById(id) {
    const res = this.findById(id);
    if (!res) return { ok: false, msg: `Not found with : "${id}"` };

    const val = res.returnOne();
    if (res.type === "book") {
      this.saveStorage();
      return { ok: true, msg: `Returned (Book): ${res.title} — copies: ${val}` };
    }
    return { ok: false, msg: `Return not needed for Ebooks.` };
  };
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

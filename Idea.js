class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title.value;
    this.body = body.value;
    this.starred = false;
  }

  update() {
    this.starred = true;
  }
}
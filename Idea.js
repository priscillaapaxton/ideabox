class Idea {
  constructor (titleInput, bodyInput) {
    this.id = Date.now();
    this.title = titleInput;
    this.body = bodyInput;
    this.starred = false;
  }

  updateIdea () {
    if (this.starred === true) {
      this.starred = false;
    } else {
      this.starred = true;
    }
  }


}
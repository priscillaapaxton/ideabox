class Idea {
  constructor (titleInput, bodyInput) {
    this.id = Date.now();
    this.title = titleInput;
    this.body = bodyInput;
    this.starred = false;
  }

  updateIdea () {
    if (this.starred) {
      this.starred = false;
    } else {
      this.starred = true;
    }
  }

  deleteThis(ideaId) {
    if (ideaId === this.id) {
        savedIdeas.splice([savedIdeas.indexOf(this)],1)
      }
    event.target.closest('section').remove();
  }
}
// ***** Query Selectors *****
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var savedIdeasSection = document.querySelector('#saved-ideas')

// ***** Data Model ********
var savedIdeas = [];
var pineapple = "pineapple"
var newIdea;

// ***** Event Listeners *******
saveButton.addEventListener('click', saveIdea);

// ***** Event Handlers *******
function saveIdea(event) {
  event.preventDefault()
  newIdea = new Idea(titleInput.value, bodyInput.value)
  savedIdeas.push(newIdea)
  savedIdeasSection.innerHTML += `
    <div class="saved-idea-box">
      <header class="saved-idea-box header">
        <img id="star" class="header-img" src="assets/star.svg"/>
        <img id="x" class="header-img"src="assets/delete.svg"/>
      </header>
      <div class="saved-idea-box body">
        <h1 id="idea-title">${titleInput.value}</h1>
        <p id="idea-body-text">${bodyInput.value}</p>
      </div>   
      <footer class="saved-idea-box footer">
       <img id="comment-img" src="assets/comment.svg"/>
        <p id="comment">Comment</p>
      </footer>
    </div>
  `
}
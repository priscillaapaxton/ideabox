// ***** Query Selectors *****
var titleInput = document.querySelector('#inputTitle');
var bodyInput = document.querySelector('#inputBody');
var saveButton = document.querySelector('#buttonSave');
var savedIdeasSection = document.querySelector('#savedIdeasCards')


// ***** Data Model ********
var savedIdeas = [];
var newIdea;

// ***** Event Listeners *******
saveButton.addEventListener('click', saveIdea);
titleInput.addEventListener('input', buttonChange)
bodyInput.addEventListener('input', buttonChange)

// ***** Event Handlers *******
saveButton.disabled = true;

function buttonChange (event) {
  event.preventDefault()
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveButton.style.background = '#1F1F3D'
    saveButton.classList.add('cursor');
  }
}

function emptyInputs() {
  titleInput.value = "";
  bodyInput.value = "";
}


function saveIdea(event) {
  event.preventDefault()
  newIdea = new Idea(titleInput.value, bodyInput.value)
  savedIdeas.push(newIdea)
  savedIdeasSection.innerHTML += `
    <div class="saved-idea-box">
      <header class="saved-idea-box header">
        <img id="star" class="header-img cursor" src="assets/star.svg"/>
        <img id="x" class="header-img cursor" src="assets/delete.svg"/>
      </header>
      <div class="saved-idea-box body">
        <h1 class="idea-title">${titleInput.value}</h1>
        <p class="idea-body-text">${bodyInput.value}</p>
      </div>   
      <footer class="saved-idea-box footer">
       <img class="comment-img" src="assets/comment.svg"/>
        <p class="comment">Comment</p>
      </footer>
    </div>
  `
  emptyInputs()
  saveButton.disabled = true;
  saveButton.classList.remove('cursor')
  saveButton.style.background = '#353567'
}

savedIdeasSection.addEventListener('click', removeCard)
savedIdeasSection.addEventListener('click', starChanged)

function starChanged() {
  if (event.target.id === 'star') {
    event.target.parentNode.innerHTML += `
    <img src="./assets/star-active.svg">
    
    `
  }
}

function removeCard() {
   console.log("getting closer")
  if (event.target.id === 'x') {
    console.log("hello")
    event.target.parentNode.parentNode.remove();
  }
}
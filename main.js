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
    <section id="${newIdea.id}" class="saved-idea-box">
      <header class="saved-idea-box header">
        <img id="star" class="header-img cursor" src="assets/star.svg"/>
        <img id="x" class="header-img cursor" src="assets/delete.svg"/>
      </header>
      <div class="saved-idea-box body">
        <h1 class="idea-title">${newIdea.title}</h1>
        <p class="idea-body-text">${newIdea.body}</p>
      </div>   
      <footer class="saved-idea-box footer">
       <img class="comment-img" src="assets/comment.svg"/>
        <p class="comment">Comment</p>
      </footer>
    </section>
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
    event.target.parentNode.innerHTML = `
    <img src="./assets/star-active.svg">
    <img id="x" class="header-img cursor" src="assets/delete.svg"/>
    `
  }
}

function removeCard(event) {
   console.log("getting closer")
   var ideaId = parseInt(event.target.closest('section').id)
  if (event.target.id === 'x') {
    console.log(event.target.value)
    for (var i = 0; i < savedIdeas.length; i++) {
      if (savedIdeas[i].id === ideaId) {
        savedIdeas.splice(i,1)
      }
    }
    event.target.parentNode.parentNode.remove();
  }
}

// 
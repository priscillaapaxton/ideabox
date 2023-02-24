// ***** Query Selectors *****
var titleInput = document.querySelector('#inputTitle');
var bodyInput = document.querySelector('#inputBody');
var saveButton = document.querySelector('#buttonSave');
var savedIdeasSection = document.querySelector('#savedIdeasCards');

// ***** Data Model ********
var savedIdeas = [];
var newIdea;

// ***** Event Listeners *******
saveButton.addEventListener('click', saveIdea);
titleInput.addEventListener('input', buttonChange);
bodyInput.addEventListener('input', buttonChange);
savedIdeasSection.addEventListener('click', deleteIdea);
savedIdeasSection.addEventListener('click', starIdea);

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
    <section id=${newIdea.id} class="saved-idea-box">
      <header class="saved-idea-box header">
        <img id="star" class="header-img cursor" src="assets/star.svg"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg"/>
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

function deleteIdea (event) {
  var ideaId = parseInt(event.target.closest('section').id)

  if (event.target.id === 'x') {
    for (var i = 0; i < savedIdeas.length; i++) {
      if (ideaId === savedIdeas[i].id) {
        savedIdeas.splice(i,1)
      }
    }
    event.target.closest('section').remove();
  }
}

function starIdea (event) {
  var ideaId = parseInt(event.target.closest('section').id)

  if (event.target.id === 'star') {
    event.target.parentNode.innerHTML = `
    <img id="activeStar" class="header-img cursor" src="assets/star-active.svg"/>
    <img id="x" class="header-img cursor"src="assets/delete.svg"/>
    `
      
    for (var i = 0; i < savedIdeas.length; i++) {
      if (ideaId === savedIdeas[i].id) {
        savedIdeas[i].updateIdea()
      }
    }
  } else if (event.target.id === 'activeStar') {
    event.target.parentNode.innerHTML = `
    <img id="star" class="header-img cursor" src="assets/star.svg"/>
    <img id="x" class="header-img cursor"src="assets/delete.svg"/>
    `
    
    for (var i = 0; i < savedIdeas.length; i++) {
      if (ideaId === savedIdeas[i].id) {
        savedIdeas[i].updateIdea()
      }
    }
  }
}
// ***** Query Selectors *****
var titleInput = document.querySelector('#inputTitle');
var bodyInput = document.querySelector('#inputBody');
var saveButton = document.querySelector('#buttonSave');
var savedIdeasSection = document.querySelector('#savedIdeasCards');
var showStarredButton = document.querySelector('#showStarredButton');
var searchInput = document.querySelector('#inputSearch');

// ***** Data Model ********
var savedIdeas = [];
var newIdea;

// ***** Event Listeners *******
saveButton.addEventListener('click', saveIdea);
titleInput.addEventListener('input', buttonChange);
bodyInput.addEventListener('input', buttonChange);
savedIdeasSection.addEventListener('click', deleteIdea);
savedIdeasSection.addEventListener('click', starIdea);
showStarredButton.addEventListener('click', showStarred);
searchInput.addEventListener('input', filterSavedIdeas);

// ***** Event Handlers *******
saveButton.disabled = true;
showStarredButton.disabled = true;

function buttonChange (event) {
  event.preventDefault();
  if (titleInput.value && bodyInput.value) {
    saveButton.disabled = false;
    saveButton.style.background = '#1F1F3D';
    saveButton.classList.add('cursor');
  }
}

function emptyInputs() {
  titleInput.value = '';
  bodyInput.value = '';
}

function saveIdea(event) {
  event.preventDefault();
  newIdea = new Idea(titleInput.value, bodyInput.value);
  savedIdeas.push(newIdea);
  savedIdeasSection.innerHTML += `
    <section id=${newIdea.id} class="saved-idea-box">
      <header class="saved-idea-box header">
        <img id="star" class="header-img cursor" src="assets/star.svg" alt="star icon"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg" alt="delete icon"/>
      </header>
      <div class="saved-idea-box body">
        <h1 class="idea-title">${newIdea.title}</h1>
        <p class="idea-body-text">${newIdea.body}</p>
      </div>   
      <footer class="saved-idea-box footer">
        <img class="comment-img" src="assets/comment.svg" alt="comment icon"/>
        <p class="comment">Comment</p>
      </footer>
    </section>
  `;

  emptyInputs();
  saveButton.disabled = true;
  saveButton.classList.remove('cursor');
  saveButton.style.background = '#353567';
}

function deleteIdea (event) {
  var ideaId = parseInt(event.target.closest('section').id);

  for (var i = 0; i < savedIdeas.length; i++) {
    if (event.target.id === 'x' && ideaId === savedIdeas[i].id) {
      savedIdeas.splice(i , 1);
      event.target.closest('section').remove();
    }
  }
}

function starIdea (event) {
  var ideaId = parseInt(event.target.closest('section').id);

  for (var i = 0; i < savedIdeas.length; i++) {
    if (ideaId === savedIdeas[i].id && event.target.id === 'star') {
      event.target.parentNode.innerHTML = `
        <img id="activeStar" class="header-img cursor" src="assets/star-active.svg"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg"/>
        `;
      savedIdeas[i].updateIdea();
    } else if (ideaId === savedIdeas[i].id && event.target.id === 'activeStar') {
      event.target.parentNode.innerHTML = `
        <img id="star" class="header-img cursor" src="assets/star.svg"/>
        <img id="x" class="header-img cursor"src="assets/delete.svg"/>
        `;
      savedIdeas[i].updateIdea();
    }
  }
  showStarredButton.disabled = false;
  showStarredButton.classList.add('cursor');
}

function showStarred () {
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    showStarredButton.innerText = 'Show All Ideas';
    for (var i = 0; i < savedIdeas.length; i++) {
      var idea = document.getElementById(savedIdeas[i].id);

      if (!savedIdeas[i].starred) {
        idea.classList.add('hidden');
      }
    }
  } else {
    showStarredButton.innerText = 'Show Starred Ideas';
    for (var i = 0; i < savedIdeas.length; i++) {
      var idea = document.getElementById(savedIdeas[i].id);
      
      if (!savedIdeas[i].starred) {
        idea.classList.remove('hidden');
      }
    }
  }
}

function filterSavedIdeas() {
  var characters = searchInput.value.toUpperCase();
  
  for (var i = 0; i < savedIdeas.length; i++) {
    var idea = document.getElementById(savedIdeas[i].id);
    
    if (!savedIdeas[i].title.toUpperCase().includes(characters) && !savedIdeas[i].body.toUpperCase().includes(characters)) {
     idea.classList.add('hidden');
    } else {
     idea.classList.remove('hidden');
    }
  }
}
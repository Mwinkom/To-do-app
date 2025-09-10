const selectLabel = document.querySelector('.select-label');
const dropdown = document.querySelector('#categories');
const closeButton = document.querySelector('.close-btn');
const modalContainer = document.querySelector('.modal-container');
const addNewTask = document.querySelector('.add-task-btn');

addNewTask.addEventListener('click', () => {
    modalContainer.classList.toggle('active-modal');
    console.log(`Add new task clicked`)
})

closeButton.addEventListener('click', () => {
    modalContainer.classList.toggle('active-modal');
});

modalContainer.addEventListener('click', (event) => {
  console.log(event.target)
  if(event.target === modalContainer){
     modalContainer.classList.toggle('active-modal');
  }
})

selectLabel.addEventListener('click', () => {
  selectLabel.classList.toggle('active');
  dropdown.classList.toggle('show');
});

// Handle selecting an option
dropdown.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    selectLabel.querySelector('p').textContent = item.textContent;
    selectLabel.classList.remove('active');
    dropdown.classList.remove('show');
  });
});
 
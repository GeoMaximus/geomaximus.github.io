const modal = document.getElementById('modal');
const addBtn = document.getElementById('button_add');
const cancelBtn = document.getElementsByClassName('btn')[0];

//MODAL
addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  modal.classList.remove("modal");
});

window.onclick = function(e) {
  e.preventDefault();
  if(e.target == modal) {
    modal.style.display = 'none';
  }
}




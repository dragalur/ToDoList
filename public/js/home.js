const addB = document.getElementById('add-item');
const addBlock = document.getElementById('add-block');
const closeBt = document.getElementById('close');

addB.addEventListener('click', function () {
   addB.style.transform = 'rotateX(180deg)';
   addBlock.style.transform = 'rotateX(0)';
});

closeBt.addEventListener('click', function () {
   addB.style.transform = 'rotateX(0)';
   addBlock.style.transform = 'rotateX(180deg)';
});

const buttonAddCard = document.getElementById('bt');

buttonAddCard.addEventListener('click', function () {
   fetch('/home', {
      method: 'POST',
      body: JSON.stringify({ name: document.getElementById('name').value }),
      headers: { 'Content-Type': 'application/json' }
   })
      .then(response => response.json())
      .then(data => {
         // if (Array.isArray(data)) createCard(data[data.length - 1].name);
         !!Array.isArray(data) && createCard(data[data.length - 1].name);
         errorText(data.error);
      });
});

function createCard(name) {
   const form = `<div class="item-card item">
   <a href="./table?table=${name}" class="link">${name}</a>
      </div>`;
   let div = document.createRange().createContextualFragment(form);
   const lastDiv = document.getElementsByClassName('item-card');
   //FIXME: change on card create table, because it doesn't work when list is empty'
   lastDiv[lastDiv.length - 1].parentNode.insertBefore(
      div,
      lastDiv[lastDiv.length - 1].nextSibling
   );
   document.getElementById('name').value = '';
}

function errorText(text = null) {
   document.getElementById('error').innerHTML = text;
}

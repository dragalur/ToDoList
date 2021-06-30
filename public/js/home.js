(function () {
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
      const name = document.getElementById('name').value;
      if (name.trim() === '') {
         errorText('Please enter name');
         return;
      }

      fetch('/home', {
         method: 'POST',
         body: JSON.stringify({ name }),
         headers: { 'Content-Type': 'application/json' }
      })
         .then(response => response.json())
         .then(data => {
            !!Array.isArray(data) && createCard(data[data.length - 1].name);
            errorText(data.error);
         });
   });
})();

function createCard(name) {
   const form = `<div class="item-card item">
   <a href="./table?table=${name}" class="link">${name}</a>
      </div>`;
   let div = document.createRange().createContextualFragment(form);

   const lastDiv = document.getElementById('add');

   lastDiv.parentNode.insertBefore(div, lastDiv);
   document.getElementById('name').value = '';
   document.getElementById('close').click();
}

function errorText(text = null) {
   document.getElementById('error').innerHTML = text;
}

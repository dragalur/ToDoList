(function () {
   addBlock();
   openDelete();
   nameChangeEvent(document.getElementById('blockName'));
   // Array.prototype.forEach.call(document.getElementsByClassName('nameTable'), i =>
   //    nameChangeEvent(i)
   // );
   window.onblur = updateTable;
   window.onbeforeunload = evt => {
      evt.preventDefault();
      updateTable();
      return;
   };
})();
function addBlock() {
   const createBlock = document.getElementById('create-block');

   document.getElementById('add-block').addEventListener('click', () => {
      createBlock.style.display = 'block';
      createBlock.children[0].focus();
   });
   document
      .getElementById('close')
      .addEventListener('click', () => (createBlock.style.display = 'none'));

   createBlock.children[1].addEventListener('click', () => {
      const input = createBlock.children[0];
      if (!input.value.trim() == '') {
         createColumn(input.value, createBlock.parentElement);
         input.value = '';
         input.placeholder = '';
         createBlock.style.display = 'none';
      } else {
         input.placeholder = 'Enter name of column';
         return;
      }
   });
}

function cameBack() {
   location.href = './home';
}

function createColumn(text, elem) {
   const form = ` <div class="column">
   <div class="column-header">
      <div class="nameTable" id="nameTable" onclick="editNoticeText(this, false)">
         <p class="nameOfTable" id="nameOfTable">${text}</p>
         <input type="text" onblur="inputBlurEvent(e)" />
      </div>
      <div class="close delete" onclick="deleteColumnShow(this)"></div>
      <div class="delete-message">
         <button class="yes" onclick="deleteColumn(this)">Yes</button>
         <p>Delete column?</p>
         <button class="no" onclick="deleteColumnClose(this)">No</button>
      </div>
   </div>
   <div class="notices-block" >
   </div>
   <div class="add-notice">
      <div class="add-notice-button-bloc" onclick="showFieldAddNotice(this)">
         <div class="plus"></div>
         <p>Add new notice</p>
      </div>
      <div class="new-notice-text">
         <input type="text" />
         <div class="save" onclick="addNotice(this)"></div>
         <div class="cancel" onclick="closeFieldAddNotice(this)"></div>
      </div>
   </div>
</div>`;
   let div = document.createRange().createContextualFragment(form);
   elem.before(div);
}

function editNoticeText(ev, notice) {
   let p, input;
   if (notice) {
      p = ev.previousElementSibling.children[0];
      input = ev.previousElementSibling.children[1];
   } else {
      p = ev.children[0];
      input = ev.children[1];
   }

   input.style.display = 'block';
   input.value = p.innerHTML;
   input.focus();
}

function inputBlurEvent(e) {
   e.style.display = 'none';
   e.previousElementSibling.innerHTML = e.value;
   e.value.trim() === '' && e.parentElement.parentElement.remove();
}

function nameChangeEvent(blockName, targetClick = blockName) {
   const p = blockName.children[0];
   const input = blockName.children[1];

   targetClick.addEventListener('click', () => {
      input.style.display = 'block';
      input.value = p.innerHTML;
      input.focus();
   });

   input.addEventListener('blur', () => {
      input.style.display = 'none';
      p.innerHTML = input.value;
      if (input.className == 'notisField' && input.value.trim() == '')
         blockName.parentElement.remove();
   });
}

function showFieldAddNotice(e) {
   e.nextElementSibling.style.display = 'flex';
   e.nextElementSibling.children[0].focus();
}

function closeFieldAddNotice(e, input = null) {
   e.offsetParent.style.display = 'none';
   if (!input === null) {
      input.value = '';
      input.placeholder = '';
   }
}

function addNotice(e) {
   console.log('add');
   const tableNotice = e.offsetParent.offsetParent.previousElementSibling;
   const input = e.previousElementSibling;
   if (!input.value.trim() == '') createNotice(input.value, tableNotice);
   else {
      input.placeholder = 'Enter text of notice';
      return;
   }
   input.value = '';
   input.placeholder = '';
   closeFieldAddNotice(e, input);
}

function createNotice(text, elem) {
   console.log(window.history);
   const form = `<div class="notice" id="notice" draggable="true">
   <div class="text">
      <p>${text}</p>
      <input class="notisField" type="text" onblur="inputBlurEvent(this)"/>
   </div>
   <div class="edit" onclick="editNoticeText(this, true);"></div>
</div>`;
   let div = document.createRange().createContextualFragment(form);
   elem.appendChild(div);
}

function deleteColumnShow(e) {
   e.nextElementSibling.style.display = 'flex';
}
function deleteColumnClose(e) {
   e.parentElement.style.display = 'none';
}
function deleteColumn(e) {
   e.parentElement.parentElement.parentElement.remove();
}

function getDataFromTable() {
   const nameOfTable = document.getElementsByClassName('nameOfTable');
   const noticeBlock = document.getElementsByClassName('notices-block');

   let noticeObject = [];
   for (let i = 0; i < noticeBlock.length; i++) {
      const nameOfTableText = nameOfTable[i].innerText;
      const arraTextNotice = Array.prototype.map.call(
         noticeBlock[i].children,
         elem => elem.children[0].innerText
      );

      noticeObject.push({ name: nameOfTableText, fields: arraTextNotice });
   }
   return noticeObject;
}

async function updateTable() {
   const name = document.getElementById('name').innerText;
   const noticeObject = getDataFromTable();
   const nameFromUrl = new URLSearchParams(window.location.search).get('table');
   await updateRequest({ name: name, table: noticeObject }, nameFromUrl);
}

async function updateRequest(obj, name) {
   return await fetch('/home/table/' + name, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
   });
}

async function deleteTable() {
   const nameFromUrl = new URLSearchParams(window.location.search).get('table');

   await fetch('/home/table/' + nameFromUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
   })
      .then(response => response.json())
      .then(e => {
         !!e.ok && window.location.replace('/home');
      })
      .catch(e => console.log(e));
}

function openDelete() {
   const buton = document.getElementById('blockDelete');
   let confirmBlock = buton.nextElementSibling;

   buton.addEventListener('click', () => {
      confirmBlock.style.opacity = 1;
      confirmBlock.style.transform = 'translateX(-110px)';
   });
   confirmBlock.children[1].addEventListener('click', () => {
      confirmBlock.style.transform = 'translateX(0)';
      confirmBlock.style.opacity = 0;
   });
}

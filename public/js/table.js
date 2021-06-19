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

function createColumn(text, elem) {
   const form = ` <div class="column">
   <div class="column-header">
      <div class="nameTable" id="nameTable">
         <p id="nameOfTable">${text}</p>
         <input type="text" id="nameTableField" />
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

const headerName = document.getElementById('blockName');
nameChangeEvent(document.getElementById('blockName'));

const nameAddColumn = document.getElementsByClassName('nameTable');
Array.prototype.forEach.call(nameAddColumn, i => nameChangeEvent(i));

function editNoticeText(ev) {
   nameChangeEvent(ev.target.previousElementSibling, ev.target);
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
      //TODO: add update for name
   });
}

function showFieldAddNotice(e) {
   e.nextElementSibling.style.display = 'flex';
   e.nextElementSibling.children[0].focus();
}

function closeFieldAddNotice(e, input = null) {
   e.offsetParent.style.display = 'none';
   // console.dir(e.parentElement.children[0]);
   if (!input === null) {
      input.value = '';
      input.placeholder = '';
   }
}

function addNotice(e) {
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
   const form = `<div class="notice" id="notice" draggable="true">
   <div class="text">
      <p>${text}</p>
      <input class="notisField" type="text" />
   </div>
   <div class="edit" onclick="editNoticeText(event);"></div>
</div>`;
   let div = document.createRange().createContextualFragment(form);
   elem.appendChild(div);
}

function deleteColumnShow(e) {
   e.nextElementSibling.style.display = 'flex';
}
function deleteColumnClose(e) {
   e.parentElement.style.display = 'none';
   // console.log(e.parentElement);
}
function deleteColumn(e) {
   e.parentElement.parentElement.parentElement.remove();
}

//==========================================
//==========================================
//==========================================

// let notice = document.getElementsByClassName('notice');
// for (let i of notice) {
//    i.add;
// }
// const dropTarget = document.getElementById('notices-block');
// const dragables = document.getElementsByClassName('notice');

// for(let item of dragables){
//    item.addEventListener("dragstart", function(ev){
//       ev.dataTransfer.setData("srcId", ev.target.id);
//     });
// }

// dropTarget.addEventListener('drop', function(ev) {
//    ev.preventDefault();
//    let target = ev.target;
//    let droppable  = target.classList.contains('drag-box');
//    let srcId = ev.dataTransfer.getData("srcId");

//    if (droppable) {
//      ev.target.appendChild(document.getElementById(srcId));
//    }
//  });

// const blok = document
//    .createRange()
//    .createContextualFragment(`<div class="notice11" id="notice" ></div>`);

// const dropTarget = document.getElementById('notices-block');
// const dragables = document.getElementsByClassName('notice');

// function allowDrop(ev) {
//    ev.preventDefault(); // default is not to allow drop
//    console.log(ev);
//    ev.dataTransfer.dropEffect = 'move';
// }
// function dragStart(ev) {
//    ev.dataTransfer.setData('text/plain', ev.target.id);
//    //document.getElementById(ev.target.id).parentNode.replaceChild(blok,document.getElementById(ev.target.id));
// }
// for (let item of dragables) {
//    item.addEventListener('dragstart', function (ev) {
//       // ev.dataTransfer.setData("srcId", ev.target.id);
//       ev.dataTransfer.setData('elemId', ev.target.id);
//       ev.dataTransfer.setData('htmlElem', ev.target);
//       ev.target.classList.add('hide');
//       //   ev.target.style.transform = "translate(-9999px)";
//       //   (ev.target).parentNode.removeChild(ev.target);
//       console.log(ev.target);
//    });
// }

// dropTarget.addEventListener('ondragover', function (ev) {
//    ev.preventDefault();
//    ev.dataTransfer.dropEffect = 'move';
// });
// // dropTarget.addEventListener('drop', function (ev) {
// //    ev.preventDefault();
// //    let target = ev.target;
// //    let droppable = target.classList.contains('notice');
// //    let srcId = ev.dataTransfer.getData('text/plain');

// //    // Получить id целевого элемента и добавить перемещаемый элемент в его DOM
// //    const data = ev.dataTransfer.getData('elemId');
// //    ev.target.appendChild(document.getElementById(data));
// // });

// for (let item of dragables) {
//    item.addEventListener('drop', function (ev) {
//       ev.preventDefault();
//       let target = ev.target;
//       let droppable = target.classList.contains('notice');
//       let srcId = ev.dataTransfer.getData('text/plain');

//       // Получить id целевого элемента и добавить перемещаемый элемент в его DOM
//       const data = ev.dataTransfer.getData('elemId');
//       ev.target.appendChild(document.getElementById(data));
//       // if (droppable) {
//       //    ev.target.appendChild(document.getElementById(srcId));
//       // }
//    });
// }

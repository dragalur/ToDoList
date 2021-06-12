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

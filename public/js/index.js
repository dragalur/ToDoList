document.getElementById('footer').style.backgroundColor = 'rgb(0, 255, 106)';

const btn = document.getElementById('btn');
const circle = document.getElementById('circle');
let circlePosition = 0;
const arrow = document.getElementById('arrow');
let arrowRotate;
const log = document.getElementById('log');
const reg = document.getElementById('reg');
let logRotate = 0;
let regRotate = 0;

function turnLogReg(position) {
   if (position === 0) {
      logRotate = 180;
      regRotate = 0;
   } else {
      logRotate = 0;
      regRotate = 180;
   }
   log.style.transform = `rotateY(${logRotate}deg)`;
   reg.style.transform = `rotateY(${regRotate}deg)`;
}

btn.addEventListener('click', () => {
   turnLogReg(circlePosition);
   if (circlePosition === 0) {
      circlePosition = 50;
      arrowRotate = -70;
   } else {
      circlePosition = 0;
      arrowRotate = 230;
   }
   circle.style.transform = `translate(${circlePosition}px)`;
   arrow.style.transform = `rotate(${arrowRotate}deg)`;
});

//validation
function emailIsValid(email) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const email = document.getElementsByClassName('email');
const button = document.getElementsByClassName('button');

for (let i = 0; i < email.length; i++)
   email[i].addEventListener('input', (e) => {
      if (e.target.value === null) {
         email[i].style.borderColor = 'transparent';
         button[i].disabled = true;
      } else if (emailIsValid(e.target.value)) {
         email[i].style.borderColor = 'transparent';
         button[i].disabled = false;
      } else {
         email[i].style.borderColor = 'red';
         button[i].disabled = true;
      }
   });

const passwordRetri = document.getElementById('pasRet');
const password = document.getElementById('pas');

passwordRetri.addEventListener('input', (e) => passwordChec(e));
password.addEventListener('input', (e) => passwordChec(e));

function passwordChec(e) {
   if (passwordRetri.value === password.value) {
      passwordRetri.style.borderColor = 'transparent';
      button[1].disabled = false;
   } else {
      passwordRetri.style.borderColor = 'red';
      button[1].disabled = true;
   }
}

import { clientQuery } from './query.mjs';

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
   email[i].addEventListener('input', e => {
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

passwordRetri.addEventListener('input', () => passwordChec());
password.addEventListener('input', () => passwordChec());

function passwordChec() {
   if (passwordRetri.value === password.value) {
      passwordRetri.style.borderColor = 'transparent';
      button[1].disabled = false;
   } else {
      passwordRetri.style.borderColor = 'red';
      button[1].disabled = true;
   }
}
// function queryRequest(e) {
//    const password = e.previousElementSibling.value;
//    const mail = e.previousElementSibling.previousElementSibling.value;
//    const errorField = e.nextElementSibling;

//    clientQuery('/login', 'POST', { mail: mail, password: password }).catch(
//       err => (errorField.innerText = err)
//    );
//    // console.log(mail, password);
// }
const buttonForQuery = document.getElementsByClassName('button');
for (let i of buttonForQuery) {
   i.addEventListener('click', function (e) {
      const password = e.target.previousElementSibling.value;
      const mail = e.target.previousElementSibling.previousElementSibling.value;
      const errorField = e.target.nextElementSibling;

      clientQuery('/login', 'POST', { mail: mail, password: password })
         .then(response => {
            if (response.redirected) window.location.href = response.url;
            else return response.json();
         })
         .then(data => {
            if (data.errorLog != null) errorField.innerText = data.errorLog;
         })
         .catch(err => console.log(err));
   });
}

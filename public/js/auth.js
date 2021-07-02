(function () {
   document.getElementById('footer').style.backgroundColor = 'rgb(0, 255, 106)';
   validation();
   animationField();
   query();
})();

function turnLogReg(position) {
   let logRotate = 0,
      regRotate = 0;

   if (position === 0) {
      logRotate = 180;
      regRotate = 0;
   } else {
      logRotate = 0;
      regRotate = 180;
   }

   document.getElementById('log').style.transform = `rotateY(${logRotate}deg)`;
   document.getElementById('reg').style.transform = `rotateY(${regRotate}deg)`;
}

function animationField() {
   let circlePosition = 0,
      arrowRotate = 0;
   document.getElementById('btn').addEventListener('click', () => {
      turnLogReg(circlePosition);
      if (circlePosition === 0) {
         circlePosition = 50;
         arrowRotate = -70;
      } else {
         circlePosition = 0;
         arrowRotate = 230;
      }

      document.getElementById('circle').style.transform = `translate(${circlePosition}px)`;
      document.getElementById('arrow').style.transform = `rotate(${arrowRotate}deg)`;
   });
}

function emailIsValid(email) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validation() {
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

   passwordRetri.addEventListener('input', () => passwordChec(passwordRetri, password, button[1]));
   password.addEventListener('input', () => passwordChec(passwordRetri, password, button[1]));
}

function passwordChec(passwordRetri, password, button) {
   if (passwordRetri.value === password.value) {
      passwordRetri.style.borderColor = 'transparent';
      button.disabled = false;
   } else {
      passwordRetri.style.borderColor = 'red';
      button.disabled = true;
   }
}

function query() {
   const buttonForQuery = document.getElementsByClassName('button');
   Array.prototype.forEach.call(buttonForQuery, (item, index) => {
      item.addEventListener('click', async function (e) {
         waitingOnRedirect(item, true);
         const errorField = e.target.nextElementSibling;
         let password, mail, url;

         if (index == 0) {
            password = e.target.previousElementSibling.value;
            mail = e.target.previousElementSibling.previousElementSibling.value;
            url = '/login';
         } else {
            password = e.target.previousElementSibling.previousElementSibling.value;
            mail =
               e.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
            url = '/register';
         }

         await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ mail, password }),
            headers: { 'Content-Type': 'application/json' }
         })
            .then(response => {
               if (response.redirected) window.location.replace(responce.url);
               else return response.json();
            })
            .then(data => {
               if (data.error != null) {
                  errorField.innerText = data.error;
                  waitingOnRedirect(item, false);
               }
            })
            .catch(err => console.log(err));
      });
   });
}

function waitingOnRedirect(button, load) {
   if (load) {
      button.disabled = true;
      document.body.style.cursor = 'wait';
      button.style.cursor = 'wait';
   } else {
      button.disabled = false;
      document.body.style.cursor = 'auto';
      button.style.cursor = 'auto';
   }
}

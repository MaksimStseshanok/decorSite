const modal = document.querySelector('.modal');
const modalBtns = document.querySelectorAll('[data-phone]');
const modalForm = document.querySelector('.modal__form');
const modalBtnClose = document.querySelector('.modal__form-close');

const [headerModalBtn, footerModalBtn] = modalBtns;

const modalArray = [modal, headerModalBtn, footerModalBtn, modalForm, modalBtnClose];

modalArray.forEach(elem => {
  elem.addEventListener('click', () => {
    modal.classList.toggle('active');
    modalForm.classList.toggle('active');
  })
})


document.addEventListener(
  "DOMContentLoaded", () => {
    new Mmenu("#my-menu", {
      navbar: {
        title: 'основное меню сайта'
      },
    }, {
      offCanvas: {
        page: {
          selector: "#my-page"
        }
      }
    });
  }
);

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 1,
    autoplay: true,
  }
  );
});



document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);

    if (!error) {
      modalForm.classList.add('_sending');

      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        modalForm.classList.remove('_sending');
      } else {
        alert('Ошибка')
        modalForm.classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля!')
    }
  }

  const formValidate = form => {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  const formAddError = input => {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  const formRemoveError = input => {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }


  const emailTest = (input) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

  form.addEventListener('submit', formSend);
})
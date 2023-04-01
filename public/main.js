// Get references to the button and modal elements
const openModalButtons = document.querySelectorAll('.openModalButton');
const closeModalButtons = document.querySelectorAll('.closeModalButton');

// Loop through each open button and add an event listener
openModalButtons.forEach((button) => {
  const modalId = button.getAttribute('data-modal');
  const modal = document.getElementById(modalId);

  button.addEventListener('click', () => {
    modal.showModal();
  });
});

// Loop through each close button and add an event listener
closeModalButtons.forEach((button) => {
  const modal = button.closest('dialog');

  button.addEventListener('click', () => {
    modal.close();
  });
});

var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const thumbUp = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        thumbUp: thumbUp,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        msg: msg,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});

// Burger Menu stuff
const burgerMenu = document.querySelector(".burger-menu");
const slideOutMenu = document.querySelector(".slide-out-menu");

burgerMenu.addEventListener("click", function () {
  this.classList.toggle("change");
  slideOutMenu.classList.toggle("show");
});


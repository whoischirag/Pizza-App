// resources/js/app.js
import axios from "axios";
import Noty from "noty";
import initAdmin from "./admin"; 
import moment from "moment";

let addToCartButtons = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

addToCartButtons.forEach((btn) => {
  function updateCart(pizza) {
    axios
      .post("/update-cart", pizza)
      .then((res) => {
        cartCounter.innerText = res.data.totalQty;

        new Noty({
          type: "success",
          timeout: 800,
          text: "Item Added to Cart!!",
          progressBar: false,
        }).show();
      })
      .catch((err) => {
        new Noty({
          type: "error",
          timeout: 800,
          text: "Oops! Something went wrong!",
          progressBar: false,
        }).show();
      });
  }

  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

// Alert message handling
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 1500);
}

initAdmin(); // Initialize admin functionality

// Order status handling
let statuses = document.querySelectorAll(".status-line");
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);

let time = document.createElement('small');

function updateStatus(order) {
statuses.forEach((status)=>{
status.classList.remove('step-completed')
status.classList.remove('current')

})


  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format('hh:mm A');
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}

updateStatus(order);

// Socket.IO setup
let socket = io();

if (order) {
  // Join order room
  socket.emit('join', `order_${order._id}`);
}

let adminAreaPath =window.location.pathname


if(adminAreaPath.includes('admin')){

socket.emit('join','adminRoom')


}

// Listen for order updates
socket.on('orderUpdated', (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status; // Ensure `data` has the expected structure
  updateStatus(updatedOrder); // Call updateStatus to reflect changes in UI
  new Noty({
    type: "success",
    timeout: 800,
    text: "Order Updated!",
    progressBar: false,
  }).show()
});

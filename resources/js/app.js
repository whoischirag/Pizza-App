import axios from 'axios'
import Noty from 'noty'


let addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCounter =document.querySelector('#cartCounter')


addToCartButtons.forEach(btn => {

function updateCart(pizza){
axios.post('/update-cart',pizza).then(res =>{
       cartCounter.innerText= res.data.totalQty
   
       new Noty({
        type: 'success',
        timeout:800,
        text: " Item Added to Cart!!",
        progressBar:false
      }).show();
      
}).catch(err=>{
    new Noty({
        type: 'error',
        timeout:800,
        text: " Oops! Something went wrong ! ",
        progressBar:false
      }).show();

})

}

    btn.addEventListener('click', (e) => {
        let pizza =JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
       

    
    
    });
});

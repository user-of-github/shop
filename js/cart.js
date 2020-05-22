/* Copyright ©2020; Все права защищены. Собственность Слуцкого Никиты*/ 

const openCartButton = document.querySelector('#openCartButton'),
    closeCartButton = document.querySelector('#closeCartButton'),
    cartModal = document.querySelector('#cartModal'),
    modalBody = document.querySelector('#modal__body'),
    modalPriceTag = document.querySelector('#modal__pricetag'),
    formCheckout = document.querySelector('#formCheckout'),
    confirmPayment = document.querySelector('#confirmPayment'),
    modalCheckout = document.querySelector('#modalCheckout'),
    closeCheckout = document.querySelector('#closeCheckout');

const CART = JSON.parse(localStorage.getItem('shop-cart')) || [];

const saveCart = () => {
    localStorage.setItem('shop-cart', JSON.stringify(CART));
};
const renderCart = () => {
    modalBody.textContent = '';

    for (let i = 0; i < CART.length; i++) {
        const itemCard = `
                <div class="modal__row">
                    <span class="modal__title">${CART[i].title}</span>
                    <strong class="modal__price">${CART[i].cost}</strong>
                    <div class="modal__counter">
                        <button class="button counter-button counter-minus" data-id="${CART[i].id}">-</button>
                        <span class="counter">${CART[i].count}</span>
                        <button class="button counter-button counter-plus" data-id="${CART[i].id}">+</button>
                    </div>
                </div>
                        `;
        modalBody.insertAdjacentHTML('beforeend', itemCard);
    }

    const totalPrice = CART.reduce(function(result, item) {
        return result + Math.floor(parseFloat(item.cost)*100)/100 * parseInt(item.count);
    }, 0);


    modalPriceTag.textContent = totalPrice + ' ';
};
const changeCount = (event) => {
    const target = event.target;

    if (target.classList.contains('counter-button')) {
        const itemForChangingCount = CART.find((item) => (item.id === target.dataset.id));

        if (target.classList.contains('counter-plus'))
            itemForChangingCount.count++;
        if (target.classList.contains('counter-minus')) {
            itemForChangingCount.count--;
            if (itemForChangingCount.count === 0)
                CART.splice(CART.indexOf(itemForChangingCount), 1);
        }

        saveCart();
        renderCart();
    }
};

const init = () => {
    renderCart();

    cancelCart.addEventListener('click', () => {

        CART.length = 0;
        saveCart();
        renderCart();
    });

    modalBody.addEventListener('click', changeCount);

    confirmPayment.addEventListener('click', ()=>{
        modalCheckout.classList.toggle('is_open');
    });

    formCheckout.addEventListener('submit',()=>{
        alert('Спасибо за заказ. С вами свяжется менеджер');
    });

    closeCheckout.addEventListener('click',()=>{
        modalCheckout.classList.toggle('is_open');
    });
};

init();
/* Copyright ©2020; Все права защищены. Собственность Слуцкого Никиты*/ 
'use strict';

const accordance = ['mobile', 'Смартфоны', 'laptop', 'Ноутбуки', 'monoblock', 'Моноблоки', 'television', 'Теливизоры', 'photo', 'Фотоаппараты', 'watch', 'Умные часы и браслеты', 'tablet', 'Планшеты'];
const cardsContainer = document.querySelector('#cards-container');
const title = document.querySelector('title');

const startPromo = document.querySelector('#start'),
        startTitle = document.querySelector('#start__title');

const CART = JSON.parse(localStorage.getItem('shop-cart')) || [];


const getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok)
    {
        cardsContainer.insertAdjacentHTML('beforeend', `<span class="warn">Ошибка ${response.status}. Указанный адрес не существует</span>`);
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status} !`);

    }
    else
        return await response.json();

};

const createCardGood = (good) => {
    const card = `
                <div class="card good-card" data-id="${good.id}">
                    <img src="${good.img}" class="card__image">
                    <div class="card__text">
                        <h3 class="card__title">${good.title}</h3>
                        <div class="card__info">
                                <div class="description">${good.description}</div>
                        </div>
                        <div class="card__priceAndButton">
                            <button class="button-primary addToCartButton">
                                    <span class="button-card-text">В корзину</span>
                                    <span class="button-cart-svg"></span>
                            </button>
                            <span class="card__price">${good.price}</span>
                        </div>
                    </div>
                </div>
                `;
    cardsContainer.insertAdjacentHTML('beforeend', card);
};



const saveCart = () => {
    localStorage.setItem('shop-cart', JSON.stringify(CART));
};

const addToCart = (event) => {
    const target = event.target;
    const buttonAddToCart = target.closest('.addToCartButton');

    if (buttonAddToCart) {
        const card = buttonAddToCart.closest('.good-card');
        let typeName = ((accordance[accordance.indexOf((window.location.search.toString()).slice(1))+1]));
        typeName = typeName.slice(0, typeName.length-1);
        //console.log(typeName);
        const title = typeName + ' ' + card.querySelector('.card__title').textContent,
            cost = Math.floor(parseFloat(card.querySelector('.card__price').textContent)*100)/100,
            id = card.dataset.id;
        //alert(id);

        const doesAlreadyExistInCart = CART.find((item) => (item.id === id));

        if (doesAlreadyExistInCart)
            doesAlreadyExistInCart.count += 1;
        else
            CART.push({
                id,
                title,
                cost,
                count: 1
            });

        saveCart();

    }
};


const init = () => {
    getData(`./db/${(window.location.search.toString()).slice(1)}.json`).then((data) => {
        data.sort(() => Math.random() - 0.5);
        data.forEach(createCardGood);    
    });

    startTitle.textContent = (accordance[accordance.indexOf((window.location.search.toString()).slice(1))+1]);
        startPromo.style.backgroundImage = 'url(./img/' + (window.location.search.toString()).slice(1) + 'Promo.png)';
    title.textContent = 'Электроник. ' + (accordance[accordance.indexOf((window.location.search.toString()).slice(1))+1]);
    cardsContainer.addEventListener('click', addToCart);
};

init();
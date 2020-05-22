/* Copyright ©2020; Все права защищены. Собственность Слуцкого Никиты*/ 

'use strict';
///console.dir(JSON.parse(localStorage.getItem('shop-cart'))); урааа

const categoryCardsContainer = document.querySelector('#categoryCardsContainer');


const CART = JSON.parse(localStorage.getItem('shop-cart')) || [];


const getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status} !`);
    else
        return await response.json();

};

const createCardCategory = (type) => {
    const card = `
                <a class="card" href="catalog.html?${type.type}">
                    <img src="${type.img}" class="card__image">
                    <h3 class="card__title">${type.title}</h3>
                </a>
                `;
    categoryCardsContainer.insertAdjacentHTML('beforeend', card);
};


const init = () => {
    getData('./db/types.json').then((data) => {
        //data.sort(() => Math.random() - 0.5);
        data.forEach(createCardCategory);
    });


};

init();
let goods = [
    {
        name: 'Бананы',
        price: '7',
        img: 'banana.webp',
        description: 'Бананы ярко-желтые производство Якутия'
    },
    {
        name: 'Груши',
        price: '10',
        img: 'pear.webp',
        description: 'Груши красные - собраны в новолуние въетнамскими пионерами'
    },
    {
        name: 'Дыня',
        price: '11',
        img: 'melon.webp',
        description: 'Дыня сочная - прямая поставка с бахчи Туркменбаши'
    },
    {
        name: 'Яблоки',
        price: '5',
        img: 'apple.webp',
        description: 'Яблоки зеленые конверсия от Тима Кука '
    }
],
    basket = [],
    goodsBlock = document.getElementsByClassName('goods')[0];

for (let i = 0; i < goods.length; i++){
    let good = document.createElement('div');
    good.setAttribute('class', 'good');
    good.innerHTML = '<h3>'+goods[i].name+'</h3>';
    good.innerHTML += '<img src="img/basket/'+goods[i].img+'">';
    good.innerHTML += '<span><b>Цена:</b> '+goods[i].price+'</span>';
    good.innerHTML += '<span><b>Описание:</b> '+goods[i].description+'</span>';
    good.innerHTML += '<a id="'+i+'" href="#" class="add">Добавить в корзину</a>';
    goodsBlock.appendChild(good);
    document.getElementById(i).addEventListener('click', addInBasket);
}

function addInBasket() {
    if(checkBasket(this.id)){
        let newOrder = {
            id: this.id,
            count: 1
        };
        basket.push(newOrder);
    }else{
        for (let key in basket){
            if(basket[key].id == this.id) ++basket[key].count;
        }
    }
    drawBasket();
    console.log(basket);
}

function checkBasket(id){
    if(basket.length > 0){
        for(let i = 0; i < basket.length; i++){
            if (basket[i].id == id) return false;
        }
    }
    return true;
}

function drawBasket() {
    let basketBlock = document.getElementsByClassName('basket')[0];
    basketBlock.innerHTML = '<table class="basketTable">' +
                                '<tr>' +
                                    '<td>Наименование товара</td>' +
                                    '<td>Цена за 1 кг.</td>' +
                                    '<td>Всего кг.</td>' +
                                    '<td>Итого</td>' +
                                '</tr>' +
                            '</table>';

    let basketTable = document.getElementsByClassName('basketTable')[0],
        fullOrderPrice = 0;

    for(let i = 0; i < basket.length+1; i++){
        let rowOrder = document.createElement('tr'),
            tdName = document.createElement('td'),
            tdPrice = document.createElement('td'),
            tdHowMuch = document.createElement('td'),
            tdSumPrice = document.createElement('td');

        if (i < basket.length) {
            tdName.innerText = goods[basket[i].id].name;
            tdPrice.innerText = goods[basket[i].id].price;
            tdHowMuch.innerText = basket[i].count / 2;
            tdSumPrice.innerText = basket[i].count / 2 * goods[basket[i].id].price;
            fullOrderPrice += basket[i].count * goods[basket[i].id].price;
        }else{
            tdName.innerText = 'Итого';
            tdPrice.innerText = '';
            tdHowMuch.innerText = '';
            tdSumPrice.innerText = fullOrderPrice;
        }

        rowOrder.appendChild(tdName);
        rowOrder.appendChild(tdPrice);
        rowOrder.appendChild(tdHowMuch);
        rowOrder.appendChild(tdSumPrice);
        basketTable.appendChild(rowOrder);
    }
    console.log(basketBlock);
}

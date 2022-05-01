const addProductContent = document.querySelector('#product-content');
const addProductBasket = document.querySelector('.cart-wrapper');

const goods = JSON.parse(localStorage.getItem('product')) || [];
const basket = JSON.parse(localStorage.getItem('goods')) || [];

const handleAddCounter = (event, arr, id) => {
    arr.forEach(el => {
    
        if (el.id === id) {
        
            if (event.target.dataset.action === 'minus') {
                if (el.counter <= 1) { return };
                el.counter--;
            }

            if (event.target.dataset.action === 'plus') {
                el.counter++;
            }
        }
    });
    updateLocalBasket();
    createTemplate(goods);
    createTemplateBasket(basket);
}



const createTemplateBasket = (product) => {
    addProductBasket.innerHTML = '';
    if (product.length > 0) {
        product.forEach(element => {
            addProductBasket.innerHTML = addProductBasket.innerHTML + `
            <div class="cart-item" data-id=${element.id}>
				<div class="cart-item__top">
					<div class="cart-item__img">
						<img src="${element.file}" alt="">
							</div>
					<div class="cart-item__desc">
						<div class="cart-item__title">${element.name}</div>
						<div class="cart-item__weight">${element.count} шт. / ${element.weight} г.</div>

						<div class="cart-item__details">

							<div class="items items--small counter-wrapper">
								<div class="items__control" data-action="minus" onclick='handleAddCounter(event, basket, ${element.id})'>-</div>
								<div class="items__current" data-counter="">${element.counter}</div>
								<div class="items__control" data-action="plus" onclick='handleAddCounter(event, basket, ${element.id})'>+</div>
							</div>

							<div class="price">
								<div class="price__currency">${element.price} грн.</div>
								</div>
                                <div> <button data-delete class="btn btn-block btn-outline-warning" onclick="deleteProductWithBasket(event, ${element.id})"> Delete </button> </div>
								</div>
									</div>
								</div>
							</div>
            `
        });

    }
}

const handleAddBasket = (event, id) => {
    if (event.target.hasAttribute('data-cart')) {
        goods.forEach(product => {
            if (product.id === id) {
                basket.push({
                    id: product.id,
                    file: product.file,
                    name: product.name,
                    count: product.count,
                    weight: product.weight,
                    price: product.price,
                    counter: product.counter
                })
            }
        });
    }
    calculateAmountOrder(basket);
    updateLocalBasket();
    createTemplateBasket(basket);
}

const calculateAmountOrder = (arr) => {
    const totalPrice = document.querySelector('.total-price');
    var result = arr.reduce(function (sum, current) {
        return sum + Number(current.price);
    }, 0);

    totalPrice.innerHTML = result;
}

calculateAmountOrder(basket);

const deleteProductWithBasket = (event, id) => {
    if (event.target.hasAttribute('data-delete')) {
        basket.forEach((el, index) => {
            if (el.id === id) {
                basket.splice(index, 1);
            }
        })
    }
    calculateAmountOrder(basket);
    updateLocalBasket();
    createTemplateBasket(basket);
}

const createTemplate = (product) => {
    addProductContent.innerHTML = '';
    if (product.length > 0) {
        product.forEach(element => {
            addProductContent.innerHTML += `
            <div class="col-md-6" onclick='handleAddBasket(event, ${element.id})'>
            <div class="card mb-4" data-id=${element.id}>
                <img class="product-img" src="${element.file}" alt="">
                <div class="card-body text-center">
                    <h4 class="item-title">${element.name}</h4>
                    <p><small data-items-in-box class="text-muted">${element.count} шт.</small></p>

                    <div class="details-wrapper">
                        <div class="items counter-wrapper">
                            <div class="items__control" data-action="minus" onclick='handleAddCounter(event, goods, ${element.id})'>-</div>
                            <div class="items__current" data-counter>${element.counter}</div>
                            <div class="items__control" data-action="plus" onclick='handleAddCounter(event, goods, ${element.id})'>+</div>
                        </div>

                        <div class="price">
                            <div class="price__weight">${element.weight}г.</div>
                            <div class="price__currency">${element.price} UAH</div>
                        </div>
                    </div>
                    </div>

                    <button data-cart type="button" class="btn btn-block btn-outline-warning" >+ в кошик</button>

                    </div>
        </div>
            `;
        });
    }

}

const updateLocalBasket = () => {
    localStorage.setItem('goods', JSON.stringify(basket));
};

createTemplate(goods);
createTemplateBasket(basket);
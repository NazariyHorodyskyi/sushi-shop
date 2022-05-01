const homeLink = document.querySelector('.home-link');

const goods = JSON.parse(localStorage.getItem('product')) || [];

const readFile = (input) => new Promise((resolve) => {

    if (input.files && input.files[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            resolve(e.target.result);
        });

        FR.readAsDataURL(input.files[0]);

    }
});

const getRawData = async (form) => {
    const data = await Array.from(form.elements).reduce(async (dataPromise, input) => {
    
        const data = await dataPromise;
        if (input.type === 'file') return { ...data, [input.name]: await readFile(input) };
        if (input.name !== '') data[input.name] = input.value;
        return data;
    }, Promise.resolve({}));
    return data;
};

const handleAddProduct = async (event) => {
    event.preventDefault();
    const product = await getRawData(event.target);
    product.id = Math.random();
    product.counter = 1;
    goods.push(product);
    updateLocal();
    homeLink.click();
}

const updateLocal = () => {
    localStorage.setItem('product', JSON.stringify(goods));
};



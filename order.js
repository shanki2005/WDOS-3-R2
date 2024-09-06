document.addEventListener('DOMContentLoaded', () => {
    const saveFavouriteButton = document.getElementById('saveFavouriteButton');
    const applyFavouritesButton = document.getElementById('applyFavouritesButton');
    const orderNowButton = document.getElementById('orderNowButton');
    const clearOrderButton = document.getElementById('clearOrderButton');
    const orderSummaryBody = document.getElementById('orderBody');
    const shippingFeeElement = document.getElementById('shippingFee');
    const totalPriceElement = document.getElementById('totalPrice');

    const medicinePrices = {
        paracetamol: 50,
        ibuprofen: 70,
        aspirin: 60,
        naproxen: 80,
        diclofenac: 90,
        celecoxib: 100,
        amoxicillin: 150,
        ciprofloxacin: 200,
        azithromycin: 180,
        doxycycline: 170,
        erythromycin: 190,
        clindamycin: 220,
        fluoxetine: 300,
        sertraline: 320,
        citalopram: 310,
        escitalopram: 330,
        paroxetine: 340,
        venlafaxine: 350,
        loratadine: 120,
        cetirizine: 130,
        diphenhydramine: 110,
        chlorpheniramine: 140,
        desloratadine: 150,
        fexofenadine: 160,
        lisinopril: 250,
        amlodipine: 270,
        losartan: 260,
        metoprolol: 280,
        hydrochlorothiazide: 290,
        valsartan: 300
    };

    function updateOrderSummary() {
        let totalPrice = 0;
        orderSummaryBody.innerHTML = '';

        Object.keys(medicinePrices).forEach(medicine => {
            const quantity = parseInt(document.getElementById(medicine).value, 10) || 0;
            if (quantity > 0) {
                const pricePerUnit = medicinePrices[medicine];
                const total = pricePerUnit * quantity;
                totalPrice += total;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${medicine}</td>
                    <td>${quantity}</td>
                    <td>Rs. ${pricePerUnit}</td>
                    <td>Rs. ${total}</td>
                `;
                orderSummaryBody.appendChild(row);
            }
        });

        totalPrice += 250; 
        totalPriceElement.textContent = `Rs. ${totalPrice}`;

    
        localStorage.setItem('orderTotalPrice', totalPrice);
    }

    function saveFavourite() {
        const favouriteOrder = {
            medicines: {},
            totalPrice: parseInt(totalPriceElement.textContent.replace('Rs. ', ''), 10)
        };

        Object.keys(medicinePrices).forEach(medicine => {
            const quantity = parseInt(document.getElementById(medicine).value, 10) || 0;
            if (quantity > 0) {
                favouriteOrder.medicines[medicine] = quantity;
            }
        });

        localStorage.setItem('favouriteOrder', JSON.stringify(favouriteOrder));
    }

    function applyFavourites() {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            Object.keys(medicinePrices).forEach(medicine => {
                if (favouriteOrder.medicines && favouriteOrder.medicines[medicine] !== undefined) {
                    document.getElementById(medicine).value = favouriteOrder.medicines[medicine];
                } else {
                    document.getElementById(medicine).value = 0;
                }
            });
            updateOrderSummary();
        }
    }

    function clearOrder() {
        Object.keys(medicinePrices).forEach(medicine => {
            document.getElementById(medicine).value = 0;
        });
        orderSummaryBody.innerHTML = '';
        totalPriceElement.textContent = 'Rs. 0';
        localStorage.removeItem('orderTotalPrice'); 
    }

    function orderNow() {
        updateOrderSummary(); 
        window.location.href = 'payment.html';
    }

    document.querySelectorAll('input[type=number]').forEach(input => {
        input.addEventListener('input', updateOrderSummary);
    });

    saveFavouriteButton.addEventListener('click', saveFavourite);
    applyFavouritesButton.addEventListener('click', applyFavourites);
    clearOrderButton.addEventListener('click', clearOrder);
    orderNowButton.addEventListener('click', orderNow);
});

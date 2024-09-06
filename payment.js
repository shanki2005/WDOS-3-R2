document.addEventListener('DOMContentLoaded', () => {
    const orderSummaryTable = document.getElementById('orderSummaryTable');
    const totalPriceElement = document.getElementById('totalPrice');
    const shippingFeeElement = document.getElementById('shippingFee');

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

    function loadOrderSummary() {
        const orderTotalPrice = localStorage.getItem('orderTotalPrice');
        if (orderTotalPrice !== null) {
            totalPriceElement.textContent = `Rs. ${orderTotalPrice}`;
        } else {
            totalPriceElement.textContent = 'Rs. 0';
        }

        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            Object.keys(favouriteOrder.medicines).forEach(medicine => {
                const quantity = favouriteOrder.medicines[medicine];
                const pricePerUnit = medicinePrices[medicine];
                const total = pricePerUnit * quantity;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${medicine}</td>
                    <td>${quantity}</td>
                    <td>Rs. ${pricePerUnit}</td>
                    <td>Rs. ${total}</td>
                `;
                orderSummaryTable.appendChild(row);
            });
        }
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        let isValid = true;

        // Basic validation
        if (phone.length !== 10) {
            alert('Phone number must be 10 digits.');
            isValid = false;
        }

        if (!email.includes('@')) {
            alert('Email must contain "@" symbol.');
            isValid = false;
        }

        if (!address.toLowerCase().includes('sri lanka')) {
            alert('Address must be in Sri Lanka.');
            isValid = false;
        }

        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            isValid = false;
            alert('Credit card number must be 16 digits.');
        }

        if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
            isValid = false;
            alert('Expiry date must be in MM/YY format.');
        }

        if (cvv.length !== 3 || isNaN(cvv)) {
            isValid = false;
            alert('CVV must be 3 digits.');
        }

        return isValid;
    }

    function submitPayment() {
        if (validateForm()) {
            alert('Payment successful. Your order will arrive in 3-5 business days.');
        }
    }

    document.getElementById('submitPaymentButton').addEventListener('click', submitPayment);
    loadOrderSummary();
});

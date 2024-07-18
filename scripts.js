document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function showSection(id) {
        sections.forEach(section => {
            if (section.id === id) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            history.pushState(null, null, `#${targetId}`);
            showSection(targetId);
        });
    });

    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        showSection(initialHash);
    } else {
        sections[0].classList.add("active");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const stripe = Stripe('pk_live_51PdxfURxV6IwpmDrha2SKIRsy3kb0Usuk3oYHyW1ldE0wUrEibSCMgNgvUbgoRQ6gQOJXCnqbxyrMUiyZJhR2zpb00aKxpYWHC'); // Substitua 'YOUR_PUBLISHABLE_KEY' pela sua chave pública do Stripe
    const comprarAdultoBtn = document.getElementById('comprar-adulto');
    const comprarCriancaBtn = document.getElementById('comprar-crianca');

    comprarAdultoBtn.addEventListener('click', function() {
        handleCheckout(120); // Preço em centavos (R$ 1,20)
    });

    comprarCriancaBtn.addEventListener('click', function() {
        handleCheckout(80); // Preço em centavos (R$ ,80)
    });

    function handleCheckout(amount) {
        stripe.redirectToCheckout({
            lineItems: [{
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: 'Ingresso',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            successUrl: window.location.origin + '/success.html',
            cancelUrl: window.location.origin + '/cancel.html',
        })
        .then(function (result) {
            if (result.error) {
                alert(result.error.message);
            }
        });
    }
});


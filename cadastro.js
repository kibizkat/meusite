document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro-form');
    const qrCodeContainer = document.getElementById('qrcode');
    const qrCodeDisplay = document.getElementById('qrcode-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Gerar o QR Code com base nos dados do formulário
        new QRCode(qrCodeContainer, {
            text: `Nome: ${nome}\nE-mail: ${email}`,
            width: 200,
            height: 200
        });

        // Exibir o container do QR Code
        qrCodeDisplay.style.display = 'block';
    });
});

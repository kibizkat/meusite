document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro-form');
    const qrCodeContainer = document.getElementById('qrcode');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Gerar o QR Code com base nos dados do formulário
        const qr = new QRCode(qrCodeContainer, {
            text: `Nome: ${nome}\nE-mail: ${email}`,
            width: 200,
            height: 200
        });

        // Exemplo de enviar dados para o PHP para processamento adicional (como envio por e-mail)
        const formData = new FormData(form);
        fetch('enviar_qrcode.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Exemplo de resposta do PHP
            // Pode adicionar aqui lógica para lidar com a resposta do PHP, se necessário
        })
        .catch(error => {
            console.error('Erro ao enviar formulário:', error);
        });
    });
});

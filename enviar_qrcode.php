<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Caminho para o autoload do PHPMailer

// Dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];

// Gerar QR Code novamente com os dados recebidos
$qrData = "Nome: $nome\nEmail: $email";
QRcode::png($qrData, 'qrcode.png'); // Gera o QR code como imagem PNG

// Configurações do PHPMailer
$mail = new PHPMailer(true);

try {
    // Configurações do servidor SMTP (exemplo usando Gmail)
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'agnaldo2234@gmail.com'; // Seu e-mail Gmail
    $mail->Password = 'a96962205'; // Sua senha do Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Remetente e destinatário
    $mail->setFrom('seu_email@gmail.com', 'Seu Nome');
    $mail->addAddress($email, $nome);

    // Anexo (QR code gerado)
    $mail->addAttachment('qrcode.png', 'qrcode.png');

    // Conteúdo do e-mail
    $mail->isHTML(true);
    $mail->Subject = 'QR Code do seu cadastro';
    $mail->Body    = 'Olá, ' . $nome . '! <br> Em anexo está o QR Code gerado com seus dados.';

    // Enviar e-mail
    $mail->send();
    echo 'E-mail enviado com sucesso!';
} catch (Exception $e) {
    echo "Erro ao enviar e-mail: {$mail->ErrorInfo}";
}
?>

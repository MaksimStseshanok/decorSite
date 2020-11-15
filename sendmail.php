<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Файлы phpmailer
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

// Настройки PHPMailer
$mail = new PHPMailer(true);  
$mail->CharSet = "UTF-8";
$mail->setLanguage("ru", "phpmailer/language");
$mail->IsHTML(true);

// От кого
$mail->setFrom('shine');
// Кому
$mail->addAddress('');
// Тема 
$mail->Subject = 'Привет, это тема письма!';

// Письмо
if(trim(!empty($_POST['email']))){
  $body.='<p><strong>Почта:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['phone']))){
  $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))){
  $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $Body;

// Отправка
if(!$mail->send()) {
  $message = 'Ошибка';
} else {
  $message =  'Данные отправлены!'
};

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
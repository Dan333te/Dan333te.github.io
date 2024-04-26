<?php
$errors = [];
use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;
        use PHPMailer\PHPMailer\SMTP;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["formName"];
    $email = $_POST["formEmail"];
    $message = $_POST["formMessage"];
    $subject= $_POST["subject"];

    // Validate name
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    // Validate subject
    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }

    // Validate email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email address.";
    }

    // Validate message
    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    if (empty($errors)) {
        
        

        require './vendor/phpmailer/phpmailer/src/PHPMailer.php';
        require './vendor/phpmailer/phpmailer/src/SMTP.php';
        require 'vendor/autoload.php';

        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'ce.20.242@student.uotechnology.edu.iq';
            $mail->Password   = 'zozkhuuwbxgfrdiw';
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 465;

            $mail->setFrom($email);
            $mail->addAddress('anwarak221@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $message ."<p> from :". $email ."</p>";

            $mail->send();
            echo "<script>  window.location.href='./sent.html'
            </script>";
            echo 'Message has been sent';
          
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

        echo "Form submitted successfully!";
    } else {
        // If there are validation errors, display them to the user
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }
}
?>

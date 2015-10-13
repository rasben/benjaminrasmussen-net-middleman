<?php
require('../lib/googlerecaptcha/src/autoload.php');

//These will be included in the settings-secret.php file.
$siteKey = '';
$secret = '';

require('../../settings-secret.php');

$lang = 'en';
$errors = array();
$email = $email_secret;
$address = $address_secret;
$phone = $phone_secret;

$jsonResponse = array(
  'success' => false,
  'errors' => $errors,
);

//todo - sanitize this
if (isset($_POST['g-recaptcha-response'])) {
  $recaptcha = new \ReCaptcha\ReCaptcha($secret);
  $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

  if ($resp->isSuccess()) {
    $jsonResponse['success'] = true;
    $jsonResponse['address'] = $address;
    $jsonResponse['phone'] = $phone;
    $jsonResponse['email'] = $email;
  }

  else {
    $errors[] = $resp->getErrorCodes();
  }
}

else {
  $errors[] = 'NoInput';
}

$jsonResponse['errors'] = $errors;

print json_encode($jsonResponse);

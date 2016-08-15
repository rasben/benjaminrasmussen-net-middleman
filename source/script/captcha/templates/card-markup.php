<?php
  require('../../../settings-secret.php');
?>

<div>
  <h1 class="contact__card__name">Benjamin Rasmussen</h1>
  <h2 class="contact__card__meta">Webdesigner &amp; Developer</h2>

  <ul class="contact__card__items">
    <li class="js-contact-address contact__card__item contact__card__item--address">
      <?php print $address_secret; ?>
    </li>
    <li class="js-contact-email contact__card__item contact__card__item--email">
      <?php print $email_secret; ?>
    </li>
  </ul>
</div>
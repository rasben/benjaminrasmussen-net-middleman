---
title: How to switch between multiple PHPBrew versions (including Apache)
date: 2016-01-10
tags: php, phpbrew, apache, linux
image_teaser: 'PHP_logo.png'
images:
  -  { path: 'PHP_logo.png', title: '' }
js:
  -  { path: 'js/prismjs/prism.js'}
css:
  -  { path: 'js/prismjs/prism.css'}
videos:
  youtube:
    -  { vid: '', title: '', description: ''}

---

One of the wonderful things of being a developer is that you get to roleplay as Indiana Jones sometimes - meaning you get to dig into graves that noone knows or should know what it is inside.

Joking aside, especially if you are a webdeveloper, at one point or another you'll be tasked with fixing something that is running on an ancient PHP version. Now of course you are a good developer who will make sure to get a local environment set up.. right?

I assume you already know what <a href="https://www.vagrantup.com" class="text__link--visible">Vagrant</a> is. If you don't, the short answer is that Vagrant is the easiest way possible to set up and run virtual machines. In a matter of minutes, you can set up a brand new environment - and it also allows you to package current environments so you and your team can run the same environment.

Now although it is super easy to find tons of <a href="https://atlas.hashicorp.com/boxes/search" class="text__link--visible">Vagrant boxes</a> (virtual machine images), chances are you already have a lovely set up on your own box and it will suck to boot up a whole new box.

If you still want to set up multiple Vagrant boxes for multiple, specific environments, I suggest you check out <a href="https://puphpet.com/" class="text__link--visible">PuPHPet</a>. It's an online GUI where you can choose exactly what kind of environment you want (e.g. choose the right version of PHP, Apache, Ruby versions etc.).

Anyway, back to the issue at hand: <b>I want multiple PHP versions on my linux environment:</b>

First you want to set up <a href="https://github.com/phpbrew/phpbrew" class="text__link--visible">PHPBrew</a>, which allows you to install multiple PHP versions. I will not write the installation instructions here as their instructions change from time to time and generally are fine.

When you got it installed, and you got your weird version of PHP installed, you can switch between it with 

<span class="blog__code-command">phpbrew switch [PHP VERSION]</span>

<span class="blog__code-command">$ PHP -v</span>

now outputs your desired version! Yay!.. however, if you go to the browser and look at PHPInfo(), you'll see that it's still default version of PHP. This is because Apache has not been affected at all by phpbrew - we'll need to set this manually.

I created a bash script for doing just that (and included phpswitch, because why not):

<pre class="blog__code-snippet">
  <code class="language-css line-numbers">
    #!/bin/bash
    # Change Apaches PHP Module

    VERSION="$1"
    echo "Variable = $VERSION"

    if [ -z "$1" ]; then
        echo "Switching off PHPBrew, setting standard php"
        phpbrew off
        sudo echo "LoadModule php5_module /usr/lib/apache2/modules/libphp5.so" > /etc/apache2/mods-available/php5.load
        sudo service apache2 restart

    else
        echo "Loading PHP $VERSION ..."

        phpbrew switch $VERSION
        echo "/usr/lib/apache2/modules/libphp$VERSION.so"
        sudo echo "LoadModule php5_module /usr/lib/apache2/modules/libphp$VERSION.so" > /etc/apache2/mods-available/php5.load
        sudo service apache2 restart
    fi

    php -v
  </code>
</pre>

This only works for PHP5 versions, but if you have to work with lower PHP versions (god have mercy on your soul), then you can just modify it.

You can now run the script. If you dont add a parameter, it will turn off PHPBrew and load the default PHP version of the system. If you give it a parameter (e.g. 5.4.38, NOT php-5.4.38), it will start up PHPBrew, switch to that version, load it into Apache files and restart Apache.

Now hopefully when you go check out your PHPInfo(), it should show your desired, old PHP version. You're... welcome..? :)

Have fun!

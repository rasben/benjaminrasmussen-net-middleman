window.rasben = {};

$(document).ready(function(){

  /**
  * Controller for the extra foldout
  */
  rasben.Nav = function(options) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.Nav.prototype = {
    _attach : function() {

      var controller = this.element.find('.js-nav-controller');
      this.parent = this.element;
      this.inner = this.element.find('.js-nav-inner');
      controller.on('click',this.toggle.bind(this));
    },

    toggle : function() {
      $(this.inner).toggleClass('is-open');
    }
  };

  $('.js-nav').each(function() {
    new rasben.Nav({element:this});
  });

  /**
  * Controller for the scroll call-to-action button.
  */
  rasben.Scroll = function(options) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.Scroll.prototype = {
    _attach : function() {
      if ($(this.element).hasClass('js-scroll-down')) {
        this.element.on('click', this.scrollDown.bind(this));
      }
      else if ($(this.element).hasClass('js-scroll-up')) {
        this.element.on('click', this.scrollUp.bind(this));
      }
    },

    scrollDown : function(e) {
      this.nextPage = $(this.element).parent().next('.js-page');
      $('html, body').animate({
         scrollTop: $(this.nextPage).offset().top
      }, 400);
    },

    scrollUp : function(e) {
      this.nextPage = $(this.element).parent().parent().first('.js-page');
      $('html, body').animate({
         scrollTop: $(this.nextPage).offset().top
      }, 400);
    }

  };

  $('.js-scroll').each(function() {
    new rasben.Scroll({element:this});
  });

  /**
  * Controller the timeline
  */
  rasben.Timeline = function(options, callback) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.Timeline.prototype = {
    _attach : function() {
      this.rocket = this.element.find('.js-timeline-rocket')
      this.list = this.element.find('.js-timeline-items');
      this.items = this.list.find('.js-timeline-item.has-content');
      this.isPlaying = false;

      if (this.isPlaying == false) {
        $(window).on('DOMContentLoaded load resize scroll', this.checkVisibiltyTrigger.bind(this));
      }
    },

    checkVisibiltyTrigger : function (value) {
      if (this.isPlaying == false) {
        if ((this._checkVisibilty(this.list)) == true) {
          this.startRocket();
        }
      }
    },

    _checkVisibilty : function(el) {
      // Thank you Dan : http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
      if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
      }
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
      );
    },

    startRocket : function() {
      this.isPlaying = true;
      $(this.element).addClass('is-playing');
      this._rocketReactions();
    },

    _rocketReactions : function() {
      var rocket = this.rocket;
      var counter = 0;
      var items = this.items;

      // Check every x second where the rocket is in regards to the elements.
      var checkInterval = setInterval(function() {
        if ((($(rocket).offset().left) >= (($(items[counter]).offset().left) + 0))) {
          $(items[counter]).addClass('is-active');
          $(items[counter - 1]).removeClass('is-active');
          counter++;
        }

        if (counter > 5) {
          clearInterval(checkInterval);
        }
      }, 300);

      // Fallback, to stop the interval.
      setTimeout( function() { 
        clearInterval(checkInterval);
      }, 60000);
    }
  };

  $('.js-timeline').each(function() {
    new rasben.Timeline({element:this});
  });

  /**
  * Controller for the TL;DR functionality
  */
  rasben.Tldr = function(options) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.Tldr.prototype = {

    _attach : function() {
      this.keys = [],
      this.keyCode = "84,76,68,82";
      this.tldr = $(this.element).find('.js-tldr');
      this.tldrVisible = false;
      this.element.find('.js-tldr-show').on('click',this._tldrToggle.bind(this));

      // Check if the browser supports this.
      if (window.addEventListener) {
        $(window).on('keydown', this.checkForTldr.bind(this));
      }
    },

    checkForTldr : function(e) {
      this.keys.push(e.keyCode);
      if (this.keys.toString().indexOf(this.keyCode) >= 0) {
          this._tldrToggle();
          this.keys = [];
      };
    },

    _tldrToggle : function() {

      // fix "this" issue with set timeout
      var that = this;

      if ((this.tldrVisible == false) && (this.tldr.length)) {
        $(this.element).addClass('is-tldr-anim');


        $('html, body').animate({
           scrollTop: $(this.tldr).offset().top
        }, 700);

        setTimeout(function(){
          $(that.element).toggleClass('is-tldr-anim is-tldr');
        }, 650);

        this.tldrVisible = true;
      }

      else if ((this.tldrVisible == true) && (this.tldr.length)) {
        $(this.element).toggleClass('is-tldr-anim is-tldr');

        $('html, body').animate({
           scrollTop: $(this.tldr).offset().top
        }, 1);

        $('html, body').animate({
           scrollTop: $(this.element).offset().top
        }, 700);

        // Todo - this could be better, but setTimeout 
        // is acting up with the objects :(
        setTimeout(function(){
          $(that.element).removeClass('is-tldr-anim');

        }, 650);

        this.tldrVisible = false;
      }
    },
  };

  $('.js-tldr').each(function() {
    new rasben.Tldr({element:this});
  });

  /**
  * Controller for the extra foldout
  */
  rasben.Extra = function(options) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.Extra.prototype = {
    _attach : function() {
      if ($(this.element).hasClass('js-extra-overlay')) {
        // Fix the 'this' issue
        var that = this;

        setTimeout(function(){        
          var heightIntial = that.element.find('.js-page-header').innerHeight();
          var body = that.element.find('.js-page-body');
          var height = body.outerHeight();
          body.css({'height' : height, 'top' : heightIntial});
        }, 400); 
      }

      var controller = this.element.find('.js-extra-controller');
      this.parent = this.element;
      this.wrapper = this.element.find('.js-extra-wrapper');
      this.body = this.element.find('.js-extra-body');
      this.height = this.body.outerHeight();
      controller.on('click',this.toggle.bind(this));
    },

    toggle : function() {

      if (this.parent.hasClass('is-open')) {
        this._close(this.parent);
      }
      else {
        this._open(this.parent);
      }
    },

    _open : function(parent) {
      this.wrapper.animate({
        height: this.height+'px'
      }, 400, function() {
        $(parent).addClass('is-open');
        $(this).css({height:''});
      });
    },

    _close : function(parent) {
      this.wrapper.css('height', this.height+'px');

      this.wrapper.animate({
        height: '0px'
      }, 300, function() {
        $(parent).removeClass('is-open');
        $(this).css({height:''});
      });
    }
  };

  $('.js-extra').each(function() {
    new rasben.Extra({element:this});
  });

  /**
  * Controller for contact page.
  */
  rasben.ContactModal = function(options) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.ContactModal.prototype = {
    _attach : function() {
      this.modalBody = this.element.find('.js-contact-modal-body');
      this.placeholder = this.element.find('.js-contact-modal-placeholder');
      this.contactModalOpen = false;
      this.botDetected = false;

      this.element.find('.js-contact-modal-show').on('click',this.show.bind(this));
      this.element.find('.js-contact-modal-hide').on('click',this.hide.bind(this));
    },

    show : function(e) {
      if (!this.botDetected) {
        this.contactModalOpen = true;

        this._showCaptcha();
        //todo - is this missing other places?
        e.preventDefault();
        $(this.modalBody).addClass('is-anim');

        $(this.modalBody).addClass('is-active');

        // Fix the 'this' issue
        var that = this;

        setTimeout(function(){        
          $(that.modalBody).removeClass('is-anim');
        }, 800); 
      }
    },

    hide : function(e) {
      e.preventDefault();
      $(this.modalBody).addClass('is-anim');
      $(this.modalBody).removeClass('is-active');

      var that = this;

      setTimeout(function(){
        $(that.modalBody).removeClass('is-anim');
      }, 800);

      this.contactModalOpen = false;
    },

    _showCaptcha : function() {
      if (!($(this.element)).hasClass('is-completed')) {

        var that = this
        $.ajax({
          url: "/script/captcha/templates/captcha-markup.html",
          context: document.body,
          success: function(response){
            $(that.placeholder).html(response);
            var correctElement = $(that.placeholder).find('.js-captcha-correct');
            var incorrectElement = $(that.placeholder).find('.js-captcha-incorrect');

            correctElement.on('click',that._showDetails.bind(that));
            incorrectElement.on('click',that._botDisable.bind(that));

          }
        });
      }

    },

    _botDisable : function(e) {
      this.botDetected = true;

      this.hide(e);
    },

    _showDetails : function() {
      var that = this

      $.ajax({
        url: "/script/captcha/templates/card-markup.php",
        context: document.body,
        success: function(response) {
          $('.js-contact-modal').addClass('is-completed');
          $(that.placeholder).html(response);

        }
      });
    },
  };

  $('.js-contact-modal').each(function() {
    new rasben.ContactModal({element:this});
  });

  /**
  * Controller for Image Gallery.
  */
  rasben.Gallery = function(options) {
    this.element = $(options.element);
    this._attach();
  };

  rasben.Gallery.prototype = {
    _attach : function() {
      this.itemsContainer = this.element.find('.js-gallery-items');
      this.items = this.element.find('.js-gallery-item');
      this.length = this.items.length;
      this.position = 0;
      this.width = this._getWidth();
      this.max = this._getMax(this.length);

      this.controllerLeft = this.element.find('.js-gallery-left');
      this.controllerRight = this.element.find('.js-gallery-right');

      this.controllerLeft.on('click',this.moveLeft.bind(this));
      this.controllerRight.on('click',this.moveRight.bind(this));

      $(window).on('resize', this._recheck.bind(this));

    },

    _getWidth : function() {
      $(this.itemsContainer).hide();
      var width = $(this.items).width();
      $(this.itemsContainer).show();
      return width;
    },

    _getMax : function() {
      var max = (Math.round((this.length - (100 / this.width)) / 1) * 1);
      return max
    },

    _recheck : function() {
      this.max = this._getMax();
      this.width =  this._getWidth();

      if (this.position > this.max) {
        this.position = this.max;
      }

      $(this.itemsContainer).css('margin-left', "-" + this.position * this. width + "%");
    },

    moveLeft : function(e) {
      e.preventDefault();

      if (!(this.position <= 0)) {
        this.position = this.position-1;
        $(this.itemsContainer).css('margin-left', "-" + this.position * this.width + "%");
      }
    },

    moveRight : function(e) {
      e.preventDefault();

      if (!(this.position >= this.max)) {
        this.position++;
        $(this.itemsContainer).css('margin-left', "-" + this.position * this.width + "%");
      }
    }
  };

  $('.js-gallery').each(function() {
    new rasben.Gallery({element:this});
  });


});

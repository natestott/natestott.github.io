(function(factory) {
    factory($);
})

(function($) {
  //VARIABLES TO CHANGE//
  var circleDiameter = 100.0; //IN PIXELS
  var circleColour = 'red'; //COLOUR OF FILLED CIRCLE ARC
  var emptyColour = '#ccc'; //COLOUR OF UNFILLED CIRCLE ARC
  var animationDuration = 2000; //IN MILLISECONDS
  //MAKE TEXT IN CIRCLE CENTRAL//
  $("#circleValue1").css('top', circleDiameter/2+ 30).css('left', circleDiameter/2 - 14);
  function CircleProgress(config) {
    this.init(config);
  }
  $("#circleValue2").css('top', circleDiameter/2 + 30).css('left', circleDiameter/2 - 14);
  function CircleProgress(config) {
    this.init(config);
  }
  $("#circleValue3").css('top', circleDiameter/2 + 30).css('left', circleDiameter/2 - 14);
  function CircleProgress(config) {
    this.init(config);
  }
  $("#circleValue4").css('top', circleDiameter/2 + 30).css('left', circleDiameter/2 - 14);
  function CircleProgress(config) {
    this.init(config);
  };


  CircleProgress.prototype = {
    value: 0.0,
    size: circleDiameter,
    startAngle: -Math.PI/2,
    emptyFill: emptyColour,
    fullFill: circleColour,
    animation: {
      duration: animationDuration
    },
    animationStartValue: 0,
    insertMode: 'append',
    init: function(config) {
      $.extend(this, config);
      this.radius = this.size / 2;
      this.initWidget();
      this.initFill();
      this.draw();
      this.el.trigger('circle-inited');
    },
    initWidget: function() {
      if (!this.canvas)
        this.canvas = $('<canvas>')[this.insertMode == 'prepend' ? 'prependTo' : 'appendTo'](this.el)[0];

      var canvas = this.canvas;
      canvas.width = this.size;
      canvas.height = this.size;
      this.ctx = canvas.getContext('2d');

      if (window.devicePixelRatio > 1) {
        var scaleBy = window.devicePixelRatio;
        canvas.style.width = canvas.style.height = this.size + 'px';
        canvas.width = canvas.height = this.size * scaleBy;
        this.ctx.scale(scaleBy, scaleBy);
      }
    },
    initFill: function() {
      var self = this,
        fill = this.fill,
        ctx = this.ctx,
        size = this.size;
      function setImageFill() {
        var bg = $('<canvas>')[0];
        bg.width = self.size;
        bg.height = self.size;
        bg.getContext('d').drawImage(img, 0, 0, size, size); //
        self.drawFrame(self.lastFrameValue);
      }
    },
    draw: function() {
      if (this.animation)
        this.drawAnimated(this.value);
      else
        this.drawFrame(this.value);
    },
    drawFrame: function(v) {
      this.lastFrameValue = v;
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.drawEmptyArc(v);
      this.drawArc(v);
    },
    drawArc: function(v) {
      if (v === 0)
        return;

      var ctx = this.ctx,
        r = this.radius,
        t = this.getThickness(),
        a = this.startAngle;

      ctx.save();
      ctx.beginPath();

      if (!this.reverse) {
        ctx.arc(r, r, r - t / 2, a, a + Math.PI * 2 * v);
      } else {
        ctx.arc(r, r, r - t / 2, a - Math.PI * 2 * v, a);
      }

      ctx.lineWidth = t;
      ctx.lineCap = this.lineCap;
      ctx.strokeStyle = this.fullFill;
      ctx.stroke();
      ctx.restore();
      ctx.c
    },

    drawEmptyArc: function(v) {
      var ctx = this.ctx,
        r = this.radius,
        t = this.getThickness(),
        a = this.startAngle;

      if (v < 1) {
        ctx.save();
        ctx.beginPath();

        if (v <= 0) {
          ctx.arc(r, r, r - t / 2, 0, Math.PI * 2);
        } else {
          if (!this.reverse) {
            ctx.arc(r, r, r - t / 2, a + Math.PI * 2 * v, a);
          } else {
            ctx.arc(r, r, r - t / 2, a, a - Math.PI * 2 * v);
          }
        }

        ctx.lineWidth = t;
        ctx.strokeStyle = this.emptyFill;
        ctx.stroke();
        ctx.restore()
      }
    },

    drawAnimated: function(v) {
      var self = this,
        el = this.el,
        canvas = $(this.canvas);

      canvas.stop(true, false);
      el.trigger('circle-animation-start');

      canvas
        .css({animationProgress: 0})
        .animate({animationProgress: 1}, $.extend({}, this.animation, {
          step: function(animationProgress) {
            var stepValue = self.animationStartValue * (1 - animationProgress) + v * animationProgress;
            self.drawFrame(stepValue);
            el.trigger('circle-animation-progress', [animationProgress, stepValue]);
          }
        }))
        .promise()
        .always(function() {
          el.trigger('circle-animation-end');
        });
    },

    getThickness: function() {
      return $.isNumeric(this.thickness) ? this.thickness : this.size / 14;
    },

    getValue: function() {
      return this.value;
    },

    setValue: function(newValue) {
      if (this.animation)
        this.animationStartValue = this.lastFrameValue;
      this.value = newValue;
      this.draw();
    }
  };

  $.circleProgress = {
    defaults: CircleProgress.prototype
  };

  $.fn.circleProgress = function(configOrCommand, commandArgument) {
    var dataName = 'circle-progress',
      firstInstance = this.data(dataName);

    if (configOrCommand == 'widget') {
      if (!firstInstance)
        throw Error('Calling "widget" method on not initialized instance is forbidden');
      return firstInstance.canvas;
    }

    if (configOrCommand == 'value') {
      if (!firstInstance)
        throw Error('Calling "value" method on not initialized instance is forbidden');
      if (typeof commandArgument == 'undefined') {
        return firstInstance.getValue();
      } else {
        var newValue = arguments[1];
        return this.each(function() {
          $(this).data(dataName).setValue(newValue);
        });
      }
    }

    return this.each(function() {
      var el = $(this),
        instance = el.data(dataName),
        config = $.isPlainObject(configOrCommand) ? configOrCommand : {};

      if (instance) {
        instance.init(config);
      } else {
        var initialConfig = $.extend({}, el.data());
        if (typeof initialConfig.fill == 'string')
          initialConfig.fill = JSON.parse(initialConfig.fill);
        if (typeof initialConfig.animation == 'string')
          initialConfig.animation = JSON.parse(initialConfig.animation);
        config = $.extend(initialConfig, config);
        config.el = el;
        instance = new CircleProgress(config);
        el.data(dataName, instance);
      }
    });
  };
});

(function($){
  var val = $("#circle1").find("#circleValue1").text().match(/\d/g).join("");
    $("#circle1").circleProgress({value: val/100})
  })($);

(function($){
  var val = $("#circle2").find("#circleValue2").text().match(/\d/g).join("");
    $("#circle2").circleProgress({value: val/100})
})($);

(function($){
  var val = $("#circle3").find("#circleValue3").text().match(/\d/g).join("");
    $("#circle3").circleProgress({value: val/100})
})($);

(function($){
  var val = $("#circle4").find("#circleValue4").text().match(/\d/g).join("");
    $("#circle4").circleProgress({value: val/100})
})($);





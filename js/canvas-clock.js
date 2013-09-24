//Requires jquery just for the extend function.  

var CanvasClock = (function (options){
  'use strict';

  var SECOND_MINUTE_MOVEMENT = 0.1;
  var STARTING_OFFSET = 15; //Addes this number to the time to move the circles '0' point from 9hours to 12hour
  var settings;
  var self = this;

  var defaults = {
    
    element: 'clock',           //Canvas Element  
    timezoneOffset: null,       //This will be the offset from UTC ex. -5
    radius: 100,                //Radius of clock
    displayClockOutline: true,  //Show the clock's outer circle
    displayMinuteDashes:  true, //Show the clocks minute dashes 
    displayVertex: true,        //Center dot, not working.
    displayNumbers: true,       //Show the numbers
    
    smallPoint: this.radius / 50,  //Center dot size, not working
    
    colors:{
       backgroundColor: '#fff',
       vertexColor: '#000000',
       dashColor: '#333',
       clockColor: '#333',
       numbersColor: '#333'
    },
     
    minuteHand: {
      display: true,
      color: '#333',
      width: 2,
      length: 10
    },

    secondHand:{
      display: true,
      color: '#333',
      width: 1,
      length: 10
    },

    hourHand:{
      display: true,
      color: '#333',
      width: 2,
      length: 40
    },
    
    onLoad: null,
    onSecond: null,
    onHour: null,
    onMinute: null

  };
  
  if (options)
    updateSettings(options);

  var canvas = document.getElementById(settings.element);
  var ctx = canvas.getContext('2d');
  
  function getDate(){
    if (settings.timezoneOffset)
      return calcTime(settings.timezoneOffset);
     else
      return new Date();
  }

  function circle(length, color, fillColor) {
    length = length || settings.radius;
    ctx.beginPath();
    ctx.strokeStyle = color || settings.colors.clockColor;
    ctx.arc(canvas.width / 2, canvas.height / 2, length, 0, Math.PI * 2);
    ctx.fillStyle = fillColor || settings.colors.backgroundColor;
    ctx.fill();
    ctx.stroke();
  }
  
  function showNumbers(){
    ctx.fillStyle = settings.colors.numbersColor;
    ctx.font = 'bold 16px Arial';
    var w = canvas.width / 2;
    var h = canvas.height / 2;
    var numbers = {
      twelve: {
        x: h - 10,
        y: w - settings.radius + 24,
        text: '12'
      },
        three: {
        x: h + settings.radius - 20,
        y: w + 6,
        text: '3'
      },
      six: {
        x: h - 5,
        y: w + settings.radius - 13,
        text: '6'
      },
      nine: {
        x: h - settings.radius + 10,
        y: w + 5,
        text: '9'
      }
    };
    
    for (var obj in numbers)
      ctx.fillText(numbers[obj].text, numbers[obj].x, numbers[obj].y);
    }
  
  function second(){
    var seconds = getDate().getSeconds();
    var angle = (((seconds + STARTING_OFFSET) * Math.PI / 3) * SECOND_MINUTE_MOVEMENT);
    
    lineSegment(angle, settings.secondHand.length, settings.secondHand.width, settings.secondHand.color);
    
    if (settings.onSecond && isFunction(settings.onSecond))
      settings.onSecond.apply(this, arguments);

    if (settings.onMinute && isFunction(settings.onMinute) && seconds % 60 === 0)
      settings.onMinute.apply(this, arguments);

  }


  function minute(){
    var minute = getDate().getMinutes();
    var angle = (((minute + STARTING_OFFSET) * Math.PI / 3) * SECOND_MINUTE_MOVEMENT);
  
    lineSegment(angle, settings.minuteHand.length, settings.minuteHand.width, settings.minuteHand.color);

    if (settings.onHour && isFunction(settings.onHour) && minute % 60 === 0)
      settings.onHour.apply(this, arguments);
    
  }

  function hour(){
    var date = getDate();
    var hour = (date.getHours() > 12) ? date.getHours() - 12  :  date.getHours();
    var angle = (((hour + STARTING_OFFSET) * Math.PI / 3) * getHourMovement(date.getMinutes())); //.5 .51 .515 
    lineSegment( angle,  settings.hourHand.length, settings.hourHand.width, settings.hourHand.color );
  }
  
  //move the hour hand slightly during the hour
  function getHourMovement(minute){
    if (minute >= 15 && minute < 30)
      return 0.505;
    else if (minute >= 30 && minute < 45)
      return 0.51;
    else if (minute >= 45)
      return 0.52;
    else
      return 0.5;
  }

  function lineSegment( angle, len, width, color ) {
    var x1 = Math.cos(angle) * (settings.radius - (len || 0));
    var y1 = Math.sin(angle) * (settings.radius - (len || 0));
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 - x1, canvas.height / 2 - y1);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.beginPath();
  }

  function dashes() {
    for (var i = 0; i < 60; i++){
      var angle = (((i + STARTING_OFFSET) * Math.PI / 3) * SECOND_MINUTE_MOVEMENT);
      var width = (i % 5) ? 1 : 4;
      lineSegment(angle, 0, width, settings.colors.dashColor );
    }
    dashWidth(7);
  }
  
  //Cheesy way to just show the hashs
  //Overlay a smaller white circle
  function dashWidth(length){
    circle(settings.radius - length, settings.colors.backgroundColor, settings.colors.backgroundColor);
  }
  
  function vertex() {
    circle(settings.smallPoint, settings.colors.vertexColor, settings.colors.vertexColor);
  }
  function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var newDateWithOffset = new Date(utc + (3600000*offset));
    return newDateWithOffset;
  }

  function init(){
    var fns = [];
    if (settings.displayClockOutline)
      fns.push(circle);
   
    if (settings.displayMinuteDashes)
      fns.push(dashes);
    
    if (settings.displayVertex)
      fns.push(vertex);
    
    if (settings.minuteHand.display)
      fns.push(minute);
      
    if (settings.secondHand.display)
      fns.push(second);
   
    if (settings.hourHand.display)
      fns.push(hour);
    
    if (settings.displayNumbers)
      fns.push(showNumbers);
    
    return fns;
  }

  function display(){
    if (settings.onLoad && isFunction(settings.onLoad))
      settings.onLoad.apply(this, arguments);
    
    setInterval(function(){
      var fns = init();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fns.forEach(function(fn) {
        ctx.save();
        fn();
        ctx.restore();
      });
    }, 1000);
  }

    
  function timezoneOffset(timezone){
    if (timezone !== null && timezone !== undefined){
      settings = $.extend(settings, {timezoneOffset: timezone});  
    } else {
      return settings.timezoneOffset || -getDate().getTimezoneOffset() / 60;
    }
  }

  function updateSettings(options){
    
    var currentSettings = defaults;

    if (settings !== null && settings !== undefined)
      currentSettings = settings;

    if (options){
      //if jquery exists extend the defaults with the options passed in
      //if not then just use the defaults.
      if (jQuery)
        settings = $.extend({}, currentSettings, options);
      else
        settings = defaults;
    
    }else{
      return settings;
    }
  }

  function isFunction(fn){
    if (typeof fn === 'function')
      return true;
    else 
      return false;
  }

  return {
    display: display,
    timezoneOffset : timezoneOffset,
    settings: updateSettings
   };

});




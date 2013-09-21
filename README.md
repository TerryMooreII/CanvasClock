CanvasClock
===========

JavaScript module that will load a clock in a canvas element.


##Options
-----------
Note: i need to format

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
    }
  };
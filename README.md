CanvasClock
===========

JavaScript module that will load a clock in a canvas element.

###How to use

Include the JavaScript file also this depends on jQuery, i am working to remove that dependancy

````html
<script type="text/javascript" src="js/canvas-clock.js"></script>
<canvas id="clock"></canvas>

````

Then add this to enable the clock and its settings

````javascript
var clock = new CanvasClock({
	element: 'clock'   //This is mandatory and its the ID of the canvas element.
  	//Set what ever options you want to change, see below
});
````
The display it

````javascript
clock.display();
````

Or everything inline
````javascript
new CanvasClock({
	element: 'clock'   //This is mandatory and its the ID of the canvas element.
  	//Set what ever options you want to change, see below
}).display();
````

###Methods

The methods work just like jQuery, where the same method is either a getter or a setter.

Get/Set the timezoneOffset
Ex.  -5 or 1 etc.

````javascript
clock.timezoneOffset();       //Returns the value.  Ex -5

clock.timezoneOffset('-1');   //Set the timezoneOffset to -1. Clock changes on next tick.
````



##Options

Here are the list of options that you can pass at start up and their default value. 
````javascript
{
    element: 'clock',           //Canvas Element  
    timezoneOffset: null,       //This will be the offset from UTC ex. -5
    radius: 100,                //Radius of clock
    displayClockOutline: true,  //Show the clock's outer circle
    displayMinuteDashes:  true, //Show the clocks minute dashes 
    displayVertex: true,        //Center dot, not working.
    displayNumbers: true,       //Show the numbers
    
    smallPoint: this.radius / 50,  //Center dot size, not working
    
    colors:{
       backgroundColor: '#fff',		//Background color
       vertexColor: '#000000',		//Color of the vertex Not implemented
       dashColor: '#333',			//Dash color 
       clockColor: '#333',			//Outside border of the clock
       numbersColor: '#333'			//Color of the numbers
    },
     
    minuteHand: {
      display: true,
      color: '#333',
      width: 2,				//Width of the hand
      length: 10 			//Note: Working on a good fomular for the length
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
};````
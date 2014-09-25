#!/usr/bin/env node
var b = require('bonescript');
var i2c = require('i2c');
var address = 0x70;                           
var matrix = new i2c(address, {device: '/dev/i2c-1'});

var fs = require('fs');
var eQEP0 = "/sys/devices/ocp.3/48300000.epwmss/48300180.eqep/",
    eQEP1 = "/sys/devices/ocp.3/48302000.epwmss/48302180.eqep/",
    eQEP2 = "/sys/devices/ocp.3/48304000.epwmss/48304180.eqep/",
    eQEP = eQEP2;
var oldData,            // pervious data read
    oldData2,
    period = 100;       // in ms





var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_17';
var button4 = 'P9_18';
var bClear  = 'P9_23';

var LED1 = 'P9_12';
var LED2 = 'P9_15';
var LED3 = 'P9_14';
var LED4 = 'P9_16';

var i;
var j;

var number=8;
var z=0;
var y=0;



matrix.writeBytes(0x21, 0x00);            // 8x8 Bi-Color LED Matrix Set-up
matrix.writeBytes(0x81, 0x00);            // Display on and no blinking
matrix.writeBytes(0xE7, 0x00);      // Configures the brightness

var red = [0x01,0x01,0x01,0x01,0x01,0x00,0x00,0x00];    // Red Pixels
var green = [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]; 


b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(button2, b.INPUT, 7, 'pulldown');
b.pinMode(button3, b.INPUT, 7, 'pulldown');
b.pinMode(button4, b.INPUT, 7, 'pulldown');
b.pinMode(bClear, b.INPUT, 7, 'pulldown');

b.pinMode(LED1, b.OUTPUT,7);
b.pinMode(LED2, b.OUTPUT,7);
b.pinMode(LED3, b.OUTPUT,7);
b.pinMode(LED4, b.OUTPUT,7);

var faq = new Array(number);
for (i=0; i<number; i++)
faq[i]=new Array(number);

for(i=0; i<number; i++){
    for(j=0;j<number;j++){
    faq[i][j]=0;
    }
}

for (i=0; i<number; i++){
        console.log(faq[i]);
        var gridToParse = faq[i].join('');
        red[i] = parseInt(gridToParse,2);
        console.log("red is "+red[i]);
        matrix.writeBytes(i*2, [green[i], red[i]]);
}

setInterval(readEncoder, period); 

//b.attachInterrupt(button1, true, b.CHANGE, printStatus1);
//b.attachInterrupt(button2, true, b.CHANGE, printStatus2);
b.attachInterrupt(button3, true, b.CHANGE, printStatus3);
b.attachInterrupt(button4, true, b.CHANGE, printStatus4);
b.attachInterrupt(bClear,  true, b.CHANGE, printStatus5);



function printStatus1(x1)
{     
  if(x1.value ==1)
  {
    b.digitalWrite(LED1,b.HIGH);
    if(z>0)z=z-1;
  }  
  if(x1.value ==0)
  {
    b.digitalWrite(LED1,b.LOW);
    console.log("y is " +y);
    console.log("z is " +z);
  
    faq[y][z]=1;
 
    for (i=0; i<number; i++)
    {
     console.log(faq[i]);
    
     var gridToParse = faq[i].join('');
     red[i] = parseInt(gridToParse,2);
     matrix.writeBytes(i*2, [green[i], red[i]]);
     console.log("empt print to i2c");
     }
}
}

function printStatus2(x2)
{
  if(x2.value ==1)
  {
    b.digitalWrite(LED2,b.HIGH);
    if(z<number-1)z=z+1;
  }
  if(x2.value ==0)
  {
    b.digitalWrite(LED2,b.LOW);
    console.log("y is " +y);
    console.log("z is " +z);

    faq[y][z]=1;

    for (i=0; i<number; i++)
    {
    //  console.log(faq[i]);
    
     var gridToParse = faq[i].join('');
        red[i] = parseInt(gridToParse,2);
        matrix.writeBytes(i*2, [green[i], red[i]]);
}
}
}

function printStatus3(x3)
{
  if(x3.value ==1)
  {
  b.digitalWrite(LED3,b.HIGH);
  if(y>0)y=y-1;
  }
  if(x3.value ==0)
  {
  b.digitalWrite(LED3,b.LOW);
  
  console.log("y is " +y);
  console.log("z is " +z);

  faq[y][z]=1;

  for (i=0; i<number; i++)
  {
  console.log(faq[i]);
  
   var gridToParse = faq[i].join('');
        red[i] = parseInt(gridToParse,2);
        matrix.writeBytes(i*2, [green[i], red[i]]);
	}
  }

}


function printStatus4(x4)
{
  if(x4.value ==1)
  {
  b.digitalWrite(LED4,b.HIGH);
  if(y<number-1)y=y+1;
  }
  if(x4.value ==0)
  {
  b.digitalWrite(LED4,b.LOW); 
  
  console.log("y is " +y);
  console.log("z is " +z);
  
  faq[y][z]=1;

  for (i=0; i<number; i++)
 {
 //console.log(faq[i]);
  
   var gridToParse = faq[i].join('');
        red[i] = parseInt(gridToParse,2);
        matrix.writeBytes(i*2, [green[i], red[i]]);
}  
}
}

function printStatus5(x5){
  if(x5.value ==1){
    for(i=0; i<number; i++){
      for(j=0; j<number; j++){
         faq[i][j]=0;
      }
    }
  }
  if(x5.value ==0)
  {  
   // console.log('refresh grids');
    for (i=0; i<number; i++)
    {
    //console.log(faq[i]);
    var gridToParse = faq[i].join('');
    red[i] = parseInt(gridToParse,2);
    matrix.writeBytes(i*2, [green[i], red[i]]);
    }
  } 
}

function readEncoder(x) {
    fs.readFile(eQEP + 'position', {encoding: 'utf8'}, printValue);
 }

 function printValue(err, data) {
     if (err) throw err;

     if (data>oldData){
	console.log('data: '+data +'oldData' +oldData);
    	if(z<7)z=z+1;
    	faq[y][z]=1;
    	for (i=0; i<number; i++){
     		console.log(faq[i]);
     		var gridToParse = faq[i].join('');
     		red[i] = parseInt(gridToParse,2);
     		matrix.writeBytes(i*2, [green[i], red[i]]);
     		console.log("empt print to i2c");
        	}
        }

     if (data<oldData){
        console.log('data: '+data +'oldData' +oldData);   
        if(z>0)z=z-1;
        faq[y][z]=1;
        for (i=0; i<number; i++){
                console.log(faq[i]);
                var gridToParse = faq[i].join('');
                red[i] = parseInt(gridToParse,2);
                matrix.writeBytes(i*2, [green[i], red[i]]);
                console.log("empt print to i2c");
                }
        }





	if (oldData !== data) {
        	console.log('position: '+data); //+' speed: '+(oldData-data));
		oldData = data;
         }




 }





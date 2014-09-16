#!/usr/bin/env node
var b = require('bonescript');
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

var number=15;
var z=0;
var y=0;


b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(button2, b.INPUT, 7, 'pulldown');
b.pinMode(button3, b.INPUT, 7, 'pulldown');
b.pinMode(button4, b.INPUT, 7, 'pulldown');
b.pinMode(bClear, b.INPUT, 7, 'pulldown');

b.pinMode(LED1, b.OUTPUT,7);
b.pinMode(LED2, b.OUTPUT,7);
b.pinMode(LED3, b.OUTPUT,7);
b.pinMode(LED4, b.OUTPUT,7);

var faq = new Array(number)
for (i=0; i<number; i++)
faq[i]=new Array(number);

for(i=0; i<number; i++){
    for(j=0;j<number;j++){
    faq[i][j]=0;
    }
}

b.attachInterrupt(button1, true, b.CHANGE, printStatus1);
b.attachInterrupt(button2, true, b.CHANGE, printStatus2);
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
      console.log(faq[i]);
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
  console.log(faq[i]);
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
    console.log('refresh grids');
    for (i=0; i<number; i++)
    {
    console.log(faq[i]);
    }
  } 
}




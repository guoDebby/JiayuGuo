#!/usr/bin/env node
var b = require('bonescript');
var button1 = 'P9_11';
var button2 = 'P9_13';
var button3 = 'P9_17';
var button4 = 'P9_42';


var LED1 = 'P9_12';
var LED2 = 'P9_15';
var LED3 = 'P9_14';
var LED4 = 'P9_16';

var state1=0;
var state2=0;
var state3=0;
var state4=0;

var oldstate1=0;
var oldstate2=0;
var oldstate3=0;
var oldstate4=0;
var i;
var j;


var x=0;
var y=0;
var oldX = 0;
var oldY = 0;

b.pinMode(button1, b.INPUT, 7, 'pulldown');
b.pinMode(button2, b.INPUT, 7, 'pulldown');
b.pinMode(button3, b.INPUT, 7, 'pulldown');
b.pinMode(button4, b.INPUT, 7, 'pulldown');

b.pinMode(LED1, b.OUTPUT,7);
b.pinMode(LED2, b.OUTPUT,7);
b.pinMode(LED3, b.OUTPUT,7);
b.pinMode(LED4, b.OUTPUT,7);

var faq = new Array(15)
for (i=0; i<15; i++)
faq[i]=new Array(15);

for(i=0; i<15; i++){
    for(j=0;j<15;j++){
    faq[i][j]=0;
    }
}
for (i=0; i<15; i++)
{
console.log(faq[i]);
}

while(1){
     state1 = b.digitalRead(button1);

     state2 = b.digitalRead(button2);

     state3 = b.digitalRead(button3);
     
     state4 = b.digitalRead(button4);


     if( (state1 == 1) &&(oldstate1 ==0) ){
     b.digitalWrite(LED1,b.HIGH);
     if(x>0)x=x-1;
     }
     else if((state2 == 1)&&(oldstate2==0)){
     b.digitalWrite(LED2,b.HIGH);
     if(x<14)x=x+1;
     }
     else if((state3 == 1)&&(oldstate3==0)){
     b.digitalWrite(LED3,b.HIGH);
     if(y>0)y=y-1;
     }
     else if((state4 == 1)&&(oldstate4==0)){
     b.digitalWrite(LED4,b.HIGH);
     if(y<14)y=y+1;
     }else{
     b.digitalWrite(LED1,b.LOW);
     b.digitalWrite(LED2,b.LOW);
     b.digitalWrite(LED3,b.LOW);
     b.digitalWrite(LED4,b.LOW);
     }

     faq[y][x]=1;

  if((oldX!= x)||(oldY!=y)){
  console.log("y is " +y);
  console.log("x is " +x);


  for (i=0; i<15; i++)
  {
  console.log(faq[i]);
  }

}
   oldstate1 = state1;
   oldstate2 = state2;
   oldstate3 = state3;
   oldstate4 = state4;
   oldX=x;
   oldY=y;
}





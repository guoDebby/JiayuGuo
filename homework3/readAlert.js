#!/usr/bin/env node
var b = require('bonescript');


var button = 'P9_42';
b.pinMode(button, b.INPUT, 7, 'pullup');
b.attachInterrupt(button, true, b.CHANGE, printStatus);

function printStatus(x)
{
      console.log(x.value);
}


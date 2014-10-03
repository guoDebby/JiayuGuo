 var socket;
    var firstconnect = true,
        i2cNum  = "0x70",
	greenDisp = [];
	redDisp = [];

// Create a matrix of LEDs inside the <table> tags.
var matrixData;
for(var j=7; j>=0; j--) {
	matrixData += '<tr>';
	for(var i=0; i<8; i++) {
	    matrixData += '<td><div class="LED" id="id'+i+'_'+j+
		'" onclick="LEDclick('+i+','+j+')">'+
		i+','+j+'</div></td>';
	    }
	matrixData += '</tr>';
}
$('#matrixLED').append(matrixData);

// The slider controls the overall brightness
$("#slider1").slider({min:0, max:15, slide: function(event, ui) {
	socket.emit("i2cset",  {i2cNum: i2cNum, i: ui.value+0xe0, disp: 1});
    }});

// Send one column when LED is clicked.
function LEDclick(i, j) {
//	alert(i+","+j+" clicked");

	var val = 1*( (greenDisp[i]  >>j) & 1 ) + ( (redDisp[i]  >>j) & 1 ) *2;

    greenDisp[i] |= 0x1<<j;
	redDisp[i] |= 0x1<<j;
	
	if(val ==2 || val ==3)
		greenDisp[i] ^= 0x1<<j;
	if(val ==0 || val ==2)
		redDisp[i] ^= 0x1<<j;
	
	
    socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i, 
			     disp: '0x'+greenDisp[i].toString(16)});
    socket.emit('i2cset', {i2cNum: i2cNum, i: 2*i+1, 
			     disp: '0x'+redDisp[i].toString(16)});

	$('#id' + i + '_' + j).removeClass('grn1');
	$('#id' + i + '_' + j).removeClass('red2');
	$('#id' + i + '_' + j).removeClass('org3');
	$('#id' + i + '_' + j).removeClass('noClolor');

	if(val ==0)
		$('#id' + i + '_' + j).addClass('grn1');
	else if(val ==1)
		$('#id' + i + '_' + j).addClass('org3');
	else if(val ==2)
		$('#id' + i + '_' + j).addClass('noColor');
	else if(val ==3)
		$('#id' + i + '_' + j).addClass('red2');
		
				 
				 
}

    function connect() {
      if(firstconnect) {
        socket = io.connect(null);

        // See https://github.com/LearnBoost/socket.io/wiki/Exposed-events
        // for Exposed events
        socket.on('message', function(data)
            { status_update("Received: message " + data);});
        socket.on('connect', function()
            { status_update("Connected to Server"); });
        socket.on('disconnect', function()
            { status_update("Disconnected from Server"); });
        socket.on('reconnect', function()
            { status_update("Reconnected to Server"); });
        socket.on('reconnecting', function( nextRetry )
            { status_update("Reconnecting in " + nextRetry/1000 + " s"); });
        socket.on('reconnect_failed', function()
            { message("Reconnect Failed"); });

        socket.on('matrix',  matrix);

    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x21, greenDisp: 1}); // Start oscillator (p10)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0x81, greenDisp: 1}); // greenDisp on, blink off (p11)
    socket.emit('i2cset', {i2cNum: i2cNum, i: 0xe7, greenDisp: 1}); // Full brightness (page 15)
    /*
	i2c_smbus_write_byte(file, 0x21); 
	i2c_smbus_write_byte(file, 0x81);
	i2c_smbus_write_byte(file, 0xe7);
    */
        // Read greenDisplay for initial image.  Store in greenDisp[]
        socket.emit("matrix", i2cNum);

        firstconnect = false;
      }
      else {
        socket.socket.reconnect();
      }
    }

    function disconnect() {
      socket.disconnect();
    }

    // When new data arrives, convert it and greenDisplay it.
    // data is a string of 16 values, each a pair of hex digits.
    function matrix(data) {
        var i, j;
        greenDisp = [];
        //        status_update("i2c: " + data);
        // Make data an array, each entry is a pair of digits
        data = data.split(" ");
        //        status_update("data: " + data);
        // Every other pair of digits are Green. The others are red.
        // Ignore the red.
        // Convert from hex.
        for (i = 0; i < data.length; i += 2) {
            greenDisp[i / 2] = parseInt(data[i], 16);
        }
		for (i = 1; i < data.length; i += 2) {
            redDisp[(i-1) / 2] = parseInt(data[i], 16);
        }
        //        status_update("greenDisp: " + greenDisp);
        // i cycles through each column
        for (i = 0; i < greenDisp.length; i++) {
		
            // j cycles through each bit
			for(var j=0;j<8;j++){
				var val = 1*( (greenDisp[i]  >>j) & 1 ) + ( (redDisp[i]  >>j) & 1 ) *2;
				console.log(val+ " "+i+ " "+j);
				
				if(val ==1)
					$('#id' + i + '_' + j).addClass('grn1');
				else if(val ==2)
					$('#id' + i + '_' + j).addClass('red2');
				else if(val ==3)
					$('#id' + i + '_' + j).addClass('org3');
				else if(val ==0)
					$('#id' + i + '_' + j).addClass('noColor');
		
			}
        }
    }

    function status_update(txt){
	$('#status').html(txt);
    }

    function updateFromLED(){
      socket.emit("matrix", i2cNum);    
    }

connect();

$(function () {
    // setup control widget
    $("#i2cNum").val(i2cNum).change(function () {
        i2cNum = $(this).val();
    });
});

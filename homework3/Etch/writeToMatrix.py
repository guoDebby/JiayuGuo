import Adafruit_BBIO.GPIO as GPIO
from Adafruit_LED_Backpack import BicolorMatrix8x8
from time import sleep


display = BicolorMatrix8x8.BicolorMatrix8x8()

display.begin()
display.clear()
display.write_display()
LED_1 = "P9_12"
LED_2 = "P9_14"
LED_3 = "P9_15"
LED_4 = "P9_16"


BUTTON_1 = "P9_18"
BUTTON_2 = "P9_17"
BUTTON_3 = "P9_11"
BUTTON_4 = "P9_13"
BUTTON_5 = "P9_23"

GPIO.setup(BUTTON_1, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(BUTTON_2, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(BUTTON_3, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(BUTTON_4, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(BUTTON_5, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


GPIO.setup(LED_1, GPIO.OUT)
GPIO.setup(LED_2, GPIO.OUT)
GPIO.setup(LED_3, GPIO.OUT)
GPIO.setup(LED_4, GPIO.OUT)

GPIO.add_event_detect(BUTTON_1, GPIO.RISING)
GPIO.add_event_detect(BUTTON_2, GPIO.RISING)
GPIO.add_event_detect(BUTTON_3, GPIO.RISING)
GPIO.add_event_detect(BUTTON_4, GPIO.RISING)
GPIO.add_event_detect(BUTTON_5, GPIO.RISING)


size = 8
currentX = 0
currentY = 0
matrix = []                                  
for i in range(0,size):   
    new = []              
    for j in range (0, size):
        new.append(0)    
    matrix.append(new) 


matrix[currentX][currentY] = 1
display.set_pixel(currentX, currentY, 1)
display.write_display()

while (True):
	if GPIO.event_detected(BUTTON_1):
		print "b1 is press"
		if currentX != 0:
			GPIO.output(LED_1, not GPIO.input(LED_1))
			currentX = currentX - 1
			matrix[currentX][currentY] = 1
			display.set_pixel(currentX, currentY, 1)
			display.write_display()
			sleep(1)
	if GPIO.event_detected(BUTTON_2):
		if currentX != size - 1:
			GPIO.output(LED_2, not GPIO.input(LED_2))
			currentX = currentX + 1
			matrix[currentX][currentY] = 1
			display.set_pixel(currentX, currentY, 1)
			display.write_display()
			sleep(1)
	if GPIO.event_detected(BUTTON_3):
		if currentY != 0:
			GPIO.output(LED_3, not GPIO.input(LED_3))
			currentY = currentY - 1
			matrix[currentX][currentY] = 1
			display.set_pixel(currentX, currentY, 1)
			display.write_display()
			sleep(1)
	if GPIO.event_detected(BUTTON_4):
		if currentY != size - 1:
			GPIO.output(LED_4, not GPIO.input(LED_4))
			currentY = currentY + 1
			matrix[currentX][currentY] = 1
			display.set_pixel(currentX, currentY, 1)
			display.write_display()
			sleep(1)

	if GPIO.event_detected(BUTTON_5):
		display.clear()
		display.write_display()


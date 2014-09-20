#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include "libsoc_gpio.h"
#include "libsoc_debug.h"

#define GPIO_OUTPUT1 48 //P9_12
#define GPIO_OUTPUT2 50 //P9_14
#define GPIO_OUTPUT3 51 //P9_15
#define GPIO_OUTPUT4 52 //P9_16

#define GPIO_INPUT1 47 //P9_11
#define GPIO_INPUT2 59 //P9_13
#define GPIO_INPUT3 53 //P9_17
#define GPIO_INPUT4 54 //P9_18


int main(void) {
gpio *gpio_output1; // Create gpio pointer
gpio *gpio_output2; // Create gpio pointer
gpio *gpio_output3; // Create gpio pointer
gpio *gpio_output4; // Create gpio pointer

gpio *gpio_input1; // Create gpio pointer
gpio *gpio_input2; // Create gpio pointer
gpio *gpio_input3; // Create gpio pointer
gpio *gpio_input4; // Create gpio pointer


libsoc_set_debug(1); // Enable debug output

// Request gpio
gpio_output1 = libsoc_gpio_request(GPIO_OUTPUT1, LS_SHARED);
gpio_output2 = libsoc_gpio_request(GPIO_OUTPUT2, LS_SHARED);
gpio_output3 = libsoc_gpio_request(GPIO_OUTPUT3, LS_SHARED);
gpio_output4 = libsoc_gpio_request(GPIO_OUTPUT4, LS_SHARED);

gpio_input1 = libsoc_gpio_request(GPIO_INPUT1, LS_SHARED);
gpio_input2 = libsoc_gpio_request(GPIO_INPUT2, LS_SHARED);
gpio_input3 = libsoc_gpio_request(GPIO_INPUT3, LS_SHARED);
gpio_input4 = libsoc_gpio_request(GPIO_INPUT4, LS_SHARED);

// Set direction to OUTPUT
libsoc_gpio_set_direction(gpio_output1, OUTPUT);
libsoc_gpio_set_direction(gpio_output2, OUTPUT);
libsoc_gpio_set_direction(gpio_output3, OUTPUT);
libsoc_gpio_set_direction(gpio_output4, OUTPUT);

libsoc_gpio_set_direction(gpio_input1, INPUT);
libsoc_gpio_set_direction(gpio_input2, INPUT);
libsoc_gpio_set_direction(gpio_input3, INPUT);
libsoc_gpio_set_direction(gpio_input4, INPUT);

libsoc_set_debug(0); // Turn off debug printing for fast toggle

int i;
for (i=0; i<1000000; i++) { // Toggle the GPIO 100 times
libsoc_gpio_set_level(gpio_output1, HIGH);
libsoc_gpio_set_level(gpio_output2, HIGH);
libsoc_gpio_set_level(gpio_output3, HIGH);
libsoc_gpio_set_level(gpio_output4, HIGH);

usleep(100000); // sleep 100,000 uS
libsoc_gpio_set_level(gpio_output1, LOW);
libsoc_gpio_set_level(gpio_output2, LOW);
libsoc_gpio_set_level(gpio_output3, LOW);
libsoc_gpio_set_level(gpio_output4, LOW);

 usleep(100000);
}
if (gpio_output1) {
libsoc_gpio_free(gpio_output1); // Free gpio request memory
}

if (gpio_output2) {
libsoc_gpio_free(gpio_output2); // Free gpio request memory
}

if (gpio_output3) {
libsoc_gpio_free(gpio_output3); // Free gpio request memory
}

if (gpio_output4) {
libsoc_gpio_free(gpio_output4); // Free gpio request memory
}

return EXIT_SUCCESS;
}


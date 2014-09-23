if [ $# -lt 6 ]; then
    echo "Usage: $ <device1 id> ,<device2 id>, <device1 LOW TEMP>, <device2 HIGH TEMP>, <device1 LOW TEMP>, <device2 HIGH TEMP>"
    exit 0
fi

#read tempreture
TEMP_1=$(i2cget -y 1 0x"$1" 0)
TEMP_2=$(i2cget -y 1 0x"$2" 0)

echo "The Temperature @ I2C device "$1" is $TEMP_1 F"
echo "The Temperature @ I2C device "$2" is $TEMP_2 F"

#set configure byte
i2cset -y 1 0x"$1" 1 0x04 b
i2cset -y 1 0x"$2" 1 0x04 b

# Set lower threshold
i2cset -y 1 0x"$1" 2 0x"$3" b
i2cset -y 1 0x"$2" 2 0x"$5" b

# Set higher threshold
i2cset -y 1 0x"$1" 3 0x"$4" b
i2cset -y 1 0x"$2" 3 0x"$6" b

# get limited tempreture range
TEMPL_1=$(i2cget -y 1 0x"$1" 2)
TEMPH_1=$(i2cget -y 1 0x"$1" 3)

echo " The LOW Temperature limit I2C device "$1" is $TEMPL_1 F"
echo "The HIGH Temperature limit I2C device "$1" is $TEMPH_1 F"

TEMPL_2=$(i2cget -y 1 0x"$2" 2)
TEMPH_2=$(i2cget -y 1 0x"$2" 3)

echo " The LOW Temperature limit I2C device "$2" is $TEMPL_2 F"
echo "The HIGH Temperature limit I2C device "$2" is $TEMPH_2 F"

#read the configure byte 
alert_1=$(i2cget -y 1 0x"$1" 1)
alert_2=$(i2cget -y 1 0x"$2" 1)
echo "The conf btye @ I2C device "$1" is $alert_1 "
echo "The conf btye @ I2C device "$2" is $alert_2 "





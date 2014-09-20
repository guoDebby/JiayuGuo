if [ $# -lt 4 ]; then
    echo "Usage: $ <device1 id> ,<device2 id>, <HIGH TEMP>, <LOW TEMP>"
    exit 0
fi
DEVICE_1=$1
DEVICE_2=$2

#set up the registers properly
TEMP_1=$(i2cget -y 1 0x"$1" 0)
TEMP_2=$(i2cget -y 1 0x"$2" 0)

echo "The Temperature @ I2C device "$1" is $TEMP_1 F"
echo "The Temperature @ I2C device "$2" is $TEMP_2 F"

i2cset -y 1 0x"$1" 1 0x82 b
# Set lower threshold
i2cset -y 1 0x"$1" 2 0x"$3" b
# Set higher threshold
i2cset -y 1 0x"$1" 3 0x"$4" b

if [ $# -lt 1 ]; then
    echo "Usage: $ <device1 id> ,device2 id."
    exit 0
fi
DEVICE_1=$1
DEVICE_2=$2

#set up the registers properly
TEMP_1=$(i2cget -y 1 0x"$1" 0)
TEMP_2=$(i2cget -y 1 0x"$2" 0)

echo "The Temperature @ I2C device "$1" is $TEMP_1 F"
echo "The Temperature @ I2C device "$2" is $TEMP_2 F"


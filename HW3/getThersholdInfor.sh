
#set up the registers properly
TEMPL=$(i2cget -y 1 0x48 2)
TEMPH=$(i2cget -y 1 0x48 3)

echo "The LOW Temperature is $TEMPL F"
echo "The HIGH Temperature is $TEMPH F"




# blenoexample
node js bleno ble peripheral for raspberry pi
<br>
If You want to use this in raspberry pi. Follow the steps below.
1. Clone this project
2. Go to the this repository in your local repository with terminal.
3. Install Node:
    `sudo apt install node`
4. Install bluez for your Raspberry to work with bluetooth: 
    `sudo apt install bluetooth bluez libbluetooth-dev libudev-dev`
5. Install bleno node js module: 
    `npm install bleno --save`
6. The bluetooth system service needs to be disabled for bleno to work, otherwise some operations will just fail silently. This is quite easy to miss" 
    `sudo service bluetooth stop
     sudo hciconfig hci0 up # reactivate hci0 or another hciX you want to use`
7. Run the application: 
    `sudo npm run peripheral`

8. It is time to look for the peripheral in your BLE Client App. 

Enjoy 😊

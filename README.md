# blenoexample
node js bleno ble peripheral for raspberry pi
<br>
If You want to use this in raspberry pi. Follow the steps below.
1. Clone this project 
2. Go to the this repository in your local repository with terminal and git checkout experiment branch.<br> `git checkout experiment`
3. Install Node:
    `sudo apt install node`
4. Install bluez for your Raspberry to work with bluetooth: 
    `sudo apt install bluetooth bluez libbluetooth-dev libudev-dev`
5. Install bleno node js module: 
    `npm install bleno --save`
6. The bluetooth system service needs to be disabled for bleno to work, otherwise some operations will just fail silently. This is quite easy to miss" 
    `sudo service bluetooth stop
<<<<<<< HEAD
     sudo hciconfig hci0 up # reactivate hci0 or another hciX you want to use`
7. Go to LighControl folder in your terminal.  <br> `cd LighControl`
8. Run the application: <br>
    `sudo node LightControlService`
=======
     sudo hciconfig hci0 up`
     <br># reactivate hci0 or another hciX you want to use`
7. Run the application: 
    `sudo npm run peripheral`
>>>>>>> a1790bb138f37b540f8657a3ba46a92795df0694

8. It is time to look for the peripheral in your BLE Client App. 

Enjoy 😊

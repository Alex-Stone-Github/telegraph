const lastLetterHTML = document.getElementById("last-letter");
const THRESHHOLD = 100;
var mic, fft, osc;
var playing = false;
var message = [0,0,0,0,0,0,0,0,0,0]; // just some padding

function converToLetter(hist) {
    let total = 0;
    for (let i = 0; i < 8; i ++) {
        total += message[i] == 1? Math.pow(2, i+1) : 0;
    }
    return String.fromCharCode(total);
}

function setup() {
    createCanvas(400, 400);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    osc = new p5.Oscillator(20154);
}

function draw() {
    // get sound
    fft.analyze();
    let scaler = fft.getEnergy(20154); // outside of our sound range

    // display info
    background(0, 0, 255);
    if (scaler > 100)
        background(255, 0, 0);

    // all advanced stuff
    message.push(scaler? 1 : 0);
    if (message.length > 8)
        message.shift();

    //rect(0, 0, width, height * scaler/255);
    //lastLetterHTML.innerHTML = converToLetter(message);
}

function sendData() {
    if (playing === false) {
        playing = true;
        osc.start();
    }
    else {
        playing = false;
        osc.stop();
    }
}

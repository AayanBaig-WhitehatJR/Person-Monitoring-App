dog_cat = ""
status = ""
objects = []
percentage = ""
alertSound = ""
function preload(){
    dog_cat = loadImage("dog_cat.jpg")
    alertSound = loadSound("alert.mp3")
}
function setup(){
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO)
video.size(380, 380)
video.hide()
objectDetector = ml5.objectDetector("cocossd", modelLoaded)
document.getElementById("status").innerHTML = "Status: Detecting Objects..."
}
function modelLoaded(){
    console.log("Model Loaded.")
status = true;
}
function gotResults(error, results){
 if(error){
     console.log(error)
 }
 else{
     console.log(results)
     objects = results;
 }
}
function draw(){
    image(video, 0, 0, 380, 380)
    if(status != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResults)
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected."
            /* document.getElementById("objectsDetect").innerHTML = "Number of Objects Detected: " + objects.length; */
            if(objects[i].label == "person"){
                document.getElementById("objectsDetect").innerHTML = "Person detected."
                alertSound.stop()
            }
            else{
                document.getElementById("objectsDetect").innerHTML = "Person not detected. Alarm activated."
                alertSound.play()
           alertSound.loop(false)
            }
            if(objects[i].length == 0){
                document.getElementById("objectsDetect").innerHTML = "Person not detected. Alarm activated."
                alertSound.play()
           alertSound.loop(false)
            }
            fill(r,g,b)
            percentage = floor(objects[i].confidence*100)
            text(objects[i].label + " : " + percentage + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            console.log(percentage)
        }
 /*       fill("#8B0000")
        text("Dog", 152, 104)
        noFill()
        stroke("#8B0000")
        rect(30, 54, 550, 350)
        text("Cat", 400, 100)
        rect(290, 74, 270, 320)
        */
    }
}

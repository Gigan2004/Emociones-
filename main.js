var predicción1 = "";
var predicción2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach("#camera");
function takeSnap(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='photo' src='" + data_uri + "'>";
    
})
};
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/96IPltsuc/model.json", modelLoaded);
function modelLoaded(){
console.log("model loaded")
}
function check(){
    var img = document.getElementById("photo");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
        
        }
        else {
        console.log(results);
        document.getElementById("result_emotion").innerHTML = results[0].label;
        document.getElementById("result_emotion2").innerHTML = results[1].label;
        predicción1 = results[0].label;
        predicción2 = results[1].label;

        if (predicción1 == "Felíz"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (predicción1 == "Triste"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (predicción1 == "Enojado"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if (predicción2 == "Felíz"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (predicción2 == "Triste"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (predicción2 == "Enojado"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
        speak();
        }
    }
    function speak(){
        var synth = window.speechSynthesis;
        var speak1 = "La primer predicción es:" + predicción1;
        var speak2 = "La segunda predicción es:" + predicción2;
        var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
        synth.speak(utterThis);
    }
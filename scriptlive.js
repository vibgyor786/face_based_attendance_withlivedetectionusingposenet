let video;
let poseNet;
let poses = [];
let model, webcam, labelContainer, maxPredictions;
let canvas;
let firsttime=1
let maxi=0.1,mini=Number.MAX_VALUE
 function setup() {
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);
c=document.getElementById('defaultCanvas0')
c.width=200
c.height=200
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected

  localStorage.setItem("img", '123');

  poseNet.on('pose', function(results) {
    let para=document.getElementById('show')
    poses = results;
    if(poses[0]){
      console.log(poses[0].pose.score);
      if(poses[0].pose.score<mini){
        mini=poses[0].pose.score
      }else if(poses[0].pose.score>maxi){
        maxi=poses[0].pose.score
      }
      
        
       
    }
  });
  // Hide the video element, and just show the canvas
  video.hide();
}
setup()
function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  // for (let i = 0; i < poses.length; i++) {
  //   // For each pose detected, loop through all the keypoints
  //   let pose = poses[i].pose;
  //   for (let j = 0; j < pose.keypoints.length; j++) {
  //     // A keypoint is an object describing a body part (like rightArm or leftShoulder)
  //     let keypoint = pose.keypoints[j];
  //     // Only draw an ellipse is the pose probability is bigger than 0.2
  //     if (keypoint.score > 0.2) {
  //       fill(255, 242, 0);
  //       noStroke();
  //       ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
  //     }
  //   }
  // }
}

// A function to draw the skeletons
 function drawSkeleton() {
    // canvas=document.getElementById('defaultCanvas0')
    // // console.log(canvas)
    // const prediction = await model.predict(webcam.canvas);
    // // console.log()

    // for (let i = 0; i < maxPredictions; i++) {
    //     // console.log(labelContainer.childNodes[i].innerHTML)
    //     // labelContainer.childNodes[i].innerHTML
    //     if( prediction[i].probability>=0.96){
    //         console.log(prediction[i])
    //         // if(name==prediction[i].className){
    //         //     cnt++;
    //         // }else{
    //         //     name=prediction[i].className;
    //         //     cnt=0;
    //         // }
    //     }
    // }
    
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 242, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function capture(){
  // console.log('hi')
  let c=document.getElementById('defaultCanvas0')
  let image_data_url = c.toDataURL('image/jpeg');
	   localStorage.setItem("img", image_data_url);
    //  console.log(maxi-mini)
   
    if(maxi-mini>0.5){
      window.location.href = "https://vibgyor786.github.io/face_based_attendance_withlivedetectionusingposenet/";
    }else{
      alert("Person should be physically available")
    }
    
}

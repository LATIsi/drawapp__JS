const canvas =document.querySelector("canvas");
const lineWidth =document.getElementById("line-width");

const allColor =document.getElementById("allcolor");
const jsMode =document.getElementById("jsMode");
const colorOption =Array.from(document.getElementsByClassName("control_color"));

const buttonClear = document.getElementById("jsClear");
const buttonEraser = document.getElementById("jsEraser");

const inputFile = document.getElementById("file");
const inputText = document.getElementById("text");
const saveButton = document.getElementById("jsSave");

const selectFontFace = document.getElementById("fontSelect");
const selectFontColor = document.getElementById("fontColor");
const selectFontSize = document.getElementById("fontSize");



const canvasHeight = 1000;
const canvasWidth  = 1000;

//3d or 2d
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 550;

//폰트
let font_Alumni = new FontFace('Alumni Sans Pinstripe','url("https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&display=swap")');

let font_Roboto = new FontFace('Roboto','url("https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Roboto:wght@300&display=swap")');

let font_Nanum = new FontFace('Nanum','url("https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Nanum+Myeongjo&display=swap")');

let font_Silkscreen = new FontFace('Silkscreen','url("https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Silkscreen&display=swap")');


font_Alumni.load().then(function(){
 ctx.font = 'Alumni Sans Pinstripe';
});

font_Roboto.load().then(function(){
    ctx.font = 'Roboto';
});

font_Nanum.load().then(function(){
    ctx.font = 'Nanum';
});

font_Silkscreen.load().then(function(){
    ctx.font = 'Silkscreen';
});


//html이 먼저 load 되어서 값을 가져올수있음.
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";



// // ctx.fillRect(0,0,800,200);
// ctx.rect(100,50,100,100);
// ctx.fillStyle ="red";
// ctx.fill();

// ctx.moveTo(200,200);
// ctx.lineTo(300,200);
// ctx.stroke();


//https://flatuicolors.com/

const colors =[ 
    "black",
    "white",
    "orangered",
    "yellow",
    "greenyellow",
    "skyblue",
    "dodgerblue",
    "darkorchid"
]

ctx.lineWidth = 1;


// function onClickCanvas(event){
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     const color= colors[Math.floor(Math.random()*colors.length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX,event.offsetY);
//     ctx.stroke();
// }

let isPainting = false;
let isFilling = false;



function onClickMove(e){
    if (isPainting) {
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        return;
    }

    ctx.moveTo(e.offsetX,e.offsetY);
}


function startDraw(){
    isPainting = true;
}

function cancleDraw(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(e){
    ctx.lineWidth = e.target.value;
}

function onFontSizeChange(e){
    ctx.font = e.target.value;
}

function onColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

function onClickColor(e){
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onClickMode(e){
    
    if (isFilling) {

        isFilling=false;
        jsMode.innerHTML="Fill";

    }else{

        isFilling=true;
        jsMode.innerHTML="Draw"
    }

}

function onFillCanvas(e){
    
    if (isFilling) {
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }

}


function onClear(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}




function onDoubleClick(e){
   
   const text = inputText.value;
   if(text !== ""){
        ctx.save();
        ctx.lineWidth = 2;
        ctx.fillText(text,e.offsetX,e.offsetY);
        ctx.restore();
   }
}


function onFileChange(e){
    // 선택하는 이미지가 하나라 0번째것만 가져온다.
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.src = url;

    image.onload = function(){
        ctx.drawImage(image,0,0,canvasWidth,canvasHeight);
        // 가져온 이미지가 있어서 새로운 이미지를 다시 불러오고싶을때.
        inputFile.value= null;
    }

}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a  = document.createElement("a");

    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

// canvas.addEventListener("mousemove", onClickCanvas);
canvas.addEventListener("mousemove", onClickMove);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", cancleDraw);
canvas.addEventListener("mouseleave", cancleDraw);


canvas.addEventListener("dblclick",
onDoubleClick);


lineWidth.addEventListener("change",onLineWidthChange);
allColor.addEventListener("change",onColorChange)

colorOption.forEach((color)=>{
    color.addEventListener("click",onClickColor);
});

jsMode.addEventListener("click",onClickMode);
canvas.addEventListener("mousedown", onFillCanvas);

buttonEraser.onClcik = function onEraser(){
    ctx.strokeStyle = "white";
    isFilling = false;
};

buttonClear.addEventListener("click",onClear);


//폰트
selectFontSize.addEventListener("change",onFontSizeChange);








inputFile.addEventListener("change", onFileChange);

saveButton.addEventListener("click", onSaveClick);


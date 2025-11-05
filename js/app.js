// 캔버스 및 선 굵기
const canvas =document.querySelector("canvas");
const lineWidth =document.getElementById("line-width");


// 팔레트 변수
const allColor =document.getElementById("allcolor");
const jsMode =document.getElementById("jsMode");
const colorOption =Array.from(document.getElementsByClassName("control_color"));

// 지우개 변수
const buttonClear = document.getElementById("jsClear");
const buttonEraser = document.getElementById("jsEraser");

// 파일 불러오기
const inputFile = document.getElementById("file");
const saveButton = document.getElementById("jsSave");

// 텍스트 작성
const inputText = document.getElementById("text");
const selectFontFace = document.getElementById("fontSelect");
const selectFontColor = document.getElementById("fontColor");
const selectFontSize = document.getElementById("fontSize");



// css 버튼 작동 기능을 위한 변수들
const toggleBtns = document.querySelector(".toggle_btns");
const btns = document.querySelector(".btns");
const popOpacityBg = document.querySelector(".pop_opacity_bg");
const saveOkPopup = document.querySelector(".save_ok_popup");
const savePopupButton = document.querySelector(".save_popup_button");


// 그림판 가로 세로 넓이 불러오기
let canvasHeight = canvas.clientWidth;
let canvasWidth  = canvas.clientHeight;

// 그림판 반응형( 반응형으로 바꿀때마다 그림 초기화됨 )
window.addEventListener("resize", resizeCanvas);

function resizeCanvas(){
    canvasHeight = canvas.clientWidth;
    canvasWidth  = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    console.log("리사이즈");
}


//3d or 2d
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

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

// 색 이름 지정
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


// 마우스를 누를때 그려짐
function startDraw(){
    isPainting = true;
}

// 마우스를 뗄 때 안 그려짐
function cancleDraw(){
    isPainting = false;
    // 선 굵기나 색이 바뀌어도 괜찮게..
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



// 그림그리기 버튼 아이콘 누를시, css 메뉴 전환효과
function btnsClick(){
    btns.classList.toggle("hide");
    popOpacityBg.classList.toggle("hide");
    toggleBtns.classList.toggle("btnOn");
}

toggleBtns.addEventListener("click",btnsClick);

// 파일 저장시 나오는 팝업의 확인 버튼 누를시, css 메뉴 전환효과
function onSavePopUpButtonClick(){
    popOpacityBg.classList.toggle("hide");
    saveOkPopup.classList.toggle("hide");
    toggleBtns.classList.remove("hide");
}



function onSaveClick(){
    const url = canvas.toDataURL();
    const a  = document.createElement("a");

    saveOkPopup.classList.toggle("hide");
    btns.classList.toggle("hide");
    toggleBtns.classList.remove("btnOn");
    toggleBtns.classList.toggle("hide");

    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

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



savePopupButton.addEventListener("click",onSavePopUpButtonClick)




inputFile.addEventListener("change", onFileChange);

saveButton.addEventListener("click", onSaveClick);
saveButton.addEventListener("click", onSaveClick);


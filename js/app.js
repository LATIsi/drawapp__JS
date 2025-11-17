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


const ctx = canvas.getContext("2d");

// 그림판 가로 세로 넓이 불러오기
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// 그림판 반응형( 반응형으로 바꿀때마다 그림 초기화됨 )
window.addEventListener("resize", resizeCanvas);

function resizeCanvas(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}


//폰트 패밀리 및 사이즈 조정 - 기본;
let font_family = 'Alumni Sans Pinstripe';
let font_size = 1;


//html이 먼저 load 되어서 값을 가져올수있음.
ctx.lineWidth = lineWidth.value;

// 선 끝을 둥글게 만들기
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
        jsMode.innerHTML="Draw 🖌️";
    }else{
        isFilling=true;
        jsMode.innerHTML="All Fill 🪣"
    }

}

function onFillCanvas(e){
    
    if (isFilling) {
    ctx.fillRect(0,0,canvas.width,canvas.height);
    }

}


function onClear(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


// 글씨체 select 변경시, 현재 폰트 사이즈와 패밀리 변경 완료
function onFontFaceChange(e){
    font_family = selectFontFace.options[selectFontFace.selectedIndex].value;
    ctx.font = font_size+"px "+font_family;
}

// 글씨체 크기 변경시, 변경된 폰트 사이즈와 현재 패밀리폰트로 수정 완료
function onFontSizeChange(e){
    font_size = e.target.value;
    ctx.font = font_size+"px "+font_family;
}


function onDoubleClick(e){
   
   const text = inputText.value;
   if(text !== ""){
        ctx.save();
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
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
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
    // 이미지를 url로 변환해줌... 
    const url = canvas.toDataURL();
    // a 태그안의 download 속성을 이용!
    const a  = document.createElement("a");

    // 열린창들 css 속성 다 숨겨줌~  save ok시 보이는 popup은 보이게하고! 
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

// 마우스 더블클릭으로 텍스트 작성
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
//select 박스에서 폰트 설정시,
selectFontFace.addEventListener("change",onFontFaceChange);


savePopupButton.addEventListener("click",onSavePopUpButtonClick)




inputFile.addEventListener("change", onFileChange);

saveButton.addEventListener("click", onSaveClick);
saveButton.addEventListener("click", onSaveClick);


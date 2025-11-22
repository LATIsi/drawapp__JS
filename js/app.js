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


// 로딩화면
const loading_view = document.querySelector(".loading_view");


// 캔버스
const ctx = canvas.getContext("2d");


//폰트 패밀리 및 사이즈 조정 - 기본;
let font_family = 'Alumni Sans Pinstripe';
let font_size = 12;

// 초기 브러쉬 색깔 지정
let setBrushColor = "#000000";

// 초기 글자 색깔 지정
let setFontColor = "#000000";


//ctx.strokeStyle = e.target.value;
//ctx.fillStyle = e.target.value;
//ctx.font = font_size+"px "+ font_family;



// 브러쉬 크기 기본 설정(3)
const pencil_width = document.querySelector(".pencil_width");
const text_width = document.querySelector(".text_width");

// 그림판 가로 세로 넓이 불러오기
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// 그림판 반응형( 반응형으로 바꿀때마다 그림 초기화됨 )
window.addEventListener("resize", resizeCanvas);

function resizeCanvas(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}



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

let isPainting = false;
let isFilling = false;

// 초반에 그림판 투명이 아니라 하얗게 덮어주기 ( 지우개 사용시 이렇게 안하면 투명부분에 하얀색이 그대로 나옴..)
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);



function onClickMove(e){
    e.preventDefault();


    ctx.fillStyle = setBrushColor;
    if (isPainting) {
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX,e.offsetY);
}


// 마우스를 누를때 그려짐
function startDraw(e){
     e.preventDefault();
    ctx.strokeStyle = setBrushColor;
    ctx.fillStyle = setBrushColor;
    isPainting = true;
}

// 마우스를 뗄 때 안 그려짐
function cancleDraw(e){
     e.preventDefault();
    isPainting = false;
    // 선 굵기나 색이 바뀌어도 괜찮게..
    ctx.beginPath();


}

function onLineWidthChange(e){
    pencil_width.innerHTML= e.target.value+"px";
    ctx.lineWidth = e.target.value;
}


function onColorChange(e){
    setFontColor = e.target.value;
    ctx.strokeStyle = setFontColor;
    ctx.fillStyle = setFontColor;
}

function onClickColor(e){
   
    if(e.target.dataset.color){
         // 여러색상 input color가 아닌 li data-set로 지정한 color값 있을시 if문 실행
        setBrushColor = e.target.dataset.color;
    }else{
         // 여러색상 input color로 색 지정하면 그걸로 하기
        setBrushColor = e.target.value;
    }
    ctx.strokeStyle = setBrushColor;
    ctx.fillStyle = setBrushColor;
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
    e.preventDefault();
    if (isFilling) {
        ctx.fillStyle = setBrushColor;
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
    text_width.innerHTML= font_size +"px";
    ctx.font = font_size+"px "+font_family;
}

//더블탭 감지 변수
let lastTap = 0;

function onDoubleClick(e){
   const text = inputText.value;
   
    const now = Date.now();
         // 지금시간에서 마지막 탭한 시간을 빼서, 언제부터 탭을 시작했는지 변수에 담음
        const tapInterval = now - lastTap;

       //   마지막에 탭한게 0~300ms이면 글자 입력하게해줌!!
        if (tapInterval < 300 && tapInterval > 0) {
            if(text !== ""){
                    ctx.save();
                    ctx.font = font_size+"px "+ font_family;
                    ctx.fillStyle = setFontColor;
                    ctx.fillText(text,e.offsetX,e.offsetY);
                    ctx.restore();
            }
        }

    // 마지막 시간 탭 업데이트해서 다음 더블탭 감지!
    lastTap = now;

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

function onEraser(){
    ctx.strokeStyle = "white";
    isFilling = false;
};

// 모바일 JS 이벤트를 위해
// mousedown / touchstart 대신 pointerdown 을 사용 
// mouseup / touchend 대신 pointerup 을 사용
// 으로 변환합니다 (https://designhuh.tistory.com/76 참고)
// https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event
//{ passive: true } 를 해서 preventDefault() 실행하게 하는게 있음... 모바일에선 preventDefault를 막아주니 꼭 해주기..ㅠㅠ


canvas.addEventListener("pointermove", onClickMove,{ passive: false });

canvas.addEventListener("pointerdown", startDraw,{ passive: false });
canvas.addEventListener("pointerup", cancleDraw,{ passive: false });
canvas.addEventListener("pointercancel", cancleDraw,{ passive: false });

// 마우스 더블클릭으로 텍스트 작성... 인데 더블탭을 모바일에서 받지 못하니까
// ondubleclick에서 더블클릭을 감지해야함
canvas.addEventListener("pointerup",
onDoubleClick);


lineWidth.addEventListener("change",onLineWidthChange);
allColor.addEventListener("change",onClickColor);

colorOption.forEach((color)=>{
    color.addEventListener("click",onClickColor);
});

jsMode.addEventListener("click",onClickMode);
canvas.addEventListener("pointerdown", onFillCanvas,{ passive: false });
buttonEraser.addEventListener("click",onEraser);
buttonClear.addEventListener("click",onClear);


//폰트
selectFontSize.addEventListener("change",onFontSizeChange);
//select 박스에서 폰트 설정시,
selectFontFace.addEventListener("change",onFontFaceChange);


savePopupButton.addEventListener("click",onSavePopUpButtonClick)

selectFontColor.addEventListener("change",onColorChange);


inputFile.addEventListener("change", onFileChange);

saveButton.addEventListener("click", onSaveClick);
saveButton.addEventListener("click", onSaveClick);

// JS (애니메이션 끝나면 숨기기)

  loading_view.addEventListener("animationend", () => {
    loading_view.style.display = "none";
});



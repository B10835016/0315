let i=3;
let button;
let nbarray = [];
// 初始內容
function setup() {
  createCanvas(600, 600, WEBGL); // 決定 使用 3D 方式進行渲染
  for(let i=0;i<5;i+=1){
    // 怎麼把東西放到 nbarray 袋子裡面的公式
    nbarray.push(new myBox(50,-height/2+(height/5)*i,0,50));
  }
  button = createButton('說明');
  button.position(19, 610);
  button.mousePressed(changeBG);
}

function changeBG() {
  let val = random(255);
  background(val);
  window.alert('按下左鍵可觀看線條圖。');
  window.alert('點擊右鍵或中鍵時物件大小會持續變化，點擊左鍵可停止。');
}

function draw() {
  background(mouseX,mouseY,150);
  // 將袋子中 所有 東西 稱為 V 執行他的相關函式
  nbarray.forEach((v)=>{
    v.display();
  })
  cursor('https://img.onl/TW7BXt');
}

// 自訂一個類別物件
class myBox{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx = 1;
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    
    push();
      //i=i++;
      noStroke();
      fill(i*25,i*50,i*75);
      translate(this.x,this.y,this.z);
      this.box();
      if (mouseX-width/2 > this.x-this.size/2 && 
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2){
        rotateX(frameCount*0.01);
        rotateY(frameCount*0.01);
        this.mx = this.mx+0.5;
        }
      cone(this.size);
    pop();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}  
    this.x = this.x + this.mx;
  }
  
  box(){
      if (mouseIsPressed){
      noFill();
      stroke(100, 100, 240);
      }
    
    if (mouseButton === RIGHT) {
      this.size = this.size+0.25;
    }
    if (mouseButton === CENTER) {
      this.size = this.size-0.25;
    }
    
  }
}
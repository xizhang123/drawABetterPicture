var di=[0,0,-1];//三维转置矩阵
var dj=[1,0,0];
var dk=[0,1,0];
var far=1200;//观察距离
var drawsize=1200;//绘制大小
var posi=[0,0,0];//中心位置
posi[0]=Number(posi[0]);//转换为数值
posi[1]=Number(posi[1]);
posi[2]=Number(posi[2]);
var context = canvas1.getContext("2d");//把地址当作对象直接用就行
canvas1.onmousemove = function (a) {tur(a);}
canvas1.onmousedown = function (a) {drag=true;}
canvas1.onmouseup = function (a) {drag=false;}
canvas1.onmousewheel = function (a) {if(a.wheelDelta>0)far*=1.1;else far*=0.9;print();}
function clearc(){//把这里面的东西注释掉效果贼壮观
    canvas1.height=canvas1.height;
}
function draw2D(x1,y1,x2,y2,d,color){
	var w=canvas1.width;
	var h=canvas1.height;
	context.beginPath();
	context.moveTo(x1*w/1200,y1*h/750);
	context.lineTo(x2*w/1200,y2*h/750);
	context.lineWidth = d;
	context.strokeStyle = color;
	context.stroke();
}
function draw3D(x1,y1,z1,x2,y2,z2,d,color){
	x1-=posi[0];
	x2-=posi[0];
	y1-=posi[1];
	y2-=posi[1];
	z1-=posi[2];
	z2-=posi[2];
	nx1=turnx(x1,y1,z1);
	nx2=turnx(x2,y2,z2);
	ny1=turny(x1,y1,z1);
	ny2=turny(x2,y2,z2);
	nz1=turnz(x1,y1,z1);
	nz2=turnz(x2,y2,z2);
	
	nz1+=far;
	nz2+=far;
	if(nz1>10&&nz2>10){
		d=drawsize*Math.atan(d/nz1);
		nx1=drawsize*(nx1/nz1);
		nx2=drawsize*(nx2/nz2);
		ny1=drawsize*(ny1/nz1);
		ny2=drawsize*(ny2/nz2);
		nx1+=600;
		nx2+=600;
		ny1=-1*ny1+375;
		ny2=-1*ny2+375;
		draw2D(nx1,ny1,nx2,ny2,d,color);
	}
}
function cdraw3D(x,y,z){//3D算点
	x-=posi[0];
	y-=posi[1];
	z-=posi[2];
	nx1=turnx(x,y,z);
	ny1=turny(x,y,z);
	nz1=turnz(x,y,z);
	
	nz1+=far;
	if(nz1>0){
		nx1=drawsize*(nx1/nz1);
		ny1=drawsize*(ny1/nz1);
		nx1+=600;
		ny1=-1*ny1+375;
		return [nx1,ny1];
	}else return ['err'];
}
function turnx(x,y,z){//转动后的三坐标
	return di[0]*x+dj[0]*y+dk[0]*z;
}
function turny(x,y,z){
	return di[1]*x+dj[1]*y+dk[1]*z;
}
function turnz(x,y,z){
	return di[2]*x+dj[2]*y+dk[2]*z;
}
function ud(d){//竖直转
	var ii=[1,0,0];
	var jj=[0,Math.sqrt(1-d*d),d];
	var kk=[0,-d,Math.sqrt(1-d*d)];	
	var id=[0,0,0],jd=[0,0,0],kd=[0,0,0];
	var mato=[di,dj,dk];
	var matt=[ii,jj,kk];
	var matn=[id,jd,kd];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			for(n=0;n<3;n++){
				matn[i][j]+=mato[i][n]*matt[n][j];
			}
		}
	}
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			mato[i][j]=matn[i][j];
		}
	}	
}
function lr(d){//水平转
	var ii=[Math.sqrt(1-d*d),0,d];
	var jj=[0,1,0];
	var kk=[-d,0,Math.sqrt(1-d*d)];	
	var id=[0,0,0],jd=[0,0,0],kd=[0,0,0];
	var mato=[di,dj,dk];
	var matt=[ii,jj,kk];
	var matn=[id,jd,kd];
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			for(n=0;n<3;n++){
				matn[i][j]+=mato[i][n]*matt[n][j];
			}
		}
	}
	for(i=0;i<3;i++){
		for(j=0;j<3;j++){
			mato[i][j]=matn[i][j];
		}
	}
}
var lx;//旧值
var ly;
var nx;//新值
var ny;
var dx;//水平变化量
var dy;//竖直变化量
var drag=false;
canvas1.setAttribute('width',1200);
canvas1.setAttribute('height',750);
function tur(a){
	if(drag&&model=="3D"){
		nx=a.clientX;
		ny=a.clientY;
		dx=lx-nx;
		dy=ly-ny;
		if(dx*dx<3600&&dy*dy<3600){
			lr(-dx*0.003);ud(dy*0.003);
			print();
		}
		lx=nx;
		ly=ny;
	}
}
function back(){//恢复
	posi=[0,0,0];
	di=[0,0,-1];
	dj=[1,0,0];
	dk=[0,1,0];
	far=1200;
	print();
}
function drownp(){//绘制中心位置
	draw3D(posi[0]-2,posi[1],posi[2],posi[0]+2,posi[1],posi[2],4,'black');
	draw3D(posi[0],posi[1]-2,posi[2],posi[0],posi[1]+2,posi[2],4,'black');
	draw3D(posi[0],posi[1],posi[2]-2,posi[0],posi[1],posi[2]+2,4,'black');
}
function drawSurf(){
	var t,tl=0;
	var i1,j1;
	for(var k=0;k<6;++k){
		if(k==0)
		context.strokeStyle = 'blue';
		if(k==1)
		context.strokeStyle = 'green';
		if(k==2)
		context.strokeStyle = 'red';
		if(k==3)
		context.strokeStyle = 'orange';
		if(k==4)
		context.strokeStyle = 'yellow';
		if(k==5)
		context.strokeStyle = 'black';
		if(model=="3D"){
			context.lineWidth = 0.25;
		}else{
			context.lineWidth = 1;
		}
		for(var j=0;j<101;++j){
			context.beginPath();
			for(var i=0;i<101;++i){
				i1=i*4;
				j1=j*4;
				t=cdraw3D((i1-200)/X,(j1-200)/Y,(map[k][j*101+i])/Z);
				context.lineTo(t[0],t[1]);
				if((tl-map[k][j*101+i])*(tl-map[k][j*101+i])>1E300){
					context.stroke();
					context.beginPath();
					tl=0;
				}else{
					tl=map[k][j*101+i];
				}
			}
			context.stroke();
			if(model=="2D"){
				break;
			}
		}
		tl=0;
		for(var i=0;i<101;++i){
			if(model=="2D"){
				break;
			}
			context.beginPath();
			for(var j=0;j<101;++j){
				i1=i*4;
				j1=j*4;
				t=cdraw3D((i1-200)/X,(j1-200)/Y,(map[k][j*101+i])/Z);
				context.lineTo(t[0],t[1]);
				if((tl-map[k][j*101+i])*(tl-map[k][j*101+i])>1E300){
					context.stroke();
					context.beginPath();
					tl=0;
				}else{
					tl=map[k][j*101+i];
				}
			}
			context.stroke();
		}
		if(str[0]==""){
			break;
		}
	}
}
function print(){
		clearc();
		drawSurf();
		drawCoordinateAxis();
		drownp();
}
function cube(){//参考方框
	draw3D(-200,-200,-200,-200,-200,200,1,'orange');
	draw3D(-200,-200,-200,-200,200,-200,1,'orange');
	draw3D(-200,-200,-200,200,-200,-200,1,'orange');
	
	draw3D(200,200,200,-200,200,200,1,'orange');
	draw3D(200,200,200,200,-200,200,1,'orange');
	draw3D(200,200,200,200,200,-200,1,'orange');
	
	draw3D(200,200,-200,200,-200,-200,1,'orange');
	draw3D(200,200,-200,-200,200,-200,1,'orange');
	
	draw3D(200,-200,200,-200,-200,200,1,'orange');
	draw3D(200,-200,200,200,-200,-200,1,'orange');
	
	draw3D(-200,200,200,-200,-200,200,1,'orange');
	draw3D(-200,200,200,-200,200,-200,1,'orange');
}
function drawCoordinateAxis(){
	var t;
	for(var i=-200;i<190;++i){
		draw3D(i,0,0,i+1,0,0,1,'red');
		draw3D(0,i,0,0,i+1,0,1,'green');
		draw3D(0,0,i,0,0,i+1,1,'blue');
	}
	context.font="16px Arial";
	//x
	context.beginPath();
	context.strokeStyle = 'red';
	context.fillStyle = 'red';
	t=cdraw3D(190,-5,0);context.lineTo(t[0],t[1]);
	t=cdraw3D(200,0,0);context.lineTo(t[0],t[1]);
	t=cdraw3D(190,5,0);context.lineTo(t[0],t[1]);
	context.lineWidth = 1;
	context.stroke();context.fill();
	context.beginPath();
	context.strokeStyle = 'red';
	context.fillStyle = 'red';
	t=cdraw3D(190,0,-5);context.lineTo(t[0],t[1]);
	t=cdraw3D(200,0,0);context.lineTo(t[0],t[1]);
	t=cdraw3D(190,0,5);context.lineTo(t[0],t[1]);
	context.lineWidth = 1;
	context.stroke();context.fill();
	t=cdraw3D(180,0,0);
	context.fillText("X",t[0],t[1]);
	//y
	if(model=="3D"){
		context.beginPath();
		context.strokeStyle = 'green';
		context.fillStyle = 'green';
		t=cdraw3D(-5,190,0);context.lineTo(t[0],t[1]);
		t=cdraw3D(0,200,0);context.lineTo(t[0],t[1]);
		t=cdraw3D(5,190,0);context.lineTo(t[0],t[1]);
		context.lineWidth = 1;
		context.stroke();context.fill();
		context.beginPath();
		context.strokeStyle = 'green';
		context.fillStyle = 'green';
		t=cdraw3D(0,190,-5);context.lineTo(t[0],t[1]);
		t=cdraw3D(0,200,0);context.lineTo(t[0],t[1]);
		t=cdraw3D(0,190,5);context.lineTo(t[0],t[1]);
		context.lineWidth = 1;
		context.stroke();context.fill();
		t=cdraw3D(0,180,0);
		context.fillText("Y",t[0],t[1]);
	}
	//z
	context.beginPath();
	context.strokeStyle = 'blue';
	context.fillStyle = 'blue';
	t=cdraw3D(-5,0,190);context.lineTo(t[0],t[1]);
	t=cdraw3D(0,0,200);context.lineTo(t[0],t[1]);
	t=cdraw3D(5,0,190);context.lineTo(t[0],t[1]);
	context.lineWidth = 1;
	context.stroke();context.fill();
	context.beginPath();
	context.strokeStyle = 'blue';
	context.fillStyle = 'blue';
	t=cdraw3D(0,-5,190);context.lineTo(t[0],t[1]);
	t=cdraw3D(0,0,200);context.lineTo(t[0],t[1]);
	t=cdraw3D(0,5,190);context.lineTo(t[0],t[1]);
	context.lineWidth = 1;
	context.stroke();context.fill();
	t=cdraw3D(0,0,180);
	if(model=="3D"){
		context.fillText("Z",t[0],t[1]);
	}else{
		context.fillText("Y",t[0],t[1]);
	}
	cube();
	context.fillStyle = 'blue';
	context.fillText(document.getElementById("input").value,30,50);
	context.fillStyle = 'green';
	context.fillText(str[0],30,70);
	context.fillStyle = 'red';
	context.fillText(str[1],30,90);
	context.fillStyle = 'orange';
	context.fillText(str[2],30,110);
	context.fillStyle = 'yellow';
	context.fillText(str[3],30,130);
	context.fillStyle = 'black';
	context.fillText(str[4],30,150);
}
function reprint(){
	X=1;
	Y=1;
	Z=1;
	A=1;
	B=1;
	C=1;
	D=1;
	drawsize=1200;
	getText();
	back();
	if(model=="2D"){
		input.placeholder="输入Y的表达式";
		far=700;
		di=[1,0,0];
		dj=[0,0,0];
		dk=[0,1,0];
	}print();
	dA.innerText="A值:"+A;
	dB.innerText="B值:"+B;
	dC.innerText="C值:"+C;
	dD.innerText="D值:"+D;
	dX.innerText="X值:"+X;
	if(model=="3D"){
		dY.innerText="Y值:"+Y;
		dZ.innerText="Z值:"+Z;
		cy.innerText="中心y=0";
		cz.innerText="中心z=0";
	}else{
		dY.innerText="";
		dZ.innerText="Y值:"+Z;
		cy.innerText="";
		cz.innerText="中心y=0";
	}
	H.innerText="比例:"+drawsize;
	cx.innerText="中心x=0";
}
H.onmousewheel=function(e){
	if(e.wheelDelta<0)drawsize*=1.02;else drawsize*=0.98;
	getText();
	print();
	H.innerText="比例:"+drawsize;
}
cx.onmousewheel=function(e){
	if(e.wheelDelta<0)posi[0]+=10;else posi[0]-=10;
	print();
	cx.innerText="中心x="+posi[0]/200;
}
cy.onmousewheel=function(e){
	if(model=="3D"){
		if(e.wheelDelta<0)posi[1]+=10;else posi[1]-=10;
		print();
		cy.innerText="中心y="+posi[1]/200;
	}
}
cz.onmousewheel=function(e){
	if(e.wheelDelta<0)posi[2]+=10;else posi[2]-=10;
	print();
	if(model=="3D"){
		cz.innerText="中心z="+posi[2]/200;
	}else{
		cz.innerText="中心y="+posi[2]/200;
	}
}
getText();
print();


var X=1.0,Y=1.0,Z=1.0,A=1.0,B=1.0,C=1.0,D=1.0;
var map=new Array(5);//最多可以保存3个图像
var model='3D';//默认3D模式打开
map[0]=new Float64Array(10201);//当前输入的表达式图像
map[1]=new Float64Array(10201);//上一个表达式图像
map[2]=new Float64Array(10201);//前一个表达式图像
map[3]=new Float64Array(101);//直线绘图使用
map[4]=new Float64Array(101);
map[5]=new Float64Array(101);
var str=new Array(4);
str[0]="";
str[1]="";
str[2]="";
str[3]="";
str[4]="";
function addnew(){
	if(model=="2D"){
		str[4]=str[3];
		str[3]=str[2];
		str[2]=str[1];
	}
	str[1]=str[0];
	str[0]=document.getElementById("input").value;
	document.getElementById("input").value="";
}
function cac(f,j,i){
	var ans="";
	for(var t=0;t<f.length;++t){
		if(f.charAt(t)=='X'){
			ans+="("+(i-50.0)/50.0+")";
		}else if(f.charAt(t)=='Y'){
			ans+="("+(j-50.0)/50.0+")";
		}else{
			ans+=f.charAt(t);
		}
	}
	return ans;
}
function caculate(f,t){
	for(var j=0;j<101;++j){
		for(var i=0;i<101;++i){
			map[t][j*101+i]=eval(cac(f,j,i))*200;
		}
		if(model=="2D"){
			break;
		}
	}
}
function getText(){//获取表达式
	var n;
	var ans;
	var m;
	var j;
	var ti;
	if(model=="3D"){
		ti=3;
	}else{
		ti=6;
	}
	for(var t=0;t<ti;++t){
		if(t==0){
			n=document.getElementById("input").value;
		}else{
			n=str[t-1];
		}
		m=new Array();
		j=true;
		for(var i=0;i<n.length;++i){
			m[i]=n.charAt(i);
		}
		ans="";
		for(var i=0;i<m.length;++i){
			if(!((m[i]<='z'&&m[i]>='a')||(m[i]<='Z'&&m[i]>='A'))&&!j){
				j=true;
			}
			if(((m[i]<='z'&&m[i]>='a')||(m[i]<='Z'&&m[i]>='A'))&&j){
				switch(m[i]){
					case 'X':
					break;
					case 'Y' :if(model=="2D"){
						document.getElementById("input").value="";
						getText();
						document.getElementById("input").value="err";
						return;
					}
					break;
					case 'A':{ans+=A;++i;j=false;}
					break;
					case 'B':{ans+=B;++i;j=false;}
					break;
					case 'C':{ans+=C;++i;j=false;}
					break;
					case 'D':{ans+=D;++i;j=false;}
					break;
					default:ans+="Math.";
				}
				if(j){
					j=false;
				}else{
					j=true;
				}
			}
			if(i<m.length){
				ans+=m[i];
			}
		}
		caculate(ans,t);
		if(ans==""){
			break;
		}
	}
	print();
}
function insertAtCursor(myField, myValue) {//参考自https://blog.csdn.net/liushuijinger/article/details/48834541
	 //IE 浏览器
	 if (document.selection) {
		 myField.focus();
		 sel = document.selection.createRange();
		 sel.text = myValue;
		 sel.select();
	 }
	 //FireFox、Chrome等
	 else if (myField.selectionStart || myField.selectionStart == '0') {
		 var startPos = myField.selectionStart;
		 var endPos = myField.selectionEnd;
 
		 // 保存滚动条
		 var restoreTop = myField.scrollTop;
		 myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
		 
		 if (restoreTop > 0) {
			myField.scrollTop = restoreTop;
		 }
		 
		 myField.focus();
		 myField.selectionStart = startPos + myValue.length;
		 myField.selectionEnd = startPos + myValue.length;
	 } else {
		 myField.value += myValue;
		 myField.focus();
	 }
 }
function Minput(text){
	if(model=="3D"||text!='Y'){
		if(text=='@'){
			document.getElementById("input").value="";
			str[0]="";
			str[1]="";
			str[2]="";
			str[3]="";
			str[4]="";
			str[5]="";
		}else{
			insertAtCursor(document.getElementById("input"),text);
		}
	}
}
dX.onmousewheel=function(e){
	if(e.wheelDelta<0)X*=1.02;else X*=0.98;
	print();
	dX.innerText="X值:"+X;
}
dY.onmousewheel=function(e){
	if(model=="3D"){
		if(e.wheelDelta<0)Y*=1.02;else Y*=0.98;
		print();
		dY.innerText="Y值:"+Y;
	}
}
dZ.onmousewheel=function(e){
	if(e.wheelDelta<0)Z*=1.02;else Z*=0.98;
	print();
	if(model=="3D"){
		dZ.innerText="Z值:"+Z;
	}else{
		dZ.innerText="Y值:"+Z;
	}
}


dA.onmousewheel=function(e){
	if(e.wheelDelta<0)A*=1.02;else A*=0.98;
	getText();
	print();
	dA.innerText="A值:"+A;
}
dB.onmousewheel=function(e){
	if(e.wheelDelta<0)B*=1.02;else B*=0.98;
	getText();
	print();
	dB.innerText="B值:"+B;
}
dC.onmousewheel=function(e){
	if(e.wheelDelta<0)C*=1.02;else C*=0.98;
	getText();
	print();
	dC.innerText="C值:"+C;
}
dD.onmousewheel=function(e){
	if(e.wheelDelta<0)D*=1.02;else D*=0.98;
	getText();
	print();
	dD.innerText="D值:"+D;
}
function mswitch(){
	if(model=="3D"){
		model="2D";
		Minput('@');
		getText();
		input.placeholder="输入Y的表达式";
		dY.innerText="";
		cy.innerText="";
		cz.innerText="旋转中心y="+posi[2]/200;
		dZ.innerText="Y的比例:"+Z;
		far=700;
		di=[1,0,0];
		dj=[0,0,0];
		dk=[0,1,0];
	}else{
		model="3D";
		Minput('@');
		getText();
		input.placeholder="输入Z的表达式";
		dY.innerText="Y:"+Y;
		cy.innerText="中心y="+posi[1]/200;
		cz.innerText="中心z="+posi[2]/200;
		dZ.innerText="Z值:"+Z;
		far=1200;
		di=[0,0,-1];
		dj=[1,0,0];
		dk=[0,1,0];
	}
	print();
}
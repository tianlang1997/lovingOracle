/*
divID:渲染控件
backgroundColor:背景色
lineWidth:画笔长度
*/
function DrawBoard(divID,backgroundColor,lineWidth,height)
{
	this.id=divID;
	this.height=height || Math.floor($(window).height()*0.65);
	this.width=$(window).width()-2;
	this.backgroundColor=backgroundColor;
	var that=this;
	var str='';
	str+='<canvas id="'+this.id+'myCanvas" width="'+this.width+'" height="'+this.height+'" style="border:1px solid #d3d3d3;">您的浏览器不支持 HTML5 canvas 标签。</canvas>';
	$("#"+divID).html(str);
	this.canvas=document.getElementById(this.id+"myCanvas");
	this.ctx=this.canvas.getContext("2d");
	this.lineWidth = lineWidth || 1;
	this.ctx.lineWidth = this.lineWidth;
	if(this.backgroundColor)
	{
		this.ctx.fillStyle=this.backgroundColor;
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	}		
	this.mousedownFlag=false;
	
	
	this.canvas.addEventListener("touchstart", function (e){
		var touch=e.targetTouches[0];
		var x=touch.pageX-that.canvas.offsetLeft;
		var y=touch.pageY-that.canvas.offsetTop;
		that.ctx.moveTo(x,y);
	}, false);
	
	this.canvas.addEventListener("mousedown", function (e){
		var x=e.offsetX;
		var y=e.offsetY;
		that.mousedownFlag=true;
		that.ctx.moveTo(x,y);
	}, false);
	
	this.canvas.addEventListener("touchmove", function (e){
		e.preventDefault();
		var touch=e.targetTouches[0];
		var x=touch.pageX-that.canvas.offsetLeft;
		var y=touch.pageY-that.canvas.offsetTop;
		that.ctx.lineTo(x,y);
		that.ctx.stroke();
	}, false);
	
	this.canvas.addEventListener("mousemove", function (e){
		e.preventDefault();
		if(that.mousedownFlag)
		{
			var x=e.offsetX;
			var y=e.offsetY;
			that.ctx.lineTo(x,y);
			that.ctx.stroke();
		}			
	}, false);
	
	this.canvas.addEventListener("touchend", function (e) {
	}, false);
	
	this.canvas.addEventListener("mouseup", function (e) {
		e.preventDefault();
		that.mousedownFlag=false;			
	}, false);
	
	//清除画板
	this.clearBoard=function()
	{
		that.ctx.clearRect(0,0,that.canvas.width,that.canvas.heigh);
		that.canvas.width = that.canvas.width;
		if(this.backgroundColor)
		{
			that.ctx.fillStyle=that.backgroundColor;
			that.ctx.fillRect(0,0,that.canvas.width,that.canvas.height);
		}
		this.ctx.lineWidth = this.lineWidth;
	}
	//画板数据
	this.getImageData=function()
	{
		var imgData=that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height);
		return imgData;
	}
		
}
/*
$(function(){
	var drawBoard=new DrawBoard("myCanvas","#FFF",5);
	$("#clearBoard").click(function(){
		drawBoard.clearBoard();
	});
})
</script>
</head>
<body style="padding:0 auto;margin:0 auto">
请在下方写出《马》字
<div id="myCanvas"></div>
<div id="clearBoard">clearBoard</div>
*/
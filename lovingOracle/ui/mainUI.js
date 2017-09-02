registUI("mainUI",function(){
	$("#mainUI_recognizeBtn").click(function(){
		showUI("recognizeUI");
	});
	
	$("#mainUI_writeBtn").click(function(){
		//alertTips("提示",waittingTips);
		showUI("writeUI");
	});
},
function(){},
function(){}
);
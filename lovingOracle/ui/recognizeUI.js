registUI("recognizeUI",function(){
	$("#recognizeUI_back").click(function(){
		//showUI("mainUI");
		goBack();
	});
	$(".recognizeUI_grade").click(function(){
		var grade=parseInt(this.id);
		var s=appData.subject[grade];
		if(s && s.length>0)
		{
			appData.curGrade=grade;
			showUI("recognizeTestUI");
		}
		else
		{
			alertTips("提示",waittingTips);
		}
		
	});
},
function(){},
function(){}
);
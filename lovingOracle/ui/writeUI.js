registUI("writeUI",function(){
	$("#writeUI_back").click(function(){
		//showUI("mainUI");
		goBack();
	});
	$(".writeUI_grade").click(function(){
		var grade=parseInt(this.id);
		var s=appData.writeSubject[grade];
		if(s && s.length>0)
		{
			appData.curGrade=grade;
			showUI("writeTestUI");
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
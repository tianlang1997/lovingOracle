registUI("writeTestUI",function(){
	$("#writeTestUI_back").click(function(){
		//showUI("recognizeUI");
		goBack();
	});
	appData.writeTestappData={};
	
	$("#writeTestUI_reset").click(function(){
		appData.writeTestappData.drawBoard.clearBoard();
	});
	$("#writeTestUI_done").click(function(){
		var imageData=appData.writeTestappData.drawBoard.getImageData();
		writeTest_checkAnswer(doCompare(imageData));
		//alertTips("提示",waittingTips);
	});
},
function(){
	appData.totalItems=appData.writeSubject[appData.curGrade].length;
	appData.writeSubject[appData.curGrade].sort(function(){return Math.random()>0.5?-1:1;});
	var height=$(document).height()+3;
	height-=$("#writeTestUI_head").outerHeight();
	height-=$("#writeTestUI_progress").outerHeight();
	height-=$("#writeTestUI_subject").outerHeight();
	height-=$("#writeTestUI_reset").outerHeight();
	height-=$("#writeTestUI_done").outerHeight();
	appData.writeTestappData.drawBoard=new DrawBoard("writeTestUI_drawBoard","#FFF",5,height);
	writeTestUI_update();
},
function(){
	delete appData.writeTestappData.drawBoard;
}
);
function writeTest_checkAnswer(answer)
{
	if(appData.writeSubject[appData.curGrade][appData.curItem][1]==answer)
	{
		if((appData.curItem+1)>=appData.totalItems)
		{
			alertYesNoTips(appData.gradeArr[appData.curGrade]+"毕业了！","进入下一阶段的学习？",function(){
				++appData.curGrade;
				appData.curItem=0;
				recognizeTestUI_update();
			})
		}
		else
		{
			var content="<b>"+answer+"</b><br/>";
			content+='<img style="width:80%;" src="'+appData.writeSubject[appData.curGrade][appData.curItem].image+'"/><br/>'

			alertYesNoTips("回答正确！开始下一题？",content,function(){
				++appData.curItem;
				writeTestUI_update();
			})
			
		}
	}
	else
	{
		alertTips("提示","这个答案不对哟！再好好想想");
	}
}
function writeTestUI_update()
{
	$("#writeTestUI_title").html("下笔有神("+appData.gradeArr[appData.curGrade]+")");
	
	$("#writeTestUI_progress").html((appData.curItem+1)+"/"+appData.totalItems);
	if(!appData.writeSubject[appData.curGrade] || !appData.writeSubject[appData.curGrade][appData.curItem])
	{
		alertTips("提示",waittingTips);
		goBack();
		return;
	}
	var item=appData.writeSubject[appData.curGrade][appData.curItem];
	
	$("#writeTestUI_subject").html(item[0]);

}


registUI("recognizeTestUI",function(){
	$("#recognizeTestUI_back").click(function(){
		//showUI("recognizeUI");
		goBack();
	});
	
},
function(){
	appData.totalItems=appData.subject[appData.curGrade].length;
	

	var l=appData.subject[appData.curGrade].length;
	for(var j=0;j<l;++j)
	{
		appData.subject[appData.curGrade][j].options.sort(function(){return Math.random()>0.5?-1:1;});
	}
	recognizeTestUI_update();
},
function(){}
);
function recognizeTest_checkAnswer(answer)
{
	if(appData.subject[appData.curGrade][appData.curItem]['answer']==answer)
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
			content+='<img style="width:80%;" src="'+appData.subject[appData.curGrade][appData.curItem].image+'"/><br/>'

			alertYesNoTips("回答正确！开始下一题？",content,function(){
				++appData.curItem;
				recognizeTestUI_update();
			})
			
		}
	}
	else
	{
		alertTips("提示","这个答案不对哟！再好好想想");
	}
}
function recognizeTestUI_update()
{
	$("#recognizeTestUI_title").html("慧眼识真("+appData.gradeArr[appData.curGrade]+")");
	
	$("#recognizeTestUI_progress").html((appData.curItem+1)+"/"+appData.totalItems);
	if(!appData.subject[appData.curGrade] || !appData.subject[appData.curGrade][appData.curItem])
	{
		alertTips("提示",waittingTips);
		goBack();
		return;
	}
	var item=appData.subject[appData.curGrade][appData.curItem];
	
	$("#recognizeTestUI_subject").attr("src",item.image);
	var str="";
	for(var i=0;i<item.options.length;++i)
	{		
		str+='<div id="'+i+'recognizeTestUI_answer" class="recognizeTestUI_answer" style="margin:0 auto;width:80%;height:50px;margin-top:20px;background-color:'+appData.backgroundColor[i]+';">';
		str+=item.options[i];
		str+='</div>';
	}
	$("#recognizeTestUI_options").html(str);
	bindRecognizeTestUI();
}

function bindRecognizeTestUI()
{
	$(".recognizeTestUI_answer").unbind();
	$(".recognizeTestUI_answer").click(function(){
		var answer=$(this).html();//parseInt(this.id);
		
		recognizeTest_checkAnswer(answer);
	});
}
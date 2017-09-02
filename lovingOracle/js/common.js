var _commonObj_={};
_commonObj_.uiArr=[];//界面
_commonObj_.showUICallBackFunc={};//界面显示回调函数
_commonObj_.hideUICallBackFunc={};//界面隐藏回调函数

_commonObj_loadUICallBackFunc={};//加载结束回调函数

_commonObj_.currentUI;//当前界面
_commonObj_.loadUIArr=[];//界面加载数组
_commonObj_.loadUIFlag=false;//is logding ui
_commonObj_.uiStack=[];//界面栈
_commonObj_.initCallBack;
function registUI(uiName,completeFunc,showUIFunc,hideUIFunc)
{
	_commonObj_.uiArr.push(uiName);
	_commonObj_.loadUIArr.push(uiName);
	_commonObj_.showUICallBackFunc[uiName]=showUIFunc;
	_commonObj_.hideUICallBackFunc[uiName]=hideUIFunc;
	_commonObj_loadUICallBackFunc[uiName]=completeFunc;
}
//显示界面
function showUI(uiName)
{
	var currentUI=_commonObj_.currentUI;
	if(currentUI)
	{
		$("#"+currentUI).hide();
		_commonObj_.uiStack.push([currentUI,Object.create(appData.uiData)]);
		if(_commonObj_.hideUICallBackFunc[currentUI])
		{
			_commonObj_.hideUICallBackFunc[currentUI]();
		}		
	}	
	_commonObj_.currentUI=uiName;
	
	$("#"+uiName).show();	
	if(_commonObj_.showUICallBackFunc[uiName])
	{
		_commonObj_.showUICallBackFunc[uiName]();
	}
		
}

//返回
function goBack()
{
	var lastUIData=_commonObj_.uiStack.pop();
	if(!lastUIData)
	{
		if(window.androidObject)
		{
			window.androidObject.quit();
		}
		return;
	}
	var currentUI=_commonObj_.currentUI;
	$("#"+currentUI).hide();
	if(_commonObj_.hideUICallBackFunc[currentUI])
	{
		_commonObj_.hideUICallBackFunc[currentUI]();
	}

	var uiName=lastUIData[0];
	_commonObj_.currentUI=uiName;
	
	$("#"+uiName).show();	
	appData.uiData=Object.create(lastUIData[1]);
	if(_commonObj_.showUICallBackFunc[uiName])
	{
		_commonObj_.showUICallBackFunc[uiName]();
	}
	lastUIData=null;
}

function loadUI()
{
	if(_commonObj_.loadUIFlag==true)
	{
		return;
	}

	if(_commonObj_.loadUIArr.length>0)
	{
		_commonObj_.loadUIFlag=true;
		$("#loadUIDiv").load("/lovingOracle/ui/"+_commonObj_.loadUIArr[0]+".html",function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success")
			{
				var uiName=_commonObj_.loadUIArr.shift();
				if(uiName)
				{
					$("#uiContentDiv").append($("#loadUIDiv").html());
					$("#loadUIDiv").html("");
					_commonObj_loadUICallBackFunc[uiName]();
					$("#"+uiName).hide();
					_commonObj_.loadUIFlag=false;
					loadUI();
				}
			}
			else if(statusTxt=="error")
    	{
      	alert("Error: "+xhr.status+": "+xhr.statusText);
    	}

  	});
	}
	else
	{
		_commonObj_.initCallBack();
	}
}
function loadImage(index)
{
	index=index || 0;
	var img=new Image();
	img.src="images/"+appData.imagesArr[index];

	img.onload=function(){
		appData.context.drawImage(img,0,0);
		appData.imagesDataHouse[appData.imagesArr[index]]=getHistogram(gray(appData.context.getImageData(0,0,img.width,img.height)));
		++index;
		if(index<appData.imagesArr.length)
		{
			loadImage(index);
		}
	}
}

function doCompare(imageData)
{
	var mostLikeName="";
	var maxDegress=0;
	var similarDegreeData={};
	var sourceData=getHistogram(gray(imageData));
	for(var i=0;i<appData.imagesArr.length;++i)
	{
		var imageName=appData.imagesArr[i];
		var imageData=appData.imagesDataHouse[imageName];
		var tempDegree=cosine(sourceData,imageData);
		if(maxDegress<tempDegree)
		{
			maxDegress=tempDegree;
			mostLikeName=imageName;
		}
		similarDegreeData[imageName]=tempDegree;
	}
	console.log(mostLikeName+"---"+maxDegress);
	console.log(similarDegreeData);
	return mostLikeName;
}

function initApp(initCallBack)
{
	_commonObj_.initCallBack=initCallBack;
	loadUI();
}
function AppData()
{
	this.curGrade=0;//当前等级
	this.curItem=0;//当前题数
	this.totalItems=0;//总题数
	this.gradeArr=["小学","初中","高中","大学"];
	this.backgroundColor=["#dedede","#cdcdcd","#bcbcbc","#ababab","#9a9a9a","#898989"];
	this.subject=subject;
	this.writeSubject=writeSubject;
	this.uiData={};//当前界面所需数据存储区
	this.imagesArr=["jia.png","niu.png","shi.png","wang.png","wen.png","wu.png"];//图片数组
	this.imagesDataHouse={};//图片比价数据仓库
	this.canvas=null;
	this.context=null;
	//阅后即焚临时变量
	this.setTmp=function(key,val)
	{
		this['temp__'+key]=val;
	}

	this.getTmp=function(key)
	{
		var tmp=this['temp__'+key];
		delete this['temp__'+key];
		return tmp;
	}
}
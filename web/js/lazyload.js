//scroll
//src 属性替换
// 窗口高度：document.documentElement.clientHeight
// 滚动高度：scrollT  = document.documentElement.scrollTop || document.body.scrolltop;
//offsetTop
//onload

//N :  知道目前加载到第几张了


function lazyload(){ 
   var images = document.getElementsByTagName("img");
   //console.log(images)
   var len = images.length;
   var n = 0;  //加载到第几张

   return function(){
	   var winH = document.documentElement.clientHeight;	
	   var scroT = document.documentElement.scrollTop || document.body.scrollTop;
	   console.log(winH,scroT)
	   console.log(n)
	   for(var i=n; i< len ; i++){
	   		if(images[i].offsetTop <= winH+scroT){
	   			//说明这个图片已经在展示区域了
	   			(function(i){
						var newimg = new Image();
				   			newimg.src = images[i].getAttribute("data-src");
				   			newimg.onload = function(){
				   				images[i].src = images[i].getAttribute("data-src");
				   			}
			   	})(i)
	   			n=n+1;
	   		}
	   }
   }
   

}
var loadimg = lazyload();
loadimg();


function throttle(fn,delay,atleast){
	var timeout = null,
		starttime = new Date();
	return function(){
		var curTime = new Date();
		clearTimeout(timeout);
		if (curTime-starttime>atleast){
			fn();
			starttime = curTime;
		}else{
			timeout = setTimeout(fn,delay);
		}
	}
}
//throttle(loadimg,1000,1000)

window.addEventListener("scroll", throttle(loadimg,1000,1000), false)
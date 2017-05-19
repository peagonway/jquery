function lazyload(){
	var images = document.getElementsByTagName('img');
	var len = images.length;

	var n = 0;//标记加载到的图片位置

	return function(){
		if (n>=len) return false;
		var seeHeight = document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(seeHeight);
		console.log(scrollTop);
		for (var i=n; i<len; i++){
			if(images[i].offsetTop < seeHeight + scrollTop) {
		        if(images[i].getAttribute('src') === 'images/loading.gif') {
			    	//images[i].src = images[i].getAttribute('data-src');
			    	(function(i){
				    	var img = new Image();
				    	img.src = images[i].getAttribute('data-src');
				    	img.onload=function(){
				    		images[i].setAttribute("src",this.src);
				    	}
				    	img.onerror=function(){
				    		console.log("图片加载失败")
				    	}
			    	})(i)

				}
				n = n + 1;
			}
		}
	}
}





function throttle(fn, delay, atleast) {

	//delay 推迟执行的时间
	//atleast 防抖最小间隔
	// fn 防抖执行的函数

    var timeout = null,           
		startTime = new Date();   //自由变量
    return function() {
		var curTime = new Date();
		clearTimeout(timeout);
		if(curTime - startTime >= atleast) {
		    fn();
		    startTime = curTime;
		}else {
		    timeout = setTimeout(fn, delay);
		}
    }
}



var loadimg = lazyload();
loadimg();  //默认执行一次


window.addEventListener("scroll",throttle(loadimg,1000,1000), false)
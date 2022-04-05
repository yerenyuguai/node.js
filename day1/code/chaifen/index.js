
		window.onload = function() {
			//根据不同的方向键可以让div按照不同的方向移动
			var box4 = document.getElementById("box4");
			document.onkeydown = function(event) {
				event = event || window.event;
				// ASCII码    37左   38上   39右  40下
				
				//定义一个变量控制方块移动的速度
				var speed=10;
				if(event.ctrlKey){
					speed=30;
					//如果按了ctrl，速度加快
				}
				
				//体验中发现移动有些卡顿，后面讲到定时调用的时候会进行完善
				switch(event.keyCode) {
					case 37://向左
						box4.style.left = box4.offsetLeft - speed + "px";
						break;
					case 38://向上
						box4.style.top = box4.offsetTop - (2*speed) + "px";
						break;
					case 39://向右
						box4.style.left = box4.offsetLeft + 10 + "px";
						break;
					case 40://向下
						box4.style.top = box4.offsetTop + (speed+10) + "px";
						break;
					default:
						break;
				}
			}
		}
	
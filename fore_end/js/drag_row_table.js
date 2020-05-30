function drag_row_table(id) {
	var EventUtil = {  //跨浏览器的事件处理程序,视情况分别选择以下事件处理程序
		addHandler: function(element, type, handler) {
			if(element.addEventListener) {  //DOM2级
				element.addEventListener(type, handler, false);
			}
			else if (element.attachEvent) {  //IE方法
				element.attachEvent('on' + type.handler);
			}
			else {  //DOM1级
				element["on" + type] = handler;
			}
		},
		getTarget: function(event) {  //获取事件的实际目标（在这里是tr），不同于event.currentTarget和this指向的是绑定事件处理程序的目标，（tbody）
          return event.target || event.srcElement;
        },
		preventDefault: function(event) {  //取消事件默认方法
			if(event.preventDefault) {  
				event.preventDefault();
			}
			else {
				event.returnValue = false;  //默认为true，设为falsew为取消默认行为。
			}
		}
	}

	var myTable = document.querySelector(id);
	var tbody = myTable.querySelector("tbody");  //这里监听的是tbody，而不是tr。目的是利用事件冒泡，减少监听的元素个数，提高性能
	var trs = tbody.querySelectorAll("tr");  

    EventUtil.addHandler(tbody, "dragover", function(event) { //默认元素不可放置，这里取消默认，将放置目标修改为可放置的
    	EventUtil.preventDefault(event);  
      })

    EventUtil.addHandler(tbody, "dragstart", function(event) {  //监听点击的拖动的元素
        event.dataTransfer.setData("drag_index", event.target.rowIndex); //将被拖元素的信息，传给放置位置
    })

    EventUtil.addHandler(tbody, "drop", function(event) {  //监听鼠标移动到可放置的放置目标上，松开鼠标的事件
        EventUtil.preventDefault(event);  //取消在Firefox 3.5+中，放置事件的默认行为是打开被放置目标上的URL
        let drag_index = parseInt(event.dataTransfer.getData("drag_index"));  //获取传过来的被拖元素的信息
        let drop_index = EventUtil.getTarget(event).parentNode.rowIndex;  //this为当前触发drop的元素，即放置目标的行下标

        tbody.insertBefore(trs[drag_index], EventUtil.getTarget(event).parentNode.nextSibling);   //将被拖元素放到放置目标的兄弟节点上
        trs = myTable.querySelectorAll("tr");  //更新变换的tr行信息
    })
}

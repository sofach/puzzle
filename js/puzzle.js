function puzzle (imgs, box) {
	this.box = box;
	this.imgs = imgs?imgs:new Array();
	this.imgIndex = 0;
	
	this.row = 2;
	this.line = 2;
	this.rowIndexes = new Array();
	this.completeCallback = null;
	this.startDate = null;
	this.duration = 0;
	this.setRowAndLine = function(row, line, imgIndex) {
		this.imgIndex = imgIndex;
		this.row = row>=2?row:2;
		this.line = line>=2?line:2;
		this.rowIndexes = new Array();
		for (var i=0; i<this.row*this.line; i++) {
			this.rowIndexes[i]=i;
		}
	}
	
	this.startGame = function(obj) {
		this.completeCallback = obj.callback;
		while (1) {
			this.rowIndexes=this.rowIndexes.sort(function(){
                    return Math.random()-0.5
            });
			var i; //防止顺序未乱
			for (i=0; i<this.rowIndexes.length; i++) {
				if (this.rowIndexes[i] != i)
					break;
			}
			if (i < this.rowIndexes.length) 
				break;
		}
		
		this.startDate = new Date();
		this.setup();
		enableDragAndDrop(this.box.find("li"), this);
	}
	
	this.checkCompleted = function() {
		var callback = this.completeCallback;
//		var puzzle = this;
		var lis = this.box.find("li");
		var length = lis.length;
		for (var i=0; i<length; i++) {
			var li = $(lis[i]);
			if (li.attr("res") != i) {
				if (typeof(callback)=="function") {
					callback({"index":-1, "time":0, "better":0});
				}
				return false;
			}
			if(i==this.line*this.row-1){
				var enddate = new Date();
				this.duration = this.duration + Math.floor((enddate.getTime()-this.startDate.getTime())/1000);
				this.startDate = null;
				if (typeof(callback)=="function") {
					callback({"index":this.imgIndex, "time":this.duration, "better":betterThan(this.duration, this.row, this.line)});
				}
				this.duration = 0;
			}
		}
	}
	
	//size=duration时，默认前百分之80，其他相应的减或加
	function betterThan(duration, row, line) {
		if (duration<=0 || row<=0 || line<=0) {
			return 100;
		}
		var betterthan = 80; 
		var size = row*line*row;
		
		if (duration > size) {
			var count = (duration-size)/size;
			var fpart = count - Math.floor(count);
			if (count>10) {
				count = 10;
			}
			for (var i=0; i<Math.floor(count); i++) {
				betterthan = betterthan/2
			}
			betterthan = betterthan - (betterthan/2)*fpart;
		} else {
			betterthan = betterthan - (100-betterthan)*(duration-size)/size
		}
		return betterthan;
	}
	
	this.setup = function() {
		this.box.empty();
		var width = this.box.width();
		var height = this.box.height();
		var pl = 100/(this.row-1);
		var pt = 100/(this.line-1);
		var bgimg = this.imgs[this.imgIndex];
		for (var i = 0; i < this.rowIndexes.length; i++) {
			var rowIndex = this.rowIndexes[i];
			var li = $("<li res="+rowIndex+" id=drop"+rowIndex+"></li>");
			li.css({"background-image":"url("+bgimg+")", "background-repeat":"no-repeat", "background-size": width+"px "+height+"px",
					 "background-position": Math.floor(rowIndex%this.row)*pl+"% "+Math.floor(rowIndex/this.row)*pt+"%",
					 "height":100/this.line+"%", "width":100/this.row+"%",
					 "float":"left", "list-style-type":"none"});
			this.box.append(li);
		};	
	}

    function enableDragAndDrop(ele, pz) {
    		ele.dragdrop({
	        makeClone: true,
	        sourceHide: true,
//	        dragClass:"border-green",
	        dropClass: "border-green",
	        canDrag: function($src, event) {
                return $src;
	        },
	        canDrop: function($dst) {
	            if ($dst.is("li")) {
                     return true;
                }
                return false;
	        },
	        didDrop: function($src, $dst) {
	            var srcIndex = $src.index();
	            var dstIndex = $dst.index();
	            var distance =  Math.abs(srcIndex-dstIndex);
	            if (distance == 1) {
	            		 if (srcIndex > dstIndex) {
		            		$src.insertBefore($dst);
		            } else {
		            		$src.insertAfter($dst);
		            }
	            } else if (distance > 1) {
	            		if (srcIndex == 0) {
	            			var srcNext = $src.next();
	            			$src.insertAfter($dst);
						$dst.insertBefore(srcNext);
	            		} else {
	            			var srcPre = $src.prev();
	            			$src.insertAfter($dst);
						$dst.insertAfter(srcPre);
	            		}	            		
	            }
	            pz.checkCompleted();
	        }
	    });
    }	
}	

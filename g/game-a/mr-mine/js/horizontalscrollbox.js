class HorizontalScrollbox extends Hitbox{contentWidth;contentHeight;canvas;context;targetContext;scale;cursor="";scrollbarColor="#519650";scrollbarDefaultColor="#519650";scrollbarHoverColor="#51AA50";scrollbarDragColor="#51AA50";scrollbarTroughColor="#151515";currentScrollX=0;isDraggingBar=!1;isScrollbarInitialized=!1;isDirty=!0;constructor(t,i,s,o,h,e,r,n){var l={x:o,y:h,width:e,height:r};super(l,{},""),this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=Math.max(1e3,i),this.context=this.canvas.getContext("2d"),this.targetContext=s,this.contentWidth=t,this.contentHeight=i,this.boundingBox=l,this.scrollbarHeight=n,this.setScale(),this.onwheel=function(t){this.scroll(t.deltaY)}.bind(this)}render(){this.isVisible()&&(this.targetContext.drawImage(this.canvas,this.currentScrollX,0,this.boundingBox.width/this.scale,this.contentHeight,this.boundingBox.x,this.boundingBox.y,this.boundingBox.width,this.boundingBox.height-this.scrollbarHeight),this.renderScrollBar(this.targetContext,this.scrollbarHeight),this.isDirty&&(super.render(),this.isDirty=!1),this.postRender())}postRender(){}renderScrollBar(t,i){if(this.checkIfScrollbarIsVisible()){var s=this.boundingBox.width*(this.boundingBox.width/this.scale)/this.contentWidth;this.isDraggingBar&&this.scrollTo(this.contentWidth*(this.getLocalCoordinates(mouseX/uiScaleX+this.hitboxXOffset,mouseY/uiScaleX,this).x-s/2)/this.boundingBox.width);var o=this.boundingBox.x+this.boundingBox.width*(this.currentScrollX/this.contentWidth);this.boundingBox.y,this.boundingBox.height;t.save(),t.strokeStyle=this.scrollbarTroughColor,t.lineCap="round",t.lineWidth=this.scrollbarHeight/2,t.beginPath(),t.moveTo(this.boundingBox.x+i/2,this.boundingBox.y+this.boundingBox.height-i/2),t.lineTo(this.boundingBox.x+this.boundingBox.width-i/2,this.boundingBox.y+this.boundingBox.height-i/2),t.stroke(),t.strokeStyle=this.scrollbarColor,t.beginPath(),t.moveTo(o+i/2,this.boundingBox.y+this.boundingBox.height-i/2),t.lineTo(o+s-i/2,this.boundingBox.y+this.boundingBox.height-i/2),t.stroke(),this.isScrollbarInitialized||this.initializeScrollbar(),t.restore()}else this.isScrollbarInitialized&&(this.getHitboxById("scrollbar").setEnabled(!1),this.isScrollbarInitialized=!1),t.save(),t.fillStyle="#777777",t.restore()}initializeScrollbar(){this.clearCanvas(),this.isDirty=!0,this.setScale();var t=this.boundingBox.width*(this.boundingBox.width/this.scale)/this.contentWidth,i=new Hitbox({x:0,y:(this.boundingBox.height-this.scrollbarHeight)/this.scale,width:this.contentWidth,height:this.scrollbarHeight/this.scale},{onmousedown:function(){this.checkIfScrollbarIsVisible()&&(this.isDraggingBar=!0,this.scrollTo(this.contentWidth*(this.getLocalCoordinates(mouseX+this.hitboxXOffset,mouseY,this).x-t/2)/this.boundingBox.width),this.scrollbarColor=this.scrollbarDragColor,this.render())}.bind(this),onmousemove:function(){this.checkIfScrollbarIsVisible()&&this.isDraggingBar&&(this.scrollTo(this.contentWidth*(this.getLocalCoordinates(mouseX+this.hitboxXOffset,mouseY,this).x-t/2)/this.boundingBox.width),this.render())}.bind(this),onmouseup:function(){this.checkIfScrollbarIsVisible()&&(this.isDraggingBar=!1),this.scrollbarColor=this.scrollbarDefaultColor}.bind(this),onmouseenter:function(){this.isDraggingBar||(this.scrollbarColor=this.scrollbarHoverColor)}.bind(this),onmouseexit:function(){this.isDraggingBar||(this.scrollbarColor=this.scrollbarDefaultColor)}.bind(this)},"pointer","scrollbar");i.setEnabled(!0),i.isPermanent=!0,this.deleteHitboxWithId("scrollbar"),this.addHitbox(i),this.isScrollbarInitialized=!0}scroll(t){this.scrollTo(this.currentScrollX+t),this.render()}scrollTo(t){if(!this.checkIfScrollbarIsVisible())return this.currentScrollX=0,void(this.hitboxXOffset=0);this.currentScrollX=t,this.currentScrollX<0?this.currentScrollX=0:this.currentScrollX>this.contentWidth-this.boundingBox.width/this.scale&&(this.currentScrollX=this.contentWidth-this.boundingBox.width/this.scale),this.hitboxXOffset=-this.currentScrollX*this.scale}setScale(){this.scale=(this.boundingBox.height-this.scrollbarHeight)/this.contentHeight,Math.floor(this.canvas.height)!=Math.floor(this.contentHeight)&&(this.canvas.height=this.contentHeight),Math.floor(this.canvas.width)<Math.floor(this.contentWidth)&&(this.canvas.width=this.contentWidth)}checkIfScrollbarIsVisible(){return this.contentWidth*this.scale>this.boundingBox.width}getScrollbarHeight(){return this.checkIfScrollbarIsVisible()?this.scrollBarHeight:0}clearCanvas(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}generateTestPattern(){for(var t=0;t<this.contentHeight;){for(var i=0;i<this.contentWidth;)this.context.fillStyle=(i+t)%2==0?"white":"black",this.context.fillRect(i,t,55,55),i+=55;t+=55}}}
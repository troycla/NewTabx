class CaveManagementWindow extends TabbedPopupWindow{layerName="caveManagement";domElementId="CAVESYSTEMD";context=CAVESYSTEM;frameWidthFraction=.03;frameHeightFraction=.037;frameRightShadowFraction=.01;frameBottomShadowFraction=.05;lastRenderTreasureLength=-1;constructor(t){super(t),this.popupFrameImage="undefined"!=typeof eventCaveManagerFrame?eventCaveManagerFrame:caveManagerFrame,this.backgroundImage=popupBackground,this.context.imageSmoothingEnabled=!0,t||this.setBoundingBox(),this.initializeTabs([_("Caves"),_("Drones")]),this.initializeCaveList(),this.treasureScrollbox=new Scrollbox(.65*this.bodyContainer.boundingBox.width,1,this.context,this.bodyContainer.boundingBox.x+.175*this.boundingBox.width-15,this.bodyContainer.boundingBox.y+.84*this.bodyContainer.boundingBox.height,.65*this.bodyContainer.boundingBox.width,.17*this.bodyContainer.boundingBox.height,15),this.treasureScrollbox.isVisible=()=>0==this.currentTabIndex,this.treasureScrollbox.isEnabled=()=>0==this.currentTabIndex,this.addHitbox(this.treasureScrollbox),this.blueprintPaneDefaultWidth=.4*this.bodyContainer.boundingBox.width,this.blueprintPane=new Scrollbox(this.blueprintPaneDefaultWidth-15,this.bodyContainer.boundingBox.height,this.context,this.bodyContainer.boundingBox.x,this.bodyContainer.boundingBox.y,this.blueprintPaneDefaultWidth,this.bodyContainer.boundingBox.height,15),this.blueprintPane.isVisible=()=>1==this.currentTabIndex,this.blueprintPane.isEnabled=()=>1==this.currentTabIndex,this.addHitbox(this.blueprintPane),this.craftingPane=new Hitbox({x:this.blueprintPaneDefaultWidth,y:0,width:this.bodyContainer.boundingBox.width-this.blueprintPaneDefaultWidth,height:this.bodyContainer.boundingBox.height},{},"","craftingPane"),this.craftingPane.isVisible=()=>1==this.currentTabIndex,this.craftingPane.isEnabled=()=>1==this.currentTabIndex,this.craftingPane.render=function(){var t=this.parent.parent.context,e=this.getRelativeCoordinates(0,0,this.parent.parent);t.save(),t.fillStyle="#444444",t.fillRect(e.x,e.y,3,this.boundingBox.height),this.renderChildren()},this.craftingPane.allowBubbling=!0,this.bodyContainer.addHitbox(this.craftingPane),this.initializeBlueprintList(),this.initializeCraftingPane()}onTabChange(){this.initializeBlueprintList()}render(){this.clearCanvas(),treasureStorage.treasure.length!=this.lastRenderTreasureLength&&this.generateTreasureScrollboxContents(),this.renderChildren(),0==this.currentTabIndex&&(this.context.save(),this.context.fillStyle="#FFFFFF",this.context.font="24px KanitM",this.context.textBaseline="top",fillTextWrap(this.context,_("Active Caves"),this.bodyContainer.boundingBox.x,this.bodyContainer.boundingBox.y+.01*this.bodyContainer.boundingBox.height,this.bodyContainer.boundingBox.width,"center"),fillTextWrap(this.context,_("Stored Treasure"),this.bodyContainer.boundingBox.x,this.bodyContainer.boundingBox.y+.785*this.bodyContainer.boundingBox.height,this.bodyContainer.boundingBox.width,"center"),this.context.restore())}initializeCaveList(){this.caveList=new Hitbox({x:this.bodyContainer.boundingBox.x,y:this.bodyContainer.boundingBox.y+.02*this.bodyContainer.boundingBox.height,width:this.bodyContainer.boundingBox.width,height:.75*this.bodyContainer.boundingBox.height},{},""),this.caveList.id="caveList",this.caveList.allowBubbling=!0,this.addHitbox(this.caveList),this.caveList.isVisible=()=>0==this.currentTabIndex,this.caveList.isEnabled=()=>0==this.currentTabIndex;for(var t=0;t<MAX_CAVE_SYSTEMS_AT_A_TIME;++t){var e=this.caveList.boundingBox.height*(.07+.09*t)-2,i=this.caveList.addHitbox(new Hitbox({x:0,y:e,width:this.caveList.boundingBox.width,height:.09*this.caveList.boundingBox.height},{onmousedown:function(t){var e=getActiveCaves();t<e.length&&(changeViewedDepth(e[t].kmDepth-currentlyViewedDepth+2),closeUi(this),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play(),keysPressed.Shift&&openUi(CaveWindow,null,e[t].kmDepth))}.bind(this,t)},"pointer"));i.isEnabled=function(t){var e=getActiveCaves();return t<e.length&&e[t].isActive}.bind(this,t),i.render=function(t,e){var i=this.getRelativeCoordinates(0,0,t),n=t.context;n.globalAlpha=.5,e%2==0&&(n.fillStyle="#000000",n.fillRect(i.x,i.y,this.boundingBox.width,this.boundingBox.height)),n.globalAlpha=1;var o=this.boundingBox.height;n.font="15px Verdana",n.textBaseline="middle";var r=getActiveCaves();if(e<r.length){var a=r[e],s=this.boundingBox.width/2.5;n.fillStyle="#FFFFFF",fillTextShrinkToFit(n,a.kmDepth+"km",i.x,i.y+o/2,3*o,"center"),renderFancyProgressBar(n,_("Time Remaining: {0}",formattedCountDown(a.remainingSeconds)),a.remainingSeconds/a.totalDuration,i.x+3*o,i.y+.075*o,this.boundingBox.width/2.5,.85*o,"#7F7F7F","#000000","#FFFFFF",timerFrame),renderFancyProgressBar(n,_("Fuel: {0}/{1}",Math.floor(a.currentFuel),caveMaxFuelStructure.statValueForCurrentLevel()),a.currentFuel/caveMaxFuelStructure.statValueForCurrentLevel(),i.x+3.5*o+this.boundingBox.width/2.5,i.y+.075*o,s,.85*o,"#5EB65D","#000000","#FFFFFF",timerFrame),this.renderChildren()}else 0==e&&(n.textBaseline="middle",n.fillStyle="#FFFFFF",fillTextShrinkToFit(n,_("Any caves that spawn will be listed here"),i.x,i.y+this.boundingBox.height/2,this.boundingBox.width,"center"))}.bind(i,this,t)}}generateTreasureScrollboxContents(){this.lastRenderTreasureLength=treasureStorage.treasure.length;var t=this.treasureScrollbox,e=42;t.clearHitboxes(),t.context.save(),t.context.clearRect(0,0,t.contentWidth,t.contentWidth);var i=Math.min(9,Math.floor((t.contentWidth-20)/e)),n=Math.max(2,Math.ceil(MAX_STORED_TREASURE/i)),o=(t.contentWidth-20-e*i)/(i-1),r=o/3;t.contentHeight=n*e+(n-1)*r+1,t.initializeScrollbar(),t.canvas.height=t.contentHeight,t.setScale();for(var a=0;a<MAX_STORED_TREASURE;++a){var s=10+a%i*(e+o),h=Math.floor(a/i)*(e+r);if(t.context.fillStyle="#000000",t.context.globalAlpha=.5,t.context.fillRect(s,h,e,e),t.context.globalAlpha=1,a<treasureStorage.treasure.length){var d=treasureStorage.treasure[a];t.context.imageSmoothingEnabled=!1,drawImageFitInBox(t.context,d.icon,s+6,h+6,30,30),t.addHitbox(new Hitbox({x:s,y:h,width:e,height:e},{onmousedown:function(t,e){treasureStorage.grantAndRemove(e)}.bind(this,d,a),onmouseenter:function(t,i,n){var o=this.getGlobalCoordinates(i,n+e);showTooltip(t.getName(),"",o.x*uiScaleX,o.y*uiScaleY)}.bind(this.treasureScrollbox,d,s,h),onmouseexit:function(){hideTooltip()}},"pointer"))}t.context.drawImage(itemFrame,s,h,e,e)}t.context.restore()}initializeBlueprintList(){var t=this.blueprintPane;t.clearHitboxes(),this.blueprintListHitboxes=[],this.generateMenuContents(this.blueprintPane),t.isDirty=!0}generateMenuContents(t){var e=56;t.context.save(),t.context.clearRect(0,0,t.canvas.width,t.canvas.height);var i=craftingCategories.droneUpgrades,n=getKnownBlueprints(),o=filterBlueprintsByCategory(n,i),r=Math.floor((t.boundingBox.width-6-15)/e),a=Math.ceil(o/r),s=(t.boundingBox.width-6-15-e*r)/(r-1);t.contentHeight=a*(e+s)+6;for(var h=0;h<o.length;++h){var d=3+h%r*(e+s),l=3+Math.floor(h/r)*(e+s),g=o[h];t.context.globalAlpha=.5,t.context.fillStyle="#000000",t.context.fillRect(d,l,e,e),t.context.globalAlpha=1,drawImageFitInBox(t.context,g.craftedItem.item.getIcon(),d,l,50,50),drawImageFitInBox(t.context,itemFrame,d,l,e,e),this.selectedBlueprintIndex==h&&(t.context.strokeStyle="#76E374",t.context.lineWidth=3,t.context.beginPath(),t.context.strokeRect(d+t.context.lineWidth,l+t.context.lineWidth,e-2*t.context.lineWidth,e-2*t.context.lineWidth),t.context.stroke());var u=new Hitbox({x:d,y:l,width:e,height:e},{onmousedown:function(t,e){if(this.selectedBlueprint=t,t.hasOwnProperty("levels")){var i=1+this.selectedBlueprint.craftedItem.item.getCurrentLevel();t.craftedItem.item.isAtMaxLevel()?this.discountedIngredients=null:this.discountedIngredients=getIngredientListWithDiscounts(t.levels[i].ingredients)}this.initializeCraftingPane()}.bind(this,g,h),onmouseenter:function(t,e,i){var n=this.getGlobalCoordinates(e,i);showTooltip(t.craftedItem.item.getName(),t.craftedItem.item.getDescription(),n.x*uiScaleX,n.y*uiScaleY)}.bind(t,g,d,l+e),onmouseexit:function(){hideTooltip()}},"pointer");t.addHitbox(u,!0)}t.context.restore()}initializeCraftingPane(){if(this.selectedBlueprint){if(1==this.currentTabIndex&&this.selectedBlueprint.hasOwnProperty("levels")){var t=1+this.selectedBlueprint.craftedItem.item.getCurrentLevel();this.selectedBlueprint.craftedItem.item.isAtMaxLevel()?this.discountedIngredients=null:this.discountedIngredients=getIngredientListWithDiscounts(this.selectedBlueprint.levels[t].ingredients)}isBlueprintUnseen(this.selectedBlueprint.category,this.selectedBlueprint.id)&&flagBlueprintAsSeen(this.selectedBlueprint.category,this.selectedBlueprint.id),this.initializeBlueprintList(),this.craftingPane.clearHitboxes();var e=isBlueprintKnown(this.selectedBlueprint.category,this.selectedBlueprint.id),i=isBlueprintAvailable(this.selectedBlueprint.category,this.selectedBlueprint.id),n=.07*this.boundingBox.height,o=Math.min(55,Math.ceil(.128*this.boundingBox.height)),r=o/10,a=new Hitbox({x:20,y:n,width:this.craftingPane.boundingBox.width-40,height:o+2*r},{},"","blueprintNameBox");a.render=function(t){var e=t.getContext(),i=this.getRelativeCoordinates(0,0,t);e.save(),e.globalAlpha=.6,e.fillStyle="#111111",e.fillRect(i.x,i.y,this.boundingBox.width,this.boundingBox.height),e.globalAlpha=1;var n=Math.min(22,.055*t.boundingBox.height);e.font=n+"px KanitM",e.fillStyle="#FFFFFF",e.textBaseline="top",fillTextWrap(e,t.selectedBlueprint.craftedItem.item.getName(),i.x+o+4*r,i.y+r,this.boundingBox.width-o-5*r,"left",.25),e.restore(),this.renderChildren()}.bind(a,this);var s=new Hitbox({x:r,y:r,width:o,height:o},{onmouseenter:function(t,e,i){var n=this.getGlobalCoordinates(e,i),o=getRawIngredientsForBlueprint(t);_("Requires");for(var r in o)r+": "+o[r]+"<br>";showTooltip(_(t.craftedItem.item.getName()),t.craftedItem.item.getDescription(),n.x*uiScaleX,n.y*uiScaleY)}.bind(a,this.selectedBlueprint,r,r+o),onmouseexit:function(){hideTooltip()}},"pointer","blueprintIcon");s.render=function(t){var e=this.getContext(),i=t.selectedBlueprint,n=this.getRelativeCoordinates(0,0,t);if(e.save(),e.imageSmoothingEnabled=!1,drawImageFitInBox(e,i.craftedItem.item.getIcon(),n.x,n.y,o,o),1!=i.category&&i.craftedItem.item.getQuantityOwned()>-1){var r=i.craftedItem.item.getCurrentLevel()+1;e.fillStyle="#FFFFFF";var a=Math.min(16,.037*this.boundingBox.height);e.font=a+"px Verdana",e.textBaseline="bottom",strokeTextShrinkToFit(t.context,r,n.x,n.y+o,this.boundingBox.height,"right"),fillTextShrinkToFit(t.context,r,n.x,n.y+o,this.boundingBox.height,"right")}e.restore()}.bind(s,this);var h=Math.min(16,.037*this.boundingBox.height),d=new Hitbox({x:20,y:h+a.boundingBox.y+a.boundingBox.height+r,width:a.boundingBox.width,height:4*r+2*o+2*h},{},"","ingredients");d.render=function(t){var e=this.getContext(),i=this.getRelativeCoordinates(0,0,t);e.save(),e.fillStyle="#FFFFFF",e.font=h+"px KanitB",fillTextWrap(e,_("Blueprint"),i.x,i.y+h,t.boundingBox.width),e.font=h+"px KanitM",fillTextWrap(e,t.selectedBlueprint.craftedItem.item.getDescription(),i.x,i.y+h+24,t.boundingBox.width-i.x,"left",.25),e.globalAlpha=.6,e.fillStyle="#111111",e.fillRect(i.x,i.y+13*h,this.boundingBox.width,this.boundingBox.height-13*h),e.globalAlpha=1,e.restore(),this.renderChildren()}.bind(d,this);var l=Math.floor((d.boundingBox.width-2*r)/o),g=(d.boundingBox.width-2*r-o*l)/(l-1);if(e||i){var u=13*h;for(var c in this.discountedIngredients){var x=r+c%l*(o+g),b=r+Math.floor(c/l)*(o+g),B=new Hitbox({x:x,y:b+u,width:o,height:o},{onmouseenter:function(t,e,i){var n=this.getGlobalCoordinates(e,i);showTooltip(_(t.item.getName()),_("Owned: {0}<br>Required: {1}",beautifynum(t.item.getQuantityOwned()),beautifynum(t.quantity)),n.x*uiScaleX,n.y*uiScaleY)}.bind(d,this.discountedIngredients[c],x,b+o+h),onmouseexit:function(){hideTooltip()}},"pointer");B.render=function(t,e){var i=this.getContext(),n=this.getRelativeCoordinates(0,0,t);drawImageFitInBox(i,e.item.getIcon(),n.x,n.y,o,o),i.fillStyle="#FFFFFF";var r=Math.min(16,.037*t.boundingBox.height);i.font=r+"px Verdana",i.textBaseline="bottom",i.lineWidth=3,i.strokeStyle="#000000",strokeTextShrinkToFit(i,e.item.getFormattedQuantity(e.quantity),n.x,n.y+o,.95*o,"right"),fillTextShrinkToFit(i,e.item.getFormattedQuantity(e.quantity),n.x,n.y+o,.95*o,"right"),e.item.hasQuantity(e.quantity)?renderCheckmark(i,n.x,n.y,o/5,o/5):renderXMark(i,n.x,n.y,o/5,o/5)}.bind(B,this,this.discountedIngredients[c]),d.addHitbox(B),d.boundingBox.height=B.boundingBox.y+B.boundingBox.height}}var f=new Hitbox({x:a.boundingBox.x+.05*a.boundingBox.width,y:this.craftingPane.boundingBox.height-n-10,width:.9*a.boundingBox.width,height:38},{onmousedown:function(){var t=this.selectedBlueprint.craftedItem.item.getCurrentLevel();craftBlueprint(this.selectedBlueprint.category,this.selectedBlueprint.id,t+1,this.discountedIngredients)&&(newNews(_("You crafted {0}",this.selectedBlueprint.craftedItem.item.getName()),!0),mutebuttons||clickAudio[rand(0,clickAudio.length-1)].play()),this.initializeCraftingPane()}.bind(this),onmouseexit:function(){hideTooltip()}},"pointer","craftButton");f.onmouseenter=function(t){if(0==t.currentTabIndex&&!canCraftBlueprint(t.selectedBlueprint.category,t.selectedBlueprint.id,0,t.discountedIngredients)){var e=this.getGlobalCoordinates(0,this.boundingBox.height);showTooltip(getBlueprintNotCraftableReason(t.selectedBlueprint.category,t.selectedBlueprint.id),"",e.x,e.y)}}.bind(f,this),f.render=function(t){var i=t.context;i.save();var n,o=this.getRelativeCoordinates(0,0,t),r=1+t.selectedBlueprint.craftedItem.item.getCurrentLevel();t.selectedBlueprint.craftedItem.item.isAtMaxLevel()?(i.drawImage(upgradebg_blank,o.x,o.y,this.boundingBox.width,this.boundingBox.height),i.fillStyle="#444444",n=_("Max Level")):e&&canCraftBlueprint(t.selectedBlueprint.category,t.selectedBlueprint.id,r,t.discountedIngredients)?(i.drawImage(upgradeb,o.x,o.y,this.boundingBox.width,this.boundingBox.height),i.fillStyle="#000000",n=_("Upgrade")):(i.drawImage(upgradebg_blank,o.x,o.y,this.boundingBox.width,this.boundingBox.height),i.fillStyle="#444444",n=_("Upgrade")),i.textBaseline="middle";var a=Math.min(32,.08*t.boundingBox.height);i.font=a+"px KanitB",fillTextShrinkToFit(i,n,o.x+10,o.y+this.boundingBox.height/2+2,this.boundingBox.width-20,"center"),i.restore()}.bind(f,this),this.craftingPane.addHitbox(a),a.addHitbox(s),this.craftingPane.addHitbox(d),this.craftingPane.addHitbox(f),this.isCraftingPaneInitialized=!0}else{var p;0!=this.currentTabIndex&&1!=this.currentTabIndex||(p=0==knownBlueprints.length||1==knownBlueprints.length&&""==knownBlueprints[0]?_("You don't own any blueprints. Find more in the mines."):_("Click on a drone on the left to upgrade it")),this.craftingPane.clearHitboxes();var m=new Hitbox({x:20,y:20,width:this.craftingPane.boundingBox.width-40,height:this.craftingPane.boundingBox.height-40},{},"","instructionsHitbox");m.render=function(t){var e=this.getRelativeCoordinates(0,0,t),i=t.context;i.font="18px Verdana",i.fillStyle="#FFFFFF",i.textBaseline="middle",fillTextWrap(i,p,e.x,e.y+this.boundingBox.height/2-30,this.boundingBox.width)}.bind(m,this),this.craftingPane.addHitbox(m)}}}
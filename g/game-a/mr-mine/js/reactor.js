const NEAR_ZERO_FLOAT_ERROR_ADJUSTMENT=1e-5,REACTOR_DEPTH=1133,MAX_REACTOR_CELLS_ROWS=9,MAX_REACTOR_CELLS_COLUMNS=9,EMPTY_INTEGER_VALUE=0,REACTOR_LAYOUTS={1:[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],2:[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],3:[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],4:[[0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0]],5:[[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1]]},DIRECTIONS=[[0,-1],[-1,0],[0,1],[1,0]];var savedReactorLayouts=[[],[],[],[],[],[],[],[],[],[]],savedReactorLayoutNames=["","","","","","","","","",""];function saveReactorLayout(e){if(savedReactorLayouts[9].length>0)showAlertPrompt("You have too many reactor layouts. You must delete one before adding anymore.");else{var t=document.getElementById("simpleInputFieldText").value;if(document.getElementById("simpleInputFieldText").value="",t.length>0){var r=[];e.forEach((e=>{e.forEach((e=>{FUEL_ROD_TYPES.includes(e)?r.push(0):r.push(e)}))}));for(var n=0;n<savedReactorLayouts.length;n++)if(0==savedReactorLayouts[n].length){savedReactorLayoutNames[n]=t,savedReactorLayouts[n]=r;break}}}}function loadReactorLayout(e){reactor.grid.grid.forEach(((t,r)=>{t.forEach(((t,n)=>{var i=9*r+n;FUEL_ROD_TYPES.includes(reactor.grid.grid[r][n])?reactor.grid.getFuelCellRemainingEnergy(n,r)!=reactorComponents[reactor.grid.grid[r][n]].totalEnergyOutput?(reactor.grid.deleteFuelCellState(n,r),reactor.grid.deleteComponentInCellAndRemoveQuantityOwned(n,r)):reactor.grid.isFuelCellBurnedUp(n,r)?reactor.grid.collectFuelCell(n,r):(reactor.grid.deleteFuelCellState(n,r),reactor.grid.grid[r][n]=savedReactorLayouts[e][i]):reactor.grid.grid[r][n]=savedReactorLayouts[e][i]}))})),reactor.grid.fuelCellRemainingEnergy=[],reactor.grid.isGridDirty=!0}class ReactorGrid{grid=[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];fuelCellRemainingEnergy=[];isGridDirty=!0;componentInFocusX;componentInFocusY;cachedHeatPerSystem=[];cachedEnergyPerSecond=0;cachedMaxBatteryCapacity=0;cachedSystems=[];constructor(){}numGridColumns(){return this.grid[0].length}numGridRows(){return this.grid.length}setComponentAsInFocus(e,t){this.componentInFocusX=e,this.componentInFocusY=t}unsetComponentAsInFocus(e,t){e==this.componentInFocusX&&t==this.componentInFocusY&&(this.componentInFocusX=null,this.componentInFocusY=null)}getComponentTypeInCellAtLocation(e,t){return this.grid[t][e]}update(){this.isGridDirty&&(this.cachedSystems=this.getDistinctSystemFormations(),this.cachedEnergyPerSecond=this.energyProductionRatePerSecond(),this.cachedHeatPerSystem=this.computedHeatPerSystem(),this.cachedMaxBatteryCapacity=this.maxBatteryCapacity(),this.isGridDirty=!1)}addComponentToCell(e,t,r,n=null,i=null){if(this.grid[t][e]=r,reactorComponents[r].hasOwnProperty("totalEnergyOutput")&&null!=reactorComponents[r].totalEnergyOutput){var s=this.getIndexForFuelCell(n,i);if(null!=n&&null!=s){var o=s;this.fuelCellRemainingEnergy[o].x=e,this.fuelCellRemainingEnergy[o].y=t}else{var a=reactorComponents[r].totalEnergyOutput;this.fuelCellRemainingEnergy.push({y:t,x:e,remainingEnergy:a})}}this.isGridDirty=!0}removeComponentFromCell(e,t){this.grid[t][e]=0,this.isGridDirty=!0}deleteComponentInCellAndRemoveQuantityOwned(e,t){var r=this.getComponentTypeInCellAtLocation(e,t);r>0&&(reactorComponents[r].numOwned--,this.removeComponentFromCell(e,t))}getIndexForFuelCell(e,t){for(var r=0;r<this.fuelCellRemainingEnergy.length;r++)if(this.fuelCellRemainingEnergy[r].y==t&&this.fuelCellRemainingEnergy[r].x==e)return r;return null}isFuelCellBurnedUp(e,t){return this.fuelCellPercentBurned(e,t)>=1}getFuelCellRemainingEnergy(e,t){if(null!=this.getIndexForFuelCell(e,t)){var r=this.getComponentTypeInCellAtLocation(e,t);return(1-this.fuelCellPercentBurned(e,t))*reactorComponents[r].totalEnergyOutput}return 0}fuelCellPercentBurned(e,t){var r=this.getIndexForFuelCell(e,t);if(null!=r){var n=this.getComponentTypeInCellAtLocation(e,t);return 1-this.fuelCellRemainingEnergy[r].remainingEnergy/reactorComponents[n].totalEnergyOutput}return 1}deleteFuelCellState(e,t){var r=this.getIndexForFuelCell(e,t);this.fuelCellRemainingEnergy.splice(r,1),this.isGridDirty=!0}numOfTypeOnGrid(e){for(var t=0,r=0;r<9;r++)for(var n=0;n<9;n++)this.grid[r][n]==e&&t++;return t}isWithinGridRange(e,t){return this.grid.length>t&&this.grid[0].length>e&&t>=0&&e>=0}getDistinctSystemFormations(){for(var e=this.numGridColumns(),t=this.numGridRows(),r=[],n=0;n<e;n++)for(var i=0;i<t;i++)if(CONNECTING_TYPES.includes(this.grid[n][i])){var s=[];this.depthFirstSearch(this.grid,n,i,n,i,s),r.push(s)}for(n=0;n<e;n++)for(i=0;i<t;i++)this.grid[n][i]=Math.abs(this.grid[n][i]);return r}depthFirstSearch(e,t,r,n,i,s){var o=e.length,a=e[0].length;if(!(n<0||n>=a||i<0||i>=o)&&CONNECTING_TYPES.includes(e[n][i]))for(var l in e[n][i]*=-1,s.push({x:i,y:n,type:-1*e[n][i]}),DIRECTIONS)this.depthFirstSearch(e,t,r,n+DIRECTIONS[l][0],i+DIRECTIONS[l][1],s)}numDistincSystems(){return this.getDistinctSystemFormations().length}maxBatteryCapacity(){for(var e=this.numGridRows(),t=this.numGridColumns(),r=this.buffMultiplierArray(),n=0,i=0;i<e;i++)for(var s=0;s<t;s++){if(BATTERY_TYPES.includes(this.grid[i][s]))n+=r[i][s]*reactorComponents[this.grid[i][s]].energyStorage}return n}energyProductionRatePerSecond(){for(var e=this.numGridRows(),t=this.numGridColumns(),r=this.buffMultiplierArray(),n=0,i=0;i<e;i++)for(var s=0;s<t;s++){if(FUEL_ROD_TYPES.includes(this.grid[i][s])&&!this.isFuelCellBurnedUp(s,i))n+=r[i][s]*reactorComponents[this.grid[i][s]].energyProductionPerSecond}return n}buffMultiplierArray(){for(var e=this.numGridRows(),t=this.numGridColumns(),r=create2dArray(e,t,1),n=0;n<e;n++)for(var i=0;i<t;i++)if(BUFF_TYPES.includes(this.grid[n][i]))for(var s=reactorComponents[this.grid[n][i]],o=0;o<s.buffDirections.length;o++){var a=i+s.buffDirections[o].x,l=n+s.buffDirections[o].y;this.isWithinGridRange(a,l)&&(r[l][a]+=s.buffAmountMultiplierPerDirection)}return r}burnFuelCells(){for(var e=this.cachedSystems,t=this.buffMultiplierArray(),r=0;r<e.length;r++)for(var n=0;n<e[r].length;n++)if(FUEL_ROD_TYPES.includes(e[r][n].type)){var i=t[e[r][n].y][e[r][n].x]*reactorComponents[e[r][n].type].energyProductionPerSecond,s=this.getIndexForFuelCell(e[r][n].x,e[r][n].y);null!=s&&this.fuelCellPercentBurned(e[r][n].x,e[r][n].y)<1&&(this.fuelCellRemainingEnergy[s].remainingEnergy-=i,this.fuelCellPercentBurned(e[r][n].x,e[r][n].y)>=1&&(this.isGridDirty=!0))}}collectFuelCell(e,t){if(this.isFuelCellBurnedUp(e,t)){var r=this.getComponentTypeInCellAtLocation(e,t);if(FUEL_ROD_TYPES.includes(r)&&reactorComponents[r].numOwned>0){for(var n=reactorComponents[r].rewardOutput,i=0;i<n.length;i++){var s=n[i];s.item.grantQuantity(s.quantity),newNews(_("You gained {0} x {1} from the reactor",beautifynum(s.quantity),s.item.getName()),!0)}this.deleteFuelCellState(e,t),this.deleteComponentInCellAndRemoveQuantityOwned(e,t)}}}computedHeatPerSystem(){for(var e=duplicate2dArray(this.cachedSystems),t=this.numGridRows(),r=this.numGridColumns(),n=[],i=this.buffMultiplierArray(),s=0;s<e.length;s++){n.push({heat:0,fans:[],systems:deepCopyObject(e[s])});for(var o=!1,a=0;a<e[s].length;a++)if(reactorComponents[e[s][a].type].heat>0&&!this.isFuelCellBurnedUp(e[s][a].x,e[s][a].y)){var l=i[e[s][a].y][e[s][a].x];n[s].heat+=reactorComponents[e[s][a].type].heat*l,o=!0}o||(e.splice(s,1),n.splice(s,1),s--)}for(s=0;s<t;s++)for(a=0;a<r;a++)if(this.grid[s][a]==FAN_TYPE){for(var u=i[s][a],h=[],c=0;c<e.length;c++)for(var d=0;d<e[c].length;d++)Math.abs(e[c][d].y-s)+Math.abs(e[c][d].x-a)==1&&h.push(c);for(c=0;c<h.length;c++)n[h[c]].heat+=reactorComponents[FAN_TYPE].heat*u/h.length,n[h[c]].fans.push({x:a,y:s})}for(s=0;s<n.length;s++)n[s].heat<1e-5&&n[s].heat>0&&(n[s].heat=0);return n}isCellInOverheatingSystem(e,t){for(var r=0;r<this.cachedHeatPerSystem.length;r++)if(this.cachedHeatPerSystem[r].heat>0){for(var n=0;n<this.cachedHeatPerSystem[r].systems.length;n++)if(this.cachedHeatPerSystem[r].systems[n].x==e&&this.cachedHeatPerSystem[r].systems[n].y==t)return!0;for(n=0;n<this.cachedHeatPerSystem[r].fans.length;n++)if(this.cachedHeatPerSystem[r].fans[n].x==e&&this.cachedHeatPerSystem[r].fans[n].y==t)return!0}return!1}getSystemCellsToHighlightForCell(e,t){for(var r=[],n=0;n<this.cachedHeatPerSystem.length;n++){for(var i=!1,s=0;s<this.cachedHeatPerSystem[n].systems.length;s++)if(this.cachedHeatPerSystem[n].systems[s].x==e&&this.cachedHeatPerSystem[n].systems[s].y==t){i=!0;break}if(!i)for(s=0;s<this.cachedHeatPerSystem[n].fans.length;s++)if(this.cachedHeatPerSystem[n].fans[s].x==e&&this.cachedHeatPerSystem[n].fans[s].y==t){i=!0;break}if(i){var o=[];o=(o=o.concat(this.cachedHeatPerSystem[n].systems.slice(0,this.cachedHeatPerSystem[n].systems.length))).concat(this.cachedHeatPerSystem[n].fans.slice(0,this.cachedHeatPerSystem[n].fans.length)),r.push(o)}}return r}getCellHoveredSystemIndex(e,t){if(null!=this.componentInFocusX&&null!=this.componentInFocusY){for(var r=reactor.grid.getSystemCellsToHighlightForCell(this.componentInFocusX,this.componentInFocusY),n=0;n<r.length;n++)for(var i=0;i<r[n].length;i++)if(r[n][i].x==e&&r[n][i].y==t)return n;return-1}return-1}getSystemHeatForFuelCell(e,t){for(var r=0;r<this.cachedHeatPerSystem.length;r++)for(var n=0;n<this.cachedHeatPerSystem[r].systems.length;n++)if(this.cachedHeatPerSystem[r].systems[n].x==e&&this.cachedHeatPerSystem[r].systems[n].y==t)return this.cachedHeatPerSystem[r].heat;return 0}}class Reactor{grid;isRunning=!0;totalRuntimeSecs=0;componentBlueprintsUnlockedPerLevel={1:[0,3,6,9,10,13,21,24,18],2:[1,4,7,11,22,19],3:[2,5,8,12,23,20,14],4:[15,16],5:[17,25,26,27]};constructor(){this.grid=new ReactorGrid}update(){this.grid.update(),this.isRunning!=this.isAbleToRun()&&(this.isRunning=this.isAbleToRun(),!this.isRunning&&depth>=1134&&newNews(_("The Reactor Stopped Running"),!0)),this.isRunning&&(this.totalRuntimeSecs++,worldResources[NUCLEAR_ENERGY_INDEX].numOwned+=this.grid.cachedEnergyPerSecond,this.grid.burnFuelCells()),this.currentBatteryCharge()>this.grid.cachedMaxBatteryCapacity&&(worldResources[NUCLEAR_ENERGY_INDEX].numOwned=this.grid.cachedMaxBatteryCapacity),worldResources[NUCLEAR_ENERGY_INDEX].numOwned<0&&(worldResources[NUCLEAR_ENERGY_INDEX].numOwned=0)}isAtMaxLevel(){return!REACTOR_LAYOUTS.hasOwnProperty(reactorStructure.level+1)}isAbleToRun(){return this.hasExistingSystem()&&!this.isTooHot()&&!this.isEnergyDeficient()}getReasonForNotRunning(){return this.hasExistingSystem()?this.isTooHot()?_("One or more of your fuel rods is too hot and needs to be cooled further."):this.isEnergyDeficient()?_("You are using more energy than you are producing and you do not have the necessary energy held in batteries."):"Unknown (Contact Support)":this.grid.numOfTypeOnGrid(FAN_TYPE)>1?isMobile()?_("All of your fuel rods have fully burned. Tap your fuel rods to collect the reward materials and to delete them."):_("All of your fuel rods have fully burned. Click your fuel rods to collect the reward materials and to delete them."):isMobile()?_("Tap the backpack and drag components on to the grid. A fuel rod generates energy and heat. Fans cool the fuel rods. Batteries store energy."):_("Drag components from the left to the grid. A fuel rod generates energy and heat. Fans cool the fuel rods. Batteries store energy.")}getReactorStats(){return _("Energy/Sec: {0}",beautifynum(reactor.grid.energyProductionRatePerSecond()))+" - "+_("Battery: {0}",beautifynum(reactor.currentBatteryCharge())+"/"+beautifynum(reactor.grid.maxBatteryCapacity()))}hasExistingSystem(){return this.grid.cachedHeatPerSystem.length>0}isTooHot(){for(var e=0;e<this.grid.cachedHeatPerSystem.length;e++)if(this.grid.cachedHeatPerSystem[e].heat>0)return!0;return!1}isEnergyDeficient(){return this.currentBatteryCharge()+this.grid.cachedEnergyPerSecond<0&&this.grid.cachedEnergyPerSecond<0}currentBatteryCharge(){return numStoredNuclearEnergyOwned()}isCellUsable(e,t){return 1==REACTOR_LAYOUTS[reactorStructure.level][e][t]}numOfTypeInInventory(e){return reactorComponents.hasOwnProperty(e)?reactorComponents[e].numOwned-this.grid.numOfTypeOnGrid(e):0}getTypeForSlot(e){for(var t=1,r=0;r<e;){if(t>=reactorComponents.length)return-1;reactor.numOfTypeInInventory(t)>0&&r++,t++}return t-1}getSlotForType(e){for(var t=1,r=0;t<e;){if(t>=reactorComponents.length)return-1;reactor.numOfTypeInInventory(t)>0&&r++,t++}return r}learnReactorBlueprintsForLevel(){for(var e=reactorStructure.level;e>=1;e--)for(var t=0;t<this.componentBlueprintsUnlockedPerLevel[e].length;t++)learnBlueprint(6,this.componentBlueprintsUnlockedPerLevel[e][t])}}var reactor=new Reactor;
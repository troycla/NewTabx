var activeMonster,monsterskilled=0,whackosKilled=0,battleWaiting=[],dealtDmg=[],takenDmg=[],monsterAtkTime=0,monsterAtk=1,monsterMaxHP=1,monsterHP=1,depthOfMonster=0;function userMaxHealth(){for(var e=depth-300+Math.max(2*(depth-1e3),0),t=3*numQuestsCompleted(),n=3*gemForgeStructure.level*oilrigStructure.level,s=0,r=0;r<battleInventory.length;r++)battleInventory[r].length>7&&(s+=battleInventory[r][4]);return(800+s+4*(e+t+n))*STAT.battleHealthMultiplier()}var atkWeps=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],battleActive=!1,userMaxHP=1e3,userHP=1e3;function getEquip(e){if(e<0||e>=battleEquipStats.length)console.warn("Attempting to grant invalid weapon");else{for(var t=!0,n=999,s=0;s<battleInventory.length;s++)battleInventory[s].length>0?e==battleInventory[s][0]&&(t=!1,s=999):999==n&&(n=s);t&&n<999&&(battleInventory[n]=[e,0,0,0,0,0,0,0],makeBlueprintAvailable(2,e),learnBlueprint(2,e),newNews(_("The monster dropped a")+" "+getInventoryWeaponName(n)+"!",!0))}}function hasEquip(e){for(var t=!0,n=999,s=0;s<battleInventory.length;s++)battleInventory[s].length>0?e==battleInventory[s][0]&&(t=!1,s=999):999==n&&(n=s);return!(t&&n<999)}var bossesDefeated=0;class battleManager{monsters=[];bosses=[];eventMonsterOverrides=[];registerMonster(e){e.isBoss?this.bosses.push(e):this.monsters.push(e)}registerEventMonster(e){this.eventMonsterOverrides.push(e)}getMonstersAtDepth(e){return this.monsters.filter((t=>e>=t.minDepth&&e<=t.maxDepth))}getBossLevelAsset(e){return this.bosses.find((t=>t.isBoss&&t.minDepth==e&&t.maxDepth==e)).levelAsset}isActiveBossLevel(e){for(var t=bossesDefeated;t<this.bosses.length;t++)if(this.bosses[t].minDepth==e)return!0;return!1}isStalledDueToBoss(){return bossesDefeated<this.bosses.length&&this.bosses[bossesDefeated].minDepth<=depth}startBossBattle(){bossBattleId=bossesDefeated,preparebattle(!0),isBossBattleActive=!0}depthOfDeepestBossReached(){return this.bosses[bossesDefeated].minDepth}getMonsterToSpawn(e){let t=this.getMonstersAtDepth(e);return t[rand(0,t.length-1)]}}const BattleManager=new battleManager;class monster{name;animation;levelAsset;isBoss=!1;minDepth;maxDepth;baseDamage;attackSpeed;baseHealth;possibleEquipId;bonusReward;grantReward(){this.isBoss&&openGoldChest(),this.bonusReward&&this.bonusReward()}rollLevel(e){let t=e/this.maxDepth;return 1+Math.floor(Math.random()*t*3)}}function grantChestCompressor(){chestCompressorStructure.level=1,learnBlueprint(3,12),newNews(_("Discovered the Chest Compressor!"))}var newMonster,isBossBattleActive=!1,bossBattleId=-1,monstersOnLevels=[[[1,1],[1,2],[1,2]],[[1,2],[1,3],[1,3]],[[1,4],[2,1],[2,2]],[[2,1],[2,2],[1,3]],[[2,1],[2,2],[2,3]],[[2,2],[2,3],[2,1]],[[2,3],[2,3],[2,2]],[[2,3],[2,3],[2,3]],[[2,3],[2,3],[2,3]],[[2,4],[2,4],[2,4]],[[2,5],[2,5],[3,1]],[[3,1],[3,2],[3,2]],[[3,1],[3,2],[3,2]],[[3,2],[3,2],[3,3]],[[3,3],[3,3],[3,3]],[[3,3],[3,1],[3,3]],[[3,3],[3,2],[3,3]],[[3,3],[3,3],[3,4]],[[3,4],[3,4],[3,4]],[[3,4],[3,4],[3,4]],[[3,5],[3,5],[4,1]],[[4,1],[4,2],[3,2]],[[4,1],[4,2],[3,2]],[[4,2],[4,2],[3,3]],[[4,3],[4,3],[3,3]],[[4,3],[4,1],[3,3]],[[4,3],[4,2],[3,3]],[[4,3],[4,3],[3,4]],[[4,4],[4,4],[3,4]],[[4,4],[4,4],[3,4]],[[4,5],[4,5],[5,1]],[[5,1],[5,2],[4,2]],[[5,1],[5,2],[4,2]],[[5,2],[5,2],[4,3]],[[5,3],[5,3],[4,3]],[[5,3],[5,1],[4,3]],[[5,3],[5,2],[4,3]],[[5,3],[5,3],[4,4]],[[5,4],[5,4],[4,4]],[[5,4],[5,4],[4,4]],[[5,5],[5,5],[6,1]],[[6,1],[6,2],[5,2]],[[6,1],[6,2],[5,2]],[[6,2],[6,2],[5,3]],[[6,3],[6,3],[5,3]],[[6,3],[6,1],[5,3]],[[6,3],[6,2],[5,3]],[[6,3],[6,3],[5,4]],[[6,4],[6,4],[5,4]],[[6,4],[6,4],[7,1]],[[6,5],[6,5],[7,1]],[[6,6],[6,6],[7,2]],[[7,1],[7,2],[6,6]],[[7,1],[7,2],[6,6]],[[7,2],[7,3],[7,1]],[[7,2],[7,3],[7,1]],[[7,3],[7,3],[7,2]],[[7,3],[7,3],[7,2]],[[7,4],[7,3],[7,3]],[[7,4],[7,4],[7,3]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[7,4],[7,4],[7,4]],[[14,1],[14,1],[14,1]],[[14,1],[14,2],[14,1]],[[15,1],[14,2],[14,3]],[[15,1],[15,1],[15,2]],[[15,1],[15,2],[15,3]],[[15,2],[15,3],[16,1]],[[15,3],[15,4],[16,1]],[[15,4],[16,1],[16,2]],[[16,1],[16,1],[16,2]],[[16,1],[16,2],[16,3]],[[16,2],[16,3],[17,1]],[[16,3],[17,1],[17,1]],[[17,1],[17,1],[17,2]],[[17,1],[17,2],[17,3]],[[17,2],[17,2],[17,3]],[[17,3],[17,4],[18,1]],[[17,4],[18,1],[18,1]],[[18,1],[18,1],[18,2]],[[18,1],[18,1],[18,2]],[[18,1],[18,2],[18,2]],[[18,1],[18,2],[18,3]],[[18,2],[18,2],[18,3]],[[18,2],[18,3],[18,3]],[[18,2],[18,3],[18,4]],[[18,3],[18,3],[18,4]],[[18,3],[18,4],[19,1]],[[18,4],[18,4],[19,1]],[[18,5],[19,1],[19,2]],[[19,1],[19,1],[19,2]],[[19,1],[19,2],[19,2]],[[19,1],[19,2],[19,3]],[[19,2],[19,2],[19,3]],[[19,2],[19,3],[19,3]],[[19,2],[19,3],[19,4]],[[19,3],[19,3],[19,4]],[[19,4],[19,4],[27,1]],[[19,4],[19,4],[27,1]],[[19,4],[27,1],[27,2]],[[27,1],[27,1],[27,2]],[[27,1],[27,2],[27,2]],[[27,1],[27,2],[27,3]],[[27,2],[27,2],[27,3]],[[27,2],[27,3],[27,3]],[[27,2],[27,3],[27,4]],[[27,3],[27,3],[27,4]],[[27,4],[27,4],[28,1]],[[27,4],[27,4],[28,1]],[[28,1],[28,2],[28,2]],[[28,1],[28,1],[28,2]],[[28,1],[28,2],[28,2]],[[28,1],[28,2],[28,3]],[[28,2],[28,2],[28,3]],[[28,2],[28,3],[28,3]],[[28,2],[28,3],[28,4]],[[28,3],[28,3],[28,4]],[[28,4],[28,4],[29,1]],[[28,4],[28,4],[29,1]],[[29,1],[29,2],[29,2]],[[29,1],[29,1],[29,2]],[[29,1],[29,2],[29,2]],[[29,1],[29,2],[29,3]],[[29,2],[29,2],[29,3]],[[29,2],[29,3],[29,3]],[[29,2],[29,3],[29,4]],[[29,3],[29,3],[29,4]],[[29,4],[29,4],[30,1]],[[29,4],[29,4],[30,1]],[[30,1],[30,2],[30,2]],[[30,1],[30,1],[30,2]],[[30,1],[30,2],[30,2]],[[30,1],[30,2],[30,3]],[[30,2],[30,2],[30,3]],[[30,2],[30,3],[30,3]],[[30,2],[30,3],[30,4]],[[30,3],[30,3],[30,4]],[[30,4],[30,4],[30,4]],[[30,4],[30,4],[30,4]],[[30,4],[30,4],[30,4]],[[7,4],[7,4],[7,4]],[[31,1],[31,1],[31,1]],[[31,1],[31,1],[31,1]],[[31,1],[31,1],[31,2]],[[31,1],[31,2],[31,2]],[[31,2],[31,2],[31,2]],[[31,2],[31,2],[31,3]],[[31,2],[31,3],[31,3]],[[31,3],[31,3],[31,3]],[[31,3],[31,4],[31,4]],[[32,1],[32,1],[32,2]],[[32,1],[32,2],[32,2]],[[32,1],[32,2],[32,3]],[[32,2],[32,2],[32,3]],[[32,2],[32,3],[32,3]],[[32,2],[32,3],[32,4]],[[32,3],[32,3],[32,4]],[[32,4],[32,4],[32,4]],[[32,4],[32,4],[32,4]],[[32,4],[32,4],[32,4]]];function preparebattle(e=!1){if(!battleActive&&!isBossBattleActive){if(e)activeMonster=BattleManager.bosses[bossBattleId],monsterAtk=activeMonster.baseDamage,monsterMaxHP=activeMonster.baseHealth;else{if(activeMonster=battleWaiting[2],BattleManager.eventMonsterOverrides.length>0&&Math.random()>.66){let e=BattleManager.eventMonsterOverrides[rand(0,BattleManager.eventMonsterOverrides.length-1)];Object.assign(activeMonster,e)}let e=activeMonster.rollLevel(battleWaiting[1]);monsterAtk=Math.floor(activeMonster.baseDamage*Math.pow(1.05,e)),monsterMaxHP=Math.floor(activeMonster.baseHealth*Math.pow(1.05,e))}monsterAtkTime=currentTime(),monsterHP=monsterMaxHP,dealtDmg=[],takenDmg=[],atkWeps=[0,0,0,0,0,0,0,0,0,0,0,0],userMaxHP=userMaxHealth(),userHP=userMaxHP,openUi(BattleWindow,null,activeMonster)}}function atk(e){if(battleActive&&e>-1&&currentTime()-atkWeps[e]>=getInventoryWeaponSpeed(e)){atkWeps[e]=currentTime();var t=Math.round(getInventoryWeaponAttack(e)*STAT.battleDamageMultiplier()),n=STAT.battleCritChance(),s=rand(0,100)<n;if(s&&(t*=2),monsterHP-=t,t>0&&dealtDmg.push([t,currentTime(),s]),10==battleInventory[e][0]&&(userHP+=.05*userMaxHP)>userMaxHP&&(userHP=userMaxHP),11==battleInventory[e][0])for(var r=0;r<atkWeps.length;r++)r!=e&&(atkWeps[r]-=.33*getInventoryWeaponSpeed(r));monsterHP<=0&&wonBattle()}}function monsterAttacked(){var e=rand(Math.ceil(.5*monsterAtk),Math.floor(1.5*monsterAtk));userHP-=e,takenDmg.push([e,currentTime()]),userHP<=0&&lostBattle()}function wonBattle(){if(battleActive=!1,closeUiByName("Battle"),monsterskilled++,"Whacko"==activeMonster.name&&whackosKilled++,isBossBattleActive)trackEvent_FinishBossBattle(1),isBossBattleActive=!1,bossesDefeated++,mutebuttons||defeatBossAudio.play();else{var e=new BigNumber(Math.floor(100*Math.pow(depthOfMonster/depth,2)*depthMultiplier())).multiply(valueOfMineralsPerSecond()).multiply(108);trackEvent_GainedMoney(e,5),addMoney(e),newNews(activeMonster.name+" "+_("dropped")+" $"+beautifynum(e),!0),rand(0,1e3)<35&&getEquip(activeMonster.possibleEquipId)}activeMonster.grantReward()}function lostBattle(){isBossBattleActive&&trackEvent_FinishBossBattle(0),newNews(_("You lost the Battle"),!0),newNews(_("Become stronger by upgrading your weapons or finding more in chests"),!0),battleActive=!1,closeUiByName("Battle"),isBossBattleActive=!1,bossBattleId=-1}function upgradeInventory(e){if(battleInventory[e].length>2){var t=battleInventory[e][4];worldResources[OIL_INDEX].numOwned>=upgradeEquipCosts[battleInventory[e][0]][t][0]&&money.greaterThanOrEqualTo(upgradeEquipCosts[battleInventory[e][0]][t][1])&&!battleInventory[e][6]?(worldResources[OIL_INDEX].numOwned-=upgradeEquipCosts[battleInventory[e][0]][t][0],subtractMoney(upgradeEquipCosts[battleInventory[e][0]][t][1]),battleInventory[e][6]=1,battleInventory[e][5]=upgradeEquipCosts[battleInventory[e][0]][t][2]*STAT.gemSpeedMultiplier()):newNews(_("An Error occured. Do you have enough money and oil?"))}}function upgradelogic(e){oilLogic(e)}function battlerand(){if(battleSpawnRoller.boolean(.07)){var e=workersHiredAtDepth(depth),t=battleSpawnRoller.rand(1,e);spawnBattleOnFloor(battleSpawnRoller.rand(Math.max(304,Math.floor(.5*depth)),depth),t)}}function spawnBattleOnFloor(e,t){0==battleWaiting.length&&depth>303&&!isDepthWithoutWorkers(e)&&(newNews(_("Miner #{0} is being attacked at Depth {1}km!",t,e),!0),battleWaiting=[t,e,BattleManager.getMonsterToSpawn(e)])}(newMonster=new monster).name="Rocket",newMonster.animation=new SpritesheetAnimation(monster01,4,4),newMonster.minDepth=300,newMonster.maxDepth=340,newMonster.baseDamage=12,newMonster.attackSpeed=1e3,newMonster.baseHealth=70,newMonster.possibleEquipId=2,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Ramer",newMonster.animation=new SpritesheetAnimation(monster02,4,4),newMonster.minDepth=330,newMonster.maxDepth=410,newMonster.baseDamage=22,newMonster.attackSpeed=1e3,newMonster.baseHealth=120,newMonster.possibleEquipId=3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Stoner",newMonster.animation=new SpritesheetAnimation(monster03,4,4),newMonster.minDepth=400,newMonster.maxDepth=520,newMonster.baseDamage=30,newMonster.attackSpeed=1200,newMonster.baseHealth=270,newMonster.possibleEquipId=3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="RockLord",newMonster.animation=new SpritesheetAnimation(monster04,4,4),newMonster.minDepth=500,newMonster.maxDepth=620,newMonster.baseDamage=40,newMonster.attackSpeed=1200,newMonster.baseHealth=500,newMonster.possibleEquipId=4,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Ting",newMonster.animation=new SpritesheetAnimation(monster05,4,4),newMonster.minDepth=605,newMonster.maxDepth=720,newMonster.baseDamage=60,newMonster.attackSpeed=1200,newMonster.baseHealth=500,newMonster.possibleEquipId=5,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Blurk",newMonster.animation=new SpritesheetAnimation(monster06,4,4),newMonster.minDepth=700,newMonster.maxDepth=840,newMonster.baseDamage=125,newMonster.attackSpeed=2250,newMonster.baseHealth=600,newMonster.possibleEquipId=6,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Necro",newMonster.animation=new SpritesheetAnimation(monster07,4,4),newMonster.minDepth=795,newMonster.maxDepth=1020,newMonster.baseDamage=200,newMonster.attackSpeed=1500,newMonster.baseHealth=600,newMonster.possibleEquipId=7,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Purpa",newMonster.animation=new SpritesheetAnimation(monster08,4,4),newMonster.minDepth=1020,newMonster.maxDepth=1050,newMonster.baseDamage=250,newMonster.attackSpeed=2200,newMonster.baseHealth=760,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Blurb",newMonster.animation=new SpritesheetAnimation(monster09,4,4),newMonster.minDepth=1045,newMonster.maxDepth=1095,newMonster.baseDamage=275,newMonster.attackSpeed=2200,newMonster.baseHealth=1500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Blinky",newMonster.animation=new SpritesheetAnimation(monster10,4,4),newMonster.minDepth=1090,newMonster.maxDepth=1135,newMonster.baseDamage=300,newMonster.attackSpeed=2200,newMonster.baseHealth=1500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Bulda",newMonster.animation=new SpritesheetAnimation(monster11,4,4),newMonster.minDepth=1130,newMonster.maxDepth=1185,newMonster.baseDamage=324,newMonster.attackSpeed=2500,newMonster.baseHealth=2e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Whacko",newMonster.animation=new SpritesheetAnimation(monster12,4,4),newMonster.minDepth=1170,newMonster.maxDepth=1300,newMonster.baseDamage=350,newMonster.attackSpeed=1300,newMonster.baseHealth=2e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Godu",newMonster.animation=new SpritesheetAnimation(monster13,4,4),newMonster.minDepth=1280,newMonster.maxDepth=1390,newMonster.baseDamage=375,newMonster.attackSpeed=1500,newMonster.baseHealth=3e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Woobla",newMonster.animation=new SpritesheetAnimation(monster14,4,4),newMonster.minDepth=1370,newMonster.maxDepth=1490,newMonster.baseDamage=600,newMonster.attackSpeed=1e3,newMonster.baseHealth=1500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Wormer",newMonster.animation=new SpritesheetAnimation(monster15,4,4),newMonster.minDepth=1475,newMonster.maxDepth=1580,newMonster.baseDamage=650,newMonster.attackSpeed=1e3,newMonster.baseHealth=1700,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Wooblo",newMonster.animation=new SpritesheetAnimation(monster16,4,4),newMonster.minDepth=1575,newMonster.maxDepth=1685,newMonster.baseDamage=675,newMonster.attackSpeed=1500,newMonster.baseHealth=1800,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Sploog",newMonster.animation=new SpritesheetAnimation(monster17,4,4),newMonster.minDepth=1675,newMonster.maxDepth=1810,newMonster.baseDamage=750,newMonster.attackSpeed=1500,newMonster.baseHealth=2e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Razors",newMonster.animation=new SpritesheetAnimation(monster18,4,4),newMonster.minDepth=1810,newMonster.maxDepth=1900,newMonster.baseDamage=750,newMonster.attackSpeed=1250,newMonster.baseHealth=2500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name="Wriggleys",newMonster.animation=new SpritesheetAnimation(monster19,4,4),newMonster.minDepth=1900,newMonster.maxDepth=2e3,newMonster.baseDamage=775,newMonster.attackSpeed=1250,newMonster.baseHealth=2500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Imp Overlord"),newMonster.animation=new SpritesheetAnimation(ImpBoss,4,4),newMonster.levelAsset=bossLevel1,newMonster.isBoss=!0,newMonster.minDepth=400,newMonster.maxDepth=400,newMonster.baseDamage=30,newMonster.attackSpeed=1e3,newMonster.baseHealth=300,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("The Unnamed"),newMonster.animation=new SpritesheetAnimation(AbominationBoss,4,4),newMonster.levelAsset=bossLevel2,newMonster.isBoss=!0,newMonster.minDepth=500,newMonster.maxDepth=500,newMonster.baseDamage=45,newMonster.attackSpeed=2e3,newMonster.baseHealth=780,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Immortal Warlock"),newMonster.animation=new SpritesheetAnimation(WarlockBoss,4,4),newMonster.levelAsset=bossLevel3,newMonster.isBoss=!0,newMonster.minDepth=600,newMonster.maxDepth=600,newMonster.baseDamage=55,newMonster.attackSpeed=2e3,newMonster.baseHealth=900,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Demon Beast"),newMonster.animation=new SpritesheetAnimation(DemonBoss,4,4),newMonster.levelAsset=bossLevel4,newMonster.isBoss=!0,newMonster.minDepth=700,newMonster.maxDepth=700,newMonster.baseDamage=65,newMonster.attackSpeed=2500,newMonster.baseHealth=950,newMonster.bonusReward=grantChestCompressor,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Ancient Wizard"),newMonster.animation=new SpritesheetAnimation(AncientBoss,4,4),newMonster.levelAsset=bossLevel5,newMonster.isBoss=!0,newMonster.minDepth=800,newMonster.maxDepth=800,newMonster.baseDamage=105,newMonster.attackSpeed=3e3,newMonster.baseHealth=1300,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Radioactive Butcher"),newMonster.animation=new SpritesheetAnimation(RadioactiveBoss,4,4),newMonster.levelAsset=bossLevel6,newMonster.isBoss=!0,newMonster.minDepth=900,newMonster.maxDepth=900,newMonster.baseDamage=150,newMonster.attackSpeed=3e3,newMonster.baseHealth=1500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("The Infected"),newMonster.animation=new SpritesheetAnimation(ImpBoss,4,4),newMonster.levelAsset=bossLevel7,newMonster.isBoss=!0,newMonster.minDepth=1132,newMonster.maxDepth=1132,newMonster.baseDamage=200,newMonster.attackSpeed=2500,newMonster.baseHealth=2500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("The Infector"),newMonster.animation=new SpritesheetAnimation(TheInfected,4,4),newMonster.levelAsset=bossLevel8,newMonster.isBoss=!0,newMonster.minDepth=1232,newMonster.maxDepth=1232,newMonster.baseDamage=300,newMonster.attackSpeed=2700,newMonster.baseHealth=3500,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Zorgax - 036"),newMonster.animation=new SpritesheetAnimation(Zorgax,4,4),newMonster.levelAsset=bossLevel9,newMonster.isBoss=!0,newMonster.minDepth=1332,newMonster.maxDepth=1332,newMonster.baseDamage=375,newMonster.attackSpeed=2800,newMonster.baseHealth=4e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Ancient Defender"),newMonster.animation=new SpritesheetAnimation(AncientDefender,4,4),newMonster.levelAsset=bossLevel10,newMonster.isBoss=!0,newMonster.minDepth=1432,newMonster.maxDepth=1432,newMonster.baseDamage=500,newMonster.attackSpeed=4e3,newMonster.baseHealth=8e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Squido"),newMonster.animation=new SpritesheetAnimation(Squido,4,4),newMonster.levelAsset=bossLevel11,newMonster.isBoss=!0,newMonster.minDepth=1532,newMonster.maxDepth=1532,newMonster.baseDamage=500,newMonster.attackSpeed=3e3,newMonster.baseHealth=9e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Lunarios"),newMonster.animation=new SpritesheetAnimation(Lunarios,4,4),newMonster.levelAsset=bossLevel12,newMonster.isBoss=!0,newMonster.minDepth=1632,newMonster.maxDepth=1632,newMonster.baseDamage=550,newMonster.attackSpeed=3e3,newMonster.baseHealth=9e3,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Bargo"),newMonster.animation=new SpritesheetAnimation(Bargo,4,4),newMonster.levelAsset=bossLevel13,newMonster.isBoss=!0,newMonster.minDepth=1732,newMonster.maxDepth=1732,newMonster.baseDamage=600,newMonster.attackSpeed=3e3,newMonster.baseHealth=1e4,BattleManager.registerMonster(newMonster),(newMonster=new monster).name=_("Angler"),newMonster.animation=new SpritesheetAnimation(Angler,4,4),newMonster.levelAsset=bossLevel14,newMonster.isBoss=!0,newMonster.minDepth=1914,newMonster.maxDepth=1914,newMonster.baseDamage=600,newMonster.attackSpeed=3e3,newMonster.baseHealth=1e4,BattleManager.registerMonster(newMonster);
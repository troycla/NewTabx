var droneBlueprints=[{id:0,name:_("Basic Drone"),category:craftingCategories.drones,price:0,craftedItem:{item:new DroneCraftingItem(0),quantity:1},ingredients:[]},{id:1,name:_("Magnetic Drone"),category:craftingCategories.drones,price:0,craftedItem:{item:new DroneCraftingItem(1),quantity:1},ingredients:[]},{id:2,name:_("Aerial Drone"),category:craftingCategories.drones,price:0,craftedItem:{item:new DroneCraftingItem(2),quantity:1},ingredients:[]},{id:3,name:_("Healing Drone"),category:craftingCategories.drones,price:0,craftedItem:{item:new DroneCraftingItem(3),quantity:1},ingredients:[]}],droneUpgradeBlueprints=[{id:0,name:_("Basic Drone Upgrade"),category:craftingCategories.droneUpgrades,price:150,craftedItem:{item:new DroneUpgradeCraftingItem(0),quantity:1},levels:[{ingredients:[]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(15e9)},{item:new MineralCraftingItem(RED_DIAMOND_INDEX),quantity:1e5}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(15e10)},{item:new MineralCraftingItem(CALIFORNIUM_INDEX),quantity:1e6}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(3e12)},{item:new MineralCraftingItem(OIL_INDEX),quantity:3e3},{item:new MineralCraftingItem(POLONIUM3_INDEX),quantity:500}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(1e15)},{item:new MineralCraftingItem(TITANIUM_INDEX),quantity:50}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(1e16)},{item:new MineralCraftingItem(PROMETHIUM_INDEX),quantity:5e5}]}]},{id:1,name:_("Magnetic Drone Upgrade"),category:craftingCategories.droneUpgrades,price:150,craftedItem:{item:new DroneUpgradeCraftingItem(1),quantity:1},levels:[{ingredients:[]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(1e10)},{item:new MineralCraftingItem(BLUE_OBSIDIAN_INDEX),quantity:1e5}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(1e13)},{item:new MineralCraftingItem(OIL_INDEX),quantity:500}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e13)},{item:new MineralCraftingItem(OIL_INDEX),quantity:5e3}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e14)},{item:new MineralCraftingItem(MAGNESIUM_INDEX),quantity:5e4}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e19)},{item:new MineralCraftingItem(NEODYMIUM_INDEX),quantity:5e4}]}]},{id:2,name:_("Aerial Drone Upgrade"),category:craftingCategories.droneUpgrades,price:150,craftedItem:{item:new DroneUpgradeCraftingItem(2),quantity:1},levels:[{ingredients:[]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e10)},{item:new MineralCraftingItem(CALIFORNIUM_INDEX),quantity:2e5}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(1e11)},{item:new MineralCraftingItem(CALIFORNIUM_INDEX),quantity:1e6}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(3e14)},{item:new MineralCraftingItem(OIL_INDEX),quantity:1e4}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(25e14)},{item:new MineralCraftingItem(SILICON_INDEX),quantity:5e6}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(75e18)},{item:new MineralCraftingItem(NEODYMIUM_INDEX),quantity:5e4}]}]},{id:3,name:_("Healing Drone Upgrade"),category:craftingCategories.droneUpgrades,price:150,craftedItem:{item:new DroneUpgradeCraftingItem(3),quantity:1},levels:[{ingredients:[]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e10)},{item:new MineralCraftingItem(OIL_INDEX),quantity:2e3}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e11)},{item:new MineralCraftingItem(IRON_INDEX),quantity:1e6}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(5e14)},{item:new MineralCraftingItem(OIL_INDEX),quantity:15e3}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(25e15)},{item:new MineralCraftingItem(TITANIUM_INDEX),quantity:5e6}]},{ingredients:[{item:new MoneyCraftingItem,quantity:new BigNumber(75e19)},{item:new MineralCraftingItem(YTTERBIUM_INDEX),quantity:1e7}]}]}];function learnReachedDroneBlueprints(){depth>=CAVE_BUILDING_DEPTH&&!isBlueprintKnown(craftingCategories.drones,0)&&(learnRangeOfBlueprints(craftingCategories.drones,0,2),learnRangeOfBlueprints(craftingCategories.droneUpgrades,0,2),learnRangeOfBlueprints(craftingCategories.structures,10,11))}craftingBlueprints[craftingCategories.drones]=droneBlueprints,craftingBlueprints[craftingCategories.droneUpgrades]=droneUpgradeBlueprints;
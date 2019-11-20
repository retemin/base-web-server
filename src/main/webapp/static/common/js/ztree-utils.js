/**
 * 
 */

function zTreeSearch(treeObj,searchContent){
	var nodes=treeObj.getNodesByParamFuzzy('name',searchContent,null);
	treeObj.expandAll(false);
	treeObj.refresh();
	for ( var i in nodes) {
		if (nodes[i].level > 0) {
			var parent = treeObj.getNodeByTId(nodes[i].parentTId);
			if (!parent.open) {
				treeObj.expandNode(parent, true);
			}
			treeObj.selectNode(nodes[i], true);
		}
	}
		
}
var ztreeUtil={};
ztreeUtil={
initRightMenu:function(menu,treeObj,option){
		
		treeObj.setting.callback.onRightClick=function(event, treeId, treeNode){
			
		}
		
	},
	
	
}
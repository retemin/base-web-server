package com.grkj.modules.sys.service;

import java.util.List;

import com.grkj.common.base2.core.CurdService;
import com.grkj.modules.sys.entity.Menu;

public interface MenuService extends CurdService<Menu>{
	
	
	List<Menu> getListByUserId(String userId);
	List<Menu> getListByUserId(String userId,String parentId);
	
	List<Menu> getListByScopeAndUserId(String scope, String userId);
	List<Menu> getListByScopeAndUserId(String scope, String userId,String parentId);
	
	List<Menu> getListByUserIdAndType(String userId,String type);
	List<Menu> getListByUserIdAndType(String userId,String type,String parentId);
	List<Menu> getListByScopeAndUserIdAndType(String scope, String userId,String type);
	List<Menu> getListByScopeAndUserIdAndType(String scope, String userId,String type,String parentId);
	
	List<Menu> getListByRoleId(String roleId);
	void saveRoleMenuByRoleId(String roleId, List<String> menuIds);
}

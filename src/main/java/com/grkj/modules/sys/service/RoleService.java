package com.grkj.modules.sys.service;

import java.util.List;

import com.grkj.common.base2.core.CurdService;
import com.grkj.modules.sys.entity.Role;

public interface RoleService extends CurdService<Role> {
	public static final String RMI_SERVICENAME="Role";
	
	List<Role> getUserRoleByUserId(String userId);
	void saveUserRoleByUserId(String userId, List<String> roleIds);
	
	void updateFlag(String id, String flag);
	
	public boolean isSupperAdmin(String userId);
}

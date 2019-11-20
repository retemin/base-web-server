package com.grkj.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.entity.Role;

@DBMapper
public interface RoleMenuMapper {
	
	List<Menu> getMenuListByRoleId(String roleId);
	List<Role> getRoleListByMenuId(String menuId);
	Integer insertRoleMenuByRoleId(@Param("roleId")String roleId,@Param("menuIds")List<String> menuIds);
	Integer insertRoleMenuByMenuId(@Param("menuId")String menuId,@Param("roleIds")List<String> roleIds);
	Integer deleteRoleMenuByRoleId(String roleId);
	Integer deleteRoleMenuByMenuId(String menuId);
}

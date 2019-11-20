package com.grkj.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.Role;
import com.grkj.modules.sys.entity.User;

@DBMapper
public interface UserRoleMapper {
	
	List<User> getUserListByRoleId(String RoleId);
	List<Role> getRoleListByUserId(String userId);
	Integer insertUserRoleByRoleId(@Param("roleId")String roleId,@Param("userIds")List<String> userIds);
	Integer insertUserRoleByUserId(@Param("userId")String userId,@Param("roleIds")List<String> roleIds);
	Integer deleteUserRoleByRoleId(String roleId);
	Integer deleteUserRoleByUserId(String userId);


}

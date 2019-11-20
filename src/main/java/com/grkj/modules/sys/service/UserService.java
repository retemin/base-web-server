package com.grkj.modules.sys.service;

import java.util.List;
import java.util.Map;

import com.grkj.common.base2.core.CurdService;
import com.grkj.modules.sys.entity.User;

public interface UserService extends CurdService<User> {
	
	public static final String RMI_SERVICENAME="User";
	
	String HASH_ALGORITHM = "SHA-1";
	int HASH_INTERATIONS = 1024;
	int SALT_SIZE = 8;
	
	/**
	 * 加密密码保存用户数据
	 * @param user
	 * @return
	 */
	User insertOrUpdateWithEncryptPassword(User user);
	
	/**
	 * 更新用户可用标志
	 * @param id
	 * @param flag
	 */
	void updateFlag(String id, String flag);
	
	/**
	 * 更新用户密码
	 * @param userId
	 * @param oldPassword
	 * @param newPassword
	 */
	void updatePassword(String userId, String oldPassword, String newPassword);
	
	/**
	 * 获取人员信息的树接口（父节点为人员所在部门）
	 * @param officeParentId
	 * @return
	 */
	List<Map<String,Object>> getUserTree(String officeParentId);
	
	/**
	 * 根据部门查询属于这个部门用户列表
	 * @return
	 */
	List<User> getListByOfficeId(String officeId, Map<String, Object> param);
	
	/**
	 * 根据部门查询不属于这个部门的其他用户
	 * @return
	 */
	List<User> getListByOfficeIdNot(String officeId, Map<String, Object> param);
	
	/**
	 * 根据部门查询属于这个角色的用户列表
	 * @return
	 */
	List<User> getListByRoleId(String roleId, Map<String, Object> param);
	
	/**
	 * 更新用户部门
	 * @param userIds
	 * @param officeId
	 */
	void updateUsersOffice(List<String> userIds, String officeId);
	

	/**
	 * 获取当前用户
	 * @return
	 */
	public User getNowUser();


	/**
	 * 根据登录名获取用户
	 * @param loginName
	 * @return
	 */
	public User getByLoginName(String loginName);

	/**
	 * 锁定用户,将flag置零
	 * @param userLoginName
	 */
	void lockUser(String userLoginName);

	/**
	 * 加密密码的方法，用于获取密码的加密串
	 * @param oldPassword
	 * @return
	 */
	String encryptPassword(String oldPassword);
	

	/**
	 * 获得全部启用的用户信息
	 * @return
	 */
	List<User> getActiveUser();

	/**
	 * 根据角色编号，获得用户信息
	 * @param roleId
	 * @return
	 */
	List<User> getUserByRoleId(String roleId);

	/**
	 * 根据id传查询一批用户
	 * @param ids
	 * @return
	 */
	List<User> getByIds(List<String> ids);
}

package com.grkj.modules.sys.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Role;
import com.grkj.modules.sys.mapper.RoleMapper;
import com.grkj.modules.sys.mapper.RoleMenuMapper;
import com.grkj.modules.sys.mapper.UserRoleMapper;
import com.grkj.modules.sys.service.RoleService;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class RoleServiceImpl   implements BaseMapperCurdService<Role>,RoleService{
	
	@Autowired
	private UserRoleMapper userRoleMapper;
	@Autowired
	private RoleMenuMapper roleMenuMapper;
	
	@Autowired
	private RoleMapper mapper;
	
	@Override
	public RoleMapper getMapper() {
		// TODO Auto-generated method stub
		return mapper;
	}
	
	
	@Transactional
	@Override
	public Integer deleteById(Object id) {
		// TODO Auto-generated method stub
		Integer result = BaseMapperCurdService.super.deleteById(id);
		userRoleMapper.deleteUserRoleByRoleId((String) id);
		roleMenuMapper.deleteRoleMenuByRoleId((String) id);
		return result;
	}

	@Override
	public List<Role> getList(Object param) {
		// TODO Auto-generated method stub
		Example example=new Example(Role.class);
		if(param!=null){
			Criteria cr = example.createCriteria();
			Map<String,Object> paramMap=(Map<String, Object>) param;
			String name=(String) paramMap.get("name");
			if(!StringUtils.isBlank(name)){
				cr.andLike("name", "%"+name+"%");
			}
		}
		
		return getMapper().selectByExample(example);
	}


	@Transactional
	@Override
	public void updateFlag(String id,String flag) {
		// TODO Auto-generated method stub
		Role role=new Role();
		role.setId(id);
		role.setFlag(flag);
		updateSelective(role);
	}
	
	@Override
	public List<Role> getUserRoleByUserId(String userId) {
		// TODO Auto-generated method stub
		return userRoleMapper.getRoleListByUserId(userId);
	}
	
	@Transactional
	@Override
	public void saveUserRoleByUserId(String userId,List<String> roleIds) {
		// TODO Auto-generated method stub
		userRoleMapper.deleteUserRoleByUserId(userId);
		if(roleIds!=null&&roleIds.size()>0){
			userRoleMapper.insertUserRoleByUserId(userId, roleIds);
		}
	}
	
	/**
	 * 判断当前用户是否是超级管理员
	 * 是返回true,不是返回false
	 */
	@Override
	public boolean isSupperAdmin(String userId){
		List<Role> list = getUserRoleByUserId(userId);
		for (Role r : list) {
			if("系统超级管理员".equals(r.getName())){
				return true;
			}
		}
		return false;
	}

	


}

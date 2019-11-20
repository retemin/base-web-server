package com.grkj.modules.sys.serviceImpl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.mapper.MenuMapper;
import com.grkj.modules.sys.mapper.RoleMenuMapper;
import com.grkj.modules.sys.service.MenuService;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;
@Service
public class MenuServiceImpl  implements BaseMapperCurdService<Menu>,MenuService{
	
	@Autowired
	private RoleMenuMapper roleMenuMapper;
	
	@Autowired
	private MenuMapper mapper;
	
	public MenuMapper getMapper(){
		return mapper;
	}
	
	@Transactional()
	public void saveRoleMenuByRoleId(String roleId,List<String> menuIds){
		roleMenuMapper.deleteRoleMenuByRoleId(roleId);
		roleMenuMapper.insertRoleMenuByRoleId(roleId, menuIds);
	}
	

	@Transactional()
	@Override
	public Integer deleteById(Object id) {
		Integer result = BaseMapperCurdService.super.deleteById(id);
		roleMenuMapper.deleteRoleMenuByMenuId((String) id);
		return result;
	}


	@Override
	public List<Menu> getList(Object param) {
		@SuppressWarnings("unchecked")
		Map<String,Object> paramMap=(Map<String, Object>) param;
		
		Example example=new Example(Menu.class);
		Criteria cr = example.createCriteria();
		if(!StringUtils.isBlank((String) paramMap.get("name"))){
			cr.andLike("name", (String) paramMap.get("name"));
		}
		
		if(!StringUtils.isBlank((String) paramMap.get("flag"))){
			cr.andEqualTo("flag", (String) paramMap.get("flag"));
		}
		if(!StringUtils.isBlank((String) paramMap.get("scope"))){
			cr.andEqualTo("scope", (String) paramMap.get("scope"));
		}
		
		example.setOrderByClause("sort");
		return getMapper().selectByExample(example);
	}

	@Override
	public List<Menu> getListByUserId(String userId) {
		return getMapper().getListByUserId(userId,null,null);
	}
	
	@Override
	public List<Menu> getListByUserId(String userId, String parentId) {
		return getMapper().getListByUserId(userId,null,parentId);
	}

	@Override
	public List<Menu> getListByScopeAndUserId(String scope, String userId) {
		return getMapper().getListByScopeAndUserId(scope, userId,null,null);
	}
	
	@Override
	public List<Menu> getListByScopeAndUserId(String scope, String userId, String parentId) {
		return getMapper().getListByScopeAndUserId(scope, userId,null,parentId);
	}
	
	@Override
	public List<Menu> getListByUserIdAndType(String userId, String type) {
		return getMapper().getListByUserId(userId,type,null);
	}


	@Override
	public List<Menu> getListByUserIdAndType(String userId, String type, String parentId) {
		return getMapper().getListByUserId(userId,type,parentId);
	}


	@Override
	public List<Menu> getListByScopeAndUserIdAndType(String scope, String userId, String type) {
		return getMapper().getListByScopeAndUserId(scope, userId,type,null);
	}


	@Override
	public List<Menu> getListByScopeAndUserIdAndType(String scope, String userId, String type, String parentId) {
		return getMapper().getListByScopeAndUserId(scope, userId,type,parentId);
	}

	@Override
	public List<Menu> getListByRoleId(String roleId) {
		return roleMenuMapper.getMenuListByRoleId(roleId);
	}

	

	/**
	 * 填充parentids 字段
	 * @param data
	 * @return
	 */
	protected Menu fixParentIds(Menu data) {
		if(!StringUtils.isBlank( data.getParentId())){
			Menu parent = getById( data.getParentId());
			if(parent!=null&&!StringUtils.isBlank(parent.getParentIds())){
				data.setParentIds(parent.getParentIds()+parent.getId()+";");
			}else{
				data.setParentIds(data.getParentId()+";");
			}
		}
		return data;
	}

	@Override
	public boolean preInsert(Menu data) {
		data=fixParentIds(data);
		return BaseMapperCurdService.super.preInsert(data);
	}
	

	@Override
	public boolean preUpdate(Menu data) {
		data=fixParentIds(data);
		return BaseMapperCurdService.super.preUpdate(data);
	}


	



	

}

package com.grkj.modules.sys.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.grkj.Global;
import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.cache.core.Cache;
import com.grkj.lib.cache.core.CacheManager;
import com.grkj.lib.message.Exception.DataNotExistException;
import com.grkj.lib.message.Exception.ParamInCorrectException;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.utils.BeanUtils;
import com.grkj.lib.utils.Digests;
import com.grkj.lib.utils.Encodes;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Office;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.mapper.UserMapper;
import com.grkj.modules.sys.mapper.UserRoleMapper;
import com.grkj.modules.sys.security.Principal;
import com.grkj.modules.sys.service.OfficeService;
import com.grkj.modules.sys.service.UserService;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class UserServiceImpl implements BaseMapperCurdService<User>, UserService,InitializingBean{
	
	public static final String ITEM_CACHE_LOGINNAME_KEY="CACHE_LOGINNAME_ID";
	public static final String ITEM_CACHE_ID_KEY="CACHE_ID_USER";
	
	@Autowired
	private UserRoleMapper userRoleMapper;
	
	@Autowired
	private UserMapper mapper;

	@Autowired
	private OfficeService officeService;
	
	@Autowired
	private CacheManager localCacheManager;
	
	private Cache<String,User> userCache;
	private Cache<String, String> loginIdCache;
	
	
	@Override
	public User getById(Object id) {
		//默认去掉密码
		return getById(id,false);
	}
	
	public User getById(Object id,boolean includePassword) {
		User result = BaseMapperCurdService.super.getById(id);
		if(result!=null && !StringUtils.isBlank(result.getOfficeId())){
			Office office = officeService.getById(result.getOfficeId());
			if(office!=null)
				result.setOfficeName(office.getName());
		}
		if(!includePassword&&result!=null) {
			result.setPassword(null);
		}
		return result;
	}
	
	@Override
	public List<User> getByIds(List<String> ids) {
		//默认去掉密码信息
		return getByIds(ids, false);
	}
	
	public List<User> getByIds(List<String> ids,boolean includePassword) {
		if(ids!=null&&ids.size()>0) {
			Example example=new Example(User.class);
			Criteria cr = example.createCriteria();
			cr.andIn("userId", ids);
			List<User> result= getMapper().selectByExample(example);
			if(!includePassword&&result!=null) {
				result.forEach(u->{
					u.setPassword(null);
				});
			}
		}
		return null;
	}
	
	/**
	 * 查询用户列表,password字段将会设置为null
	 * @param param
	 */
	@Override
	public List<User> getList(Object param) {
		return getList(param,false);
	}
	
	/**
	 * 查询用户列表
	 * @param param
	 * @param includePassword，查询结果是否包含密码
	 * @return
	 */
	public List<User> getList(Object param,boolean includePassword) {
		// TODO Auto-generated method stub
		Example example=new Example(User.class);
		if(param!=null){
			Criteria cr = example.createCriteria();
			Map<String,Object> paramMap=(Map<String, Object>) param;
			String id=(String) paramMap.get("id");
			String loginNames=(String) paramMap.get("loginName");
			String loginname=(String) paramMap.get("loginName");
			String name=(String) paramMap.get("name");
			String officeId=(String) paramMap.get("officeId");
			String type=(String) paramMap.get("type");
			String flag=(String) paramMap.get("flag");
			String duty=(String) paramMap.get("duty");
			
			if(!StringUtils.isBlank(id)){
				cr.andLike("id", "%"+id+"%");
			}
			if(!StringUtils.isBlank(loginNames)){
				if(loginNames.endsWith(";")){
					loginNames=loginNames.substring(0,loginNames.length()-1);
				}
				ArrayList<String> loginNameList = Lists.newArrayList(loginNames.split(";")) ;
				cr.andIn("loginName", loginNameList);
			}
			if(!StringUtils.isBlank(loginname)){
				cr.andLike("loginName", "%"+loginname+"%");
			}
			if(!StringUtils.isBlank(name)){
				cr.andLike("name", "%"+name+"%");
			}
			if(!StringUtils.isBlank(officeId)){
				cr.andLike("officeId", "%"+officeId+"%");
			}
			if(!StringUtils.isBlank(type)){
				cr.andEqualTo("type", type);
			}
			if(!StringUtils.isBlank(flag)){
				cr.andEqualTo("flag", flag);
			}
			if(!StringUtils.isBlank(duty)){
				cr.andLike("duty", "%"+duty+"%");
			}
		}
		List<User> result = getMapper().selectByExample(example);
		if(!includePassword&&result!=null) {
			result.forEach(u->{
				u.setPassword(null);
			});
		}
		return result;
	}
	
	
	
    @Transactional
	@Override
	public Integer deleteById(Object id) {
		// TODO Auto-generated method stub
		Integer result = BaseMapperCurdService.super.deleteById(id);
		userRoleMapper.deleteUserRoleByUserId((String) id);
		return result;
	}



	@Transactional
	@Override
	public User insertOrUpdateWithEncryptPassword(User user) {
		// TODO Auto-generated method stub
		if(!StringUtils.isBlank(user.getPassword())){
			user.setPassword(encryptPassword(user.getPassword()));
		}else{
			User temp = getById(user.getId());
			if(temp==null){
				throw new ParamInCorrectException("密码不能为空");
			}
			user.setPassword(temp.getPassword());
		}
		insertOrUpdate(user);
		return user;
	}
	
	
	@Override
	public String encryptPassword(String oldPassword){
		byte[] salt = Digests.generateSalt(SALT_SIZE);
		byte[] hashPassword = Digests.sha1(oldPassword.getBytes(), salt, HASH_INTERATIONS);
		return Encodes.encodeHex(salt)+Encodes.encodeHex(hashPassword);
	}
	
	public boolean validatePassword(String plainPassword, String password){
		byte[] salt = Encodes.decodeHex(password.substring(0,SALT_SIZE*2));
		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt, HASH_INTERATIONS);
		return password.equals(Encodes.encodeHex(salt)+Encodes.encodeHex(hashPassword));
	}
	


	@Override
	public void updateFlag(String id,String flag) {
		// TODO Auto-generated method stub
		User user=new User();
		user.setId(id);
		user.setFlag(flag);
		updateSelective(user);
	}


	@Override
	public List<Map<String, Object>> getUserTree(String department) {
		List<Map<String, Object>> result=new ArrayList<Map<String,Object>>();
		MessagePageHelper.startPage(new PageRequestMessage(1, 10000, "sort", "asc"));
		Map<String,Object> param=Maps.newHashMap();
		param.put("flag", "1");
		List<Office> officeList = officeService.getList(param);
		List<User> userList = getList(param);
		for(Office officeItem:officeList){
			Map<String, Object> itemMap = BeanUtils.transBean2Map(officeItem);
			result.add(itemMap);
		}
		
		for(User userItem: userList){
			Map<String, Object> itemMap = BeanUtils.transBean2Map(userItem);
			itemMap.put("parentId", userItem.getOfficeId());
			result.add(itemMap);
		}

		return result;
	}


	@Transactional
	@Override
	public void updatePassword(String id, String oldPassword, String newPassword) {
		// TODO Auto-generated method stub
		User user = getById(id);
		if(user!=null){
			if(!validatePassword(oldPassword,user.getPassword())){
				throw new ParamInCorrectException("原密码错误");
			}
			user.setPassword(encryptPassword(newPassword));
			update(user);
		}else{
			throw new DataNotExistException("该用户不存在");
		}
	}

	@Override
	public List<User> getListByOfficeId(String officeId,Map<String,Object> param) {
		// TODO Auto-generated method stub
		Example example=new Example(User.class);
		Criteria cr = example.createCriteria();
		cr.andEqualTo("officeId", officeId);
		if(param != null){
			if(!StringUtils.isBlank((CharSequence) param.get("name"))){
				cr.andLike("name", "%"+param.get("name")+"%");
			}
			if(!StringUtils.isBlank((CharSequence) param.get("type"))){
				cr.andEqualTo("type",(CharSequence) param.get("type"));
			}
		}
		return getMapper().selectByExample(example);
	}



	@Override
	public List<User> getListByOfficeIdNot(String officeId,Map<String,Object> param) {
		// TODO Auto-generated method stub
		Example example=new Example(User.class);
		Criteria cr = example.createCriteria();
		cr.andCondition("(office_id <> '"+officeId+"' or office_id is null)");
		if(!StringUtils.isBlank((CharSequence) param.get("name"))){
			cr.andLike("name", "%"+param.get("name")+"%");
		}
		if(!StringUtils.isBlank((CharSequence) param.get("type"))){
			cr.andEqualTo("type",(CharSequence) param.get("type"));
		}
		return getMapper().selectByExample(example);
	}



	@Transactional
	@Override
	public void updateUsersOffice(List<String> userIds, String officeId) {
		// TODO Auto-generated method stub
		if(userIds!=null&&userIds.size()>0){
			getMapper().updateUsersOffice(userIds, officeId);
		}
	}



	@Override
	public User getNowUser() {
		Principal principal = (Principal) SecurityUtils.getSubject().getPrincipal();
		if (principal != null) {
			User user = getByLoginNameCachable(principal.getId());
			if(user!=null) {
				user.setPassword(null);
			}
			return user;
		}
		return null;
		//return getByLoginNameCachable("admin");
	}

	/**
	 * @see com.grkj.modules.sys.service.UserService#getLoginName(java.lang.String)
	 * 使用缓存
	 * @param loginname
	 * @return
	 */
	protected User getByLoginNameCachable(String loginName) {
		User user =null;
		String id=loginIdCache.get(loginName);
		if(id!=null) {
			user=userCache.get(id);
			if(user!=null) {
				return user;
			}else {
				user = getByLoginName(loginName);
			}
		}else {
			user = getByLoginName(loginName);
		}
		if(user==null) return null;
		
		loginIdCache.put(loginName, user.getId());
		userCache.put(user.getId(), user);
		return user;
	}


	/**
	 * 根据登录名，获得用户信息；
	 */
	@Override
	public User getByLoginName(String loginName) {
		Example example = new Example(User.class);
		example.createCriteria().andEqualTo("loginName", loginName);
		List<User> userList = mapper.selectByExample(example);
		if(userList!=null && !userList.isEmpty()) {
			User user = userList.get(0);
			loginIdCache.put(loginName, user.getId());
			userCache.put(user.getId(), user);
			return user;
		}else return null;
	}
	
	@Override
	public void lockUser(String loginName) {
		// TODO Auto-generated method stub
		User user = getByLoginName(loginName);
		if(user!=null){
			user.setFlag(Global.NO);
			updateSelective(user);
		}
	}


	@Override
	public void afterUpdate(User data) {
		// TODO Auto-generated method stub
		BaseMapperCurdService.super.afterUpdate(data);
		evictCache(data.getId());
	}

	@Override
	public void afterDelete(Object id) {
		// TODO Auto-generated method stub
		BaseMapperCurdService.super.afterDelete(id);
		evictCache((String) id);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		userCache= localCacheManager.addCache(ITEM_CACHE_ID_KEY, String.class, User.class);
		//主键登录名缓存
		loginIdCache= localCacheManager.addCache(ITEM_CACHE_LOGINNAME_KEY, String.class, String.class);
	}
	
	protected synchronized void evictCache(String id) {
		User user = userCache.get(id);
		if(user!=null) {
			userCache.evict(user.getId());
			loginIdCache.evict(user.getLoginName());
		}
	}	
	
	protected synchronized void clearCache() {
		loginIdCache.clear();
		userCache.clear();
	}

	@Override
	public List<User> getListByRoleId(String roleId, Map<String, Object> param) {
		// TODO Auto-generated method stub
		return userRoleMapper.getUserListByRoleId(roleId);
	}

	//生成密码
	public static void main(String[] args) {
		UserServiceImpl a=new UserServiceImpl();
		String uuid =UUID.randomUUID().toString().substring(0,8);
		System.out.println(uuid);
		System.out.println(a.encryptPassword("123456"));
	}

	@Override
	public List<User> getActiveUser() {
		Example example = new Example(User.class);
		example.createCriteria().andEqualTo("flag",1);
		return mapper.selectByExample(example);
	}

	@Override
	public List<User> getUserByRoleId(String roleId) {
		return userRoleMapper.getUserListByRoleId(roleId);
	}


	@Override
	public UserMapper getMapper() {
		// TODO Auto-generated method stub
		return mapper;
	}


}

package com.grkj.modules.sys.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.grkj.Global;
import com.grkj.lib.utils.SpringContextHolder;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.service.MenuService;
import com.grkj.modules.sys.service.OfficeService;
import com.grkj.modules.sys.service.RoleService;
import com.grkj.modules.sys.service.UserService;

/**
 *user util
 * 
 * @author jiabinl
 */
public class UserUtils {
	
	private static UserService userService;
	private static RoleService roleService ;
	private static MenuService menuService ;
	private static OfficeService officeService ;


	public static UserService getUserService() {
		if(userService==null){
			userService=SpringContextHolder.getBean(UserService.class);
		}
		return userService;
	}


	public static RoleService getRoleService() {
		if(roleService==null){
			roleService=SpringContextHolder.getBean(RoleService.class);
		}
		return roleService;
	}


	public static MenuService getMenuService() {
		if(menuService==null){
			menuService=SpringContextHolder.getBean(MenuService.class);
		}
		return menuService;
	}

	public static OfficeService getOfficeService() {
		if(officeService==null){
			officeService=SpringContextHolder.getBean(OfficeService.class);
		}
		return officeService;
	}

	public static User getUser() {
		return getUserService().getNowUser();

	}
	
	/**
	 * 获取所有域的菜单（用于综合管理平台类似的大集中系统）
	 * @param id
	 * @return
	 */
	public static List<Menu> getAllScopeMenuTreeByUserId(String id) {
		return tranferMenuListToTree(getMenuService().getListByUserId( id));
	}
	
	/**
	 * 获取所有域的网页菜单（用于综合管理平台类似的大集中系统）
	 * @param id
	 * @return
	 */
	public static List<Menu> getAllScopeNetMenuTreeByUserId(String id) {
		return tranferMenuListToTree(getMenuService().getListByUserIdAndType( id,Menu.TYPE_WEB));
	}
	
	/**
	 * 获取所有域的移动端菜单（用于综合管理平台类似的大集中系统）
	 * @param id
	 * @return
	 */
	public static List<Menu> getAllScopeMobileMenuTreeByUserId(String id) {
		return tranferMenuListToTree(getMenuService().getListByUserIdAndType( id,Menu.TYPE_MOBILE));
	}
	
	/**
	 * 获取所有域的菜单（用于综合管理平台类似的大集中系统）
	 * @param id
	 * @param parentId
	 * @return
	 */
	public static List<Menu> getAllScopeMenuTreeByUserId(String id,String parentId) {
		return tranferMenuListToTree(getMenuService().getListByUserId( id,parentId));
	}
	
	/**
	 * 获取所有域的网页的菜单（用于综合管理平台类似的大集中系统）
	 * @param id
	 * @param parentId
	 * @return
	 */
	public static List<Menu> getAllScopeNetMenuTreeByUserId(String id,String parentId) {
		return tranferMenuListToTree(getMenuService().getListByUserIdAndType( id,Menu.TYPE_WEB,parentId));
	}
	
	/**
	 * 获取所有域的移动端的菜单（用于综合管理平台类似的大集中系统）
	 * @param id
	 * @param parentId
	 * @return
	 */
	public static List<Menu> getAllScopeMobileMenuTreeByUserId(String id,String parentId) {
		return tranferMenuListToTree(getMenuService().getListByUserIdAndType( id,Menu.TYPE_MOBILE,parentId));
	}
	
	/**
	 * 获取当前系统域的菜单，根据配置项app.scope 查询
	 * @param id
	 * @return
	 */
	public static List<Menu> getMenuTreeByUserId(String id) {
		return tranferMenuListToTree(getMenuService().getListByScopeAndUserId(Global.getConfig("app.scope"), id));
	}
	
	/**
	 * 获取当前系统域的网页菜单，根据配置项app.scope 查询
	 * @param id
	 * @return
	 */
	public static List<Menu> getNetMenuTreeByUserId(String id) {
		return tranferMenuListToTree(getMenuService().getListByScopeAndUserIdAndType(Global.getConfig("app.scope"), id,Menu.TYPE_WEB));
	}
	
	/**
	 * 获取当前系统域的移动端菜单，根据配置项app.scope 查询
	 * @param id
	 * @return
	 */
	public static List<Menu> getMobileMenuTreeByUserId(String id) {
		return tranferMenuListToTree(getMenuService().getListByScopeAndUserIdAndType(Global.getConfig("app.scope"), id,Menu.TYPE_MOBILE));
	}
	
	/**
	 * 获取当前系统域的菜单，根据配置项app.scope 查询
	 * @param id
	 * @param parentId
	 * @return
	 */
	public static List<Menu> getMenuTreeByUserId(String id,String parentId) {
		return tranferMenuListToTree(getMenuService().getListByScopeAndUserId(Global.getConfig("app.scope"), id,parentId));
	}
	
	/**
	 * 获取当前系统域的网页菜单，根据配置项app.scope 查询
	 * @param id
	 * @param parentId
	 * @return
	 */
	public static List<Menu> getNetMenuTreeByUserId(String id,String parentId) {
		return tranferMenuListToTree(getMenuService().getListByScopeAndUserIdAndType(Global.getConfig("app.scope"), id,Menu.TYPE_WEB,parentId));
	}
	
	
	/**
	 * 获取当前系统域的移动端菜单，根据配置项app.scope 查询
	 * @param id
	 * @param parentId
	 * @return
	 */
	public static List<Menu> getMobileMenuTreeByUserId(String id,String parentId) {
		return tranferMenuListToTree(getMenuService().getListByScopeAndUserIdAndType(Global.getConfig("app.scope"),id,Menu.TYPE_MOBILE,parentId));
	}
	
	public static List<Menu> tranferMenuListToTree(List<Menu> menuList){
		List<Menu> result=new ArrayList<Menu>();
		Map<String,Menu> menuMap=new HashMap<String,Menu>(menuList.size());
		for(Menu item:menuList){
			item.getChildList().clear();
			menuMap.put(item.getId(), item);
		}
		for(Menu item:menuList){
			if(menuMap.get(item.getParentId())!=null&&item.getId()!=item.getParentId()){
				menuMap.get(item.getParentId()).addChild(item);
			}else{
				result.add(item);
			}
		}
		Collections.sort(result, new Comparator<Menu>() {

			@Override
			public int compare(Menu o1, Menu o2) {
				if(o1.getSort()==null&&o2.getSort()==null) {
					return 0;
				}else if(o1.getSort()==null&&o2.getSort()!=null) {
					return -1;
				}else if(o1.getSort()!=null&&o2.getSort()==null) {
					return 1;
				}else {
					return o1.getSort()>o2.getSort()?1:o1.getSort()==o2.getSort()?0:-1;
				}
			}
		});
		return result;
	}
	
}

package com.grkj.modules.sys.security;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.utils.UserUtils;

public class ShiroUrlPermissionFilter extends AccessControlFilter {
	
	
	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
			throws Exception {
		// TODO Auto-generated method stub
		if (isLoginRequest(request, response)) {
            return true;
        } else {
            Subject subject = getSubject(request, response);
            // If principal is not null, then the user is known and should be allowed access.
            Principal principal = (Principal) subject.getPrincipal();
            if(principal==null) {
            	return false;
            }
            User user =UserUtils.getUserService().getByLoginName(principal.getId());
            List<Menu> menuList = UserUtils.getMenuService().getListByUserId(user.getId());
			Set<String> stringPermissions=new HashSet<String>();
			for(Menu item:menuList){
				if(!StringUtils.isBlank(item.getPermission())){
					stringPermissions.add(item.getPermission());
				}
			}
            return true;
        }
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("url filter:deny");
		return true;
	}

}

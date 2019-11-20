package com.grkj.modules.sys.serviceImpl;

import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.utils.UserUtils;

/**
 * 授权状态信息service
 * @author jiabinl
 *
 */
@Service
public class AuthInfoService {
	
	@Value("${session.tokenName}")
	private String sessionTokenName;
	
	public Map<String,Object> getNowUserAuthInfo(){
		Map<String, Object> data = Maps.newHashMap();
		data.put(sessionTokenName, SecurityUtils.getSubject().getSession().getId());
		User user = UserUtils.getUser();	
		data.put("loginName", user.getLoginName());
		data.put("userName", user.getName());
//		data.put("userType", user.getYhlx());
		return data;
	}
}

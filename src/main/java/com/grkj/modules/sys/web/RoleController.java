package com.grkj.modules.sys.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.modules.sys.entity.Role;
import com.grkj.modules.sys.service.RoleService;

import io.swagger.annotations.Api;

@Api(tags="角色管理",description="管理角色信息接口")
@RestController
@RequestMapping(value="/sys/role",produces = "application/json;charset=UTF-8")
public class RoleController   implements BaseRestfulController<Role>  {
	private static Logger logger=LoggerFactory.getLogger(RoleController.class);
	
	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Autowired
	private RoleService service;
	
	@Override
	public RoleService getService() {
		return service;
	}

	@Override
	public void checkKey(Role data) {
		if(data.getId()==null){
			data.setId(keyGenerator.getNext());
		}
	}
	
	
	@RequestMapping(value="availableListData",method=RequestMethod.GET)
	public ResponseMessage availableListData(HttpServletRequest request){
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		param.put("flag", "1");
		return  ResponseMessage.newOkInstance(service.getList(param));
	}

	
	@RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
	public ResponseMessage save(@PathVariable String id,String flag) {
		service.updateFlag(id, flag);
		return ResponseMessage.newOkInstance(null);
	}
	
	
	@RequestMapping(value = "/userRole/{userId}", method = RequestMethod.GET)
	public ResponseMessage roleMenu(@PathVariable String userId) {
		return ResponseMessage.newOkInstance(service.getUserRoleByUserId(userId));
	}
	
	@RequestMapping(value = "/saveUserRole/{userId}", method = RequestMethod.POST)
	public ResponseMessage saveRoleMenu(@PathVariable String userId,@RequestBody List<String> roleIds) {
		service.saveUserRoleByUserId(userId, roleIds);
		return ResponseMessage.newOkInstance(null);
	}



}

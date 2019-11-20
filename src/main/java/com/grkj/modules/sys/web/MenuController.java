package com.grkj.modules.sys.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.service.MenuService;

import io.swagger.annotations.Api;

@Api(tags="菜单管理",description="管理菜单信息接口")
@RestController
@RequestMapping(value="/sys/menu",produces = "application/json;charset=UTF-8")
public class MenuController implements BaseRestfulController<Menu>  {
	private static Logger logger=LoggerFactory.getLogger(MenuController.class);
	
	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Autowired
	private MenuService service;
	
	@Override
	public MenuService getService() {
		return service;
	}
	
	@Override
	public void checkKey(Menu data) {
		if(StringUtils.isBlank(data.getId())){
			data.setId(keyGenerator.getNext());
		}
	}
	
	@GetMapping(value="availableListData")
	public ResponseMessage availableListData(HttpServletRequest request){
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		param.put("flag", "1");
		return  ResponseMessage.newOkInstance(service.getList(param));
	}

	
	@GetMapping(value = "/roleMenu/{roleId}")
	public ResponseMessage roleMenu(@PathVariable String roleId) {
		return ResponseMessage.newOkInstance(service.getListByRoleId(roleId));
	}
	
	@PostMapping(value = "/saveRoleMenu/{roleId}")
	public ResponseMessage saveRoleMenu(@PathVariable String roleId,@RequestBody List<String> menuIds) {
		service.saveRoleMenuByRoleId(roleId,menuIds); 
		return ResponseMessage.newOkInstance(null);
	}
	


}

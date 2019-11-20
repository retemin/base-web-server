package com.grkj.modules.sys.web;

import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.annotation.RequiresUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.annotation.PageRequestParam;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.service.UserService;
import com.grkj.modules.sys.utils.UserUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Api(tags="用户管理",description="管理用户信息接口")
@RestController
@RequestMapping(value="/sys/user",produces = "application/json;charset=UTF-8")
public class UserController implements BaseRestfulController<User>  {

	private static Logger logger=LoggerFactory.getLogger(UserController.class);

	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Autowired
	private UserService service;
	
	@Override
	public UserService getService() {
		return service;
	}

	@Override
	public void checkKey(User data) {
		if(data.getId()==null){
			data.setId(keyGenerator.getNext());
		}
	}

	@ApiOperation("获取当前用户信息")
	@GetMapping("/getNowUser")
	public ResponseMessage getNowUser() {
		return ResponseMessage.newOkInstance(UserUtils.getUser());
	}
	
	
	@ApiOperation("获取用户列表")
	@ApiImplicitParams({ @ApiImplicitParam(paramType = "query", dataType = "String", name = "name", value = "用户名", required = false) })
	@Override
	public ResponseMessage list(ServletRequest request) {
		return BaseRestfulController.super.list(request);
	}



	@ApiOperation("分页获取用户列表")
	@ApiImplicitParams({ @ApiImplicitParam(paramType = "query", dataType = "String", name = "name", value = "用户名", required = false) })
	@Override
	public ResponseMessage listPage(PageRequestMessage pageParam, ServletRequest request) {
		// TODO Auto-generated method stub
		return BaseRestfulController.super.listPage(pageParam, request);
	}



	@RequestMapping(value = "selectTreeData", method = RequestMethod.GET)
	public ResponseMessage selectTreeData(HttpServletRequest request, @PageRequestParam PageRequestMessage page) {
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		String department=(String) param.get("department");
		return ResponseMessage.newOkInstance(service.getUserTree(department));
	}


	
	@RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
	public ResponseMessage save(@PathVariable String id, String flag) {
		service.updateFlag(id, flag);
		return ResponseMessage.newOkInstance(id);
	}
    //重写保存方法 加密密码
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public ResponseMessage save(@RequestBody User user) {
		if(StringUtils.isBlank(user.getId())){
			user.setId(keyGenerator.getNext());
		};
		service.insertOrUpdateWithEncryptPassword(user);
		return ResponseMessage.newOkInstance(user.getId());
	}
	
	@RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
	public ResponseMessage updatePassword(String oldPassword,String newPassword) {
		User user = UserUtils.getUser();
		if(user!=null){
			service.updatePassword(user.getId(),oldPassword,newPassword);
			return ResponseMessage.newOkInstance(user.getId());
		}else{
			return ResponseMessage.newErrorInstance("请先登录");
		}
	}
	
	@RequiresUser
	@RequestMapping(value="/getNowUserMenuTree", method = RequestMethod.GET)
	public ResponseMessage getUserMenuTree() {
		User user = UserUtils.getUser();
		if(user!=null){
			//获取当前用户当前系统域的 网页菜单
			return ResponseMessage.newOkInstance(UserUtils.getNetMenuTreeByUserId(user.getId()));
		}else{
			return ResponseMessage.newForbiddenInstance("请先登录");
		}
	}
	
}

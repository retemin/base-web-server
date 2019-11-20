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
import com.grkj.common.base.ReadOnlyRestFulContoller;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.annotation.PageRequestParam;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.page.entity.PageResponseMessage;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.entity.Office;
import com.grkj.modules.sys.service.MenuService;
import com.grkj.modules.sys.service.OfficeService;
import com.grkj.modules.sys.service.UserService;

import io.swagger.annotations.Api;

@Api(tags="部门管理",description="管理部门信息接口")
@RestController
@RequestMapping(value="/sys/office",produces = "application/json;charset=UTF-8")
public class OfficeController implements BaseRestfulController<Office> {
	
	protected static Logger logger=LoggerFactory.getLogger(OfficeController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private KeyGenerator<String> keyGenerator;
	@Autowired
	private OfficeService service;
	
	@Override
	public OfficeService getService() {
		return service;
	}
	
	@Override
	public void checkKey(Office data) {
		if(StringUtils.isBlank(data.getId()) ){
			data.setId(keyGenerator.getNext());
		}
	}

	@RequestMapping(value="availableListData",method=RequestMethod.GET, params = "json")
	public ResponseMessage availableListData(HttpServletRequest request){
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		param.put("flag", "1");
		MessagePageHelper.startPage(new PageRequestMessage(1, 10000, "sort", "asc"));
		return  ResponseMessage.newOkInstance(service.getList(param));
	}
	

	@RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
	public ResponseMessage save(@PathVariable String id, String flag) {
		service.updateFlag(id, flag);
		return ResponseMessage.newOkInstance(null);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
	public ResponseMessage delete(@PathVariable String id) {
		return ResponseMessage.newOkInstance(service.deleteById(id));
	}
	
	@RequestMapping(value = "/bindUserList/{id}", method = RequestMethod.GET, params = "jqgrid")
	public PageResponseMessage bindUserList(@PathVariable String id,@PageRequestParam PageRequestMessage page,HttpServletRequest request) {
		MessagePageHelper.startPage(page);
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		return MessagePageHelper.parseResult( userService.getListByOfficeId(id,param));
	}
	
	@RequestMapping(value = "/unBindUserList/{id}", method = RequestMethod.GET, params = "jqgrid")
	public PageResponseMessage unBindUserList(@PathVariable String id,@PageRequestParam PageRequestMessage page,HttpServletRequest request) {
		MessagePageHelper.startPage(page);
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		return MessagePageHelper.parseResult( userService.getListByOfficeIdNot(id,param));
	}
	
	@RequestMapping(value = "/bindUsers/{id}", method = RequestMethod.POST)
	public ResponseMessage bindUsers(@PathVariable String id,@RequestBody List<String> userIds) {
		userService.updateUsersOffice(userIds, id);
		return ResponseMessage.newOkInstance(null);
	}
	
	@RequestMapping(value = "/unBindUsers/{id}", method = RequestMethod.POST)
	public ResponseMessage unbindUsers(@PathVariable String id,@RequestBody List<String> userIds) {
		userService.updateUsersOffice(userIds, null);
		return ResponseMessage.newOkInstance(null);
	}


	
	

}

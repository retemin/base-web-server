package com.grkj.modules.sys.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.modules.sys.entity.Area;
import com.grkj.modules.sys.service.AreaService;

import io.swagger.annotations.Api;

/**
 * 系统区域管理 Controller
 * @author jiabinl
 * @date  2017-02-17
 */
@Api(tags="区域管理",description="管理区域信息接口")
@RestController
@RequestMapping("/sys/area")
public class AreaController implements BaseRestfulController<Area> {
	
	@Autowired
	private KeyGenerator<String> keyGenerator;
	@Autowired
	private AreaService service;
	
	@Override
	public AreaService getService() {
		return service;
	}
	
	
	@Override
	public void checkKey(Area data) {
		if(data.getId()==null){
			data.setId(keyGenerator.getNext());
		}
	}
	
	@RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
	public ResponseMessage save(@PathVariable String id, Integer flag) {
		service.updateFlag(id, flag);
		return ResponseMessage.newOkInstance(id);
	}
	
	@RequestMapping(value="availableListData",method=RequestMethod.GET, params = "json")
	public ResponseMessage availableListData(HttpServletRequest request){
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		param.put("flag", "1");
		MessagePageHelper.startPage(new PageRequestMessage(1, 10000, "sort", "asc"));
		return  ResponseMessage.newOkInstance(service.getList(param));
	}

	
}

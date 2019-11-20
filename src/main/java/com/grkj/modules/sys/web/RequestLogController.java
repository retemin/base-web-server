package com.grkj.modules.sys.web;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.modules.sys.entity.RequestLog;
import com.grkj.modules.sys.serviceImpl.RequestLogService;

/**
 * 菜单日志Controller
 */
@Controller
@RequestMapping("/sys/requestLog")
public class RequestLogController   implements BaseRestfulController<RequestLog>{

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Autowired
	private RequestLogService service;
	@Override
	public RequestLogService getService() {
		return service;
	}
	
	@Override
	public void checkKey(RequestLog data) {
		// TODO Auto-generated method stub
		if(data.getId()==null || "".equals(data.getId())){
			data.setId(keyGenerator.getNext());
		}
	}
	@RequestMapping(value="list", method = RequestMethod.GET, params = "page")
	public String listPage() {
		return "modules/sys/requestLogList";
	}
}

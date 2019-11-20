package com.grkj.modules.sys.webPage;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sys/area")
public class SysAreaPageController {

	@RequestMapping(value="list", method = RequestMethod.GET, params = "page")
	public String listPage() {
		return "modules/sys/areaList";
	}
	
	@RequestMapping(value="areaSelectTree",method=RequestMethod.GET)
	public String areaSelectTree(HttpServletRequest request){
		return "/modules/sys/areaSelectTree";
	}
}

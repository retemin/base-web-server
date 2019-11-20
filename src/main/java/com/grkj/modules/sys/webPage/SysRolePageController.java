package com.grkj.modules.sys.webPage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sys/role")
public class SysRolePageController {

	@RequestMapping(value="list", method = RequestMethod.GET, params = "page")
	public String listPage() {
		return "modules/sys/roleList";
	}
	
	
	@RequestMapping("form")
	public String formPage() {
		return "modules/sys/roleForm";
	}

	@RequestMapping("form/{id}")
	public String form(@PathVariable String id, Model model) {
		model.addAttribute("id",id);
		return "/modules/sys/roleForm";
	}
}

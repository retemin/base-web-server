package com.grkj.modules.sys.webPage;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sys/office")
public class SysOfficePageController {

	@RequestMapping(value="list", method = RequestMethod.GET, params = "page")
	public String listPage() {
		return "modules/sys/officeList";
	}
	
	@RequestMapping(value="officeSelectTree",method=RequestMethod.GET)
	public String officeSelectTree(HttpServletRequest request,Model model){
		String officeId=request.getParameter("officeId");
		model.addAttribute("officeId", officeId!=null?officeId:"" );
		return "/modules/sys/officeSelectTree";
	}
	
}

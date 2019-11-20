package com.grkj.modules.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
	
	@RequestMapping("/")
	public String adminPath(Model model){
		return "modules/main/index";
	}
	
	@RequestMapping("/error/404")
	public String error404(Model model){
		return "error/404";
	}
	
	@RequestMapping("/error/500")
	public String error500(Model model,Exception e){
		model.addAttribute("error", e);
		return "error/500";
	}
	
	@RequestMapping("/style/demo")
	public String styleDemo(){
		return "/modules/sys/styleDemo";
	}

}

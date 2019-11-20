package com.grkj.modules.main.controller;


import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;

import com.grkj.modules.main.service.WeatherService;
import com.grkj.modules.sys.entity.Weather;
import com.grkj.modules.sys.security.ScopeFormAuthenticationFilter;
import com.grkj.modules.sys.utils.UserUtils;


@Controller
public class LoginController extends FormAuthenticationFilter{
	
	@Value("${app.scope}")
	private String sope;
	
	@Autowired
	private WeatherService weatherService;
	
	
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public String loginPage(Model model){
		Weather w = weatherService.getWeather();
		model.addAttribute("Weather", w);
		if(UserUtils.getUser()!=null){
			return "redirect:/";
		}
		return "modules/main/login";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String loginFail(HttpServletRequest request, RedirectAttributesModelMap model) {
		String username = WebUtils.getCleanParam(request, ScopeFormAuthenticationFilter.DEFAULT_USERNAME_PARAM);
		boolean rememberMe = WebUtils.isTrue(request, ScopeFormAuthenticationFilter.DEFAULT_REMEMBER_ME_PARAM);
		String exception = (String)request.getAttribute(ScopeFormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
		String message = (String)request.getAttribute(ScopeFormAuthenticationFilter.DEFAULT_MESSAGE_PARAM);
		
		model.addFlashAttribute(ScopeFormAuthenticationFilter.DEFAULT_USERNAME_PARAM, username);
		model.addFlashAttribute(ScopeFormAuthenticationFilter.DEFAULT_REMEMBER_ME_PARAM, rememberMe);
		model.addFlashAttribute(ScopeFormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME, exception);
		model.addFlashAttribute(ScopeFormAuthenticationFilter.DEFAULT_MESSAGE_PARAM, message);
		return "redirect:/login";
	}
}

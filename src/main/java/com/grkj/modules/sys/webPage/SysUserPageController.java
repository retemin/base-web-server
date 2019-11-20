package com.grkj.modules.sys.webPage;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Office;
import com.grkj.modules.sys.entity.Role;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.service.OfficeService;
import com.grkj.modules.sys.service.RoleService;
import com.grkj.modules.sys.utils.UserUtils;

@Controller
@RequestMapping("/sys/user")
public class SysUserPageController {

	@Autowired
	private RoleService roleService;
	
	@Autowired
	private OfficeService officeService;
	
	@RequestMapping(value="list", method = RequestMethod.GET, params = "page")
	public String listPage() {
		return "modules/sys/userList";
	}
	
	
	@RequestMapping(value="form", method = RequestMethod.GET)
	public String formPage() {
		return "modules/sys/userForm";
	}

	@RequestMapping("form/{id}")
	public String form(@PathVariable String id, Model model) {
		model.addAttribute("id",id);
		return "/modules/sys/userForm";
	}
	
	@RequestMapping("/userInfo")
	public String userInfo(Model model) {
		User user = UserUtils.getUser();
		model.addAttribute("user",user);
		List<Role> roleList=roleService.getUserRoleByUserId(user.getId());
		model.addAttribute("roleList",roleList);
		if(!StringUtils.isBlank(user.getOfficeId()) ){
			Office office = officeService.getById(user.getOfficeId());
			if(office!=null){
				user.setOfficeName(office.getName());
			}
		}
		return "/modules/sys/userInfo";
	}
	
	@RequestMapping("/selectTree")
	public String selectTree(Model model) {
		return "/modules/sys/userSelectTree";
	}
	
	
	@RequestMapping("/userModifyPwd")
	public String userModifyPwd(Model model) {
		return "/modules/sys/userModifyPwd";
	}
	
}

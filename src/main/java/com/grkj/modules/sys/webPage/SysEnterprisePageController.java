package com.grkj.modules.sys.webPage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
@RequestMapping("/sys/enterprise")
public class SysEnterprisePageController {

    @RequestMapping(value="list", method = RequestMethod.GET, params = "page")
    public String listPage() {
        return "modules/sys/enterpriseList";
    }
    //用于新增企业信息的页面
    @RequestMapping(value="form",method =RequestMethod.GET)
    public String formPage() {
        return "modules/sys/enterpriseForm";
    }
    //用于修改企业信息的页面
    @RequestMapping("form/{id}")
    public String form(@PathVariable String id, Model model) {
        model.addAttribute("id",id);
        return "/modules/sys/enterpriseForm";
    }

}

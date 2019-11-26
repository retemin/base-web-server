package com.grkj.modules.sys.webPage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @program: base-web-server
 * @description: 企业排口信息页面控制器
 * @author: retemin
 * @create: 2019-11-25 09:27
 **/
@Controller
@RequestMapping("/sys/outletl")
public class SysOutletlPageController {
    @RequestMapping(value = "list",method = RequestMethod.GET,params = "page")
    public String  listPage(){
        return "modules/sys/outletlList";
    }
    //用于添加企业排口信息页面
    @RequestMapping(value = "form",method = RequestMethod.GET)
    public String formPage(){
        return "modules/sys/outletlForm";
    }
    //修改企业排口信息页面
    @RequestMapping("form/{id}")
    public String updateForm(@PathVariable() String id, Model model){
        model.addAttribute("id",id);
        return "modules/sys/outletlForm";
    }
}

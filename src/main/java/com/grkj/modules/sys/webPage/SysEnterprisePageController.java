package com.grkj.modules.sys.webPage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
@RequestMapping("/sys/enterprise")
public class SysEnterprisePageController {

    @RequestMapping(value="list", method = RequestMethod.GET, params = "page")
    public String listPage() {
        return "modules/sys/enterpriseList";
    }
}

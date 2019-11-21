package com.grkj.modules.sys.web;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.annotation.PageRequestParam;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.service.EnterpriseService;
import com.grkj.modules.sys.service.UserService;
import com.grkj.modules.sys.utils.UserUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @program: base-web-server
 * @description: 企业信息模版管理
 * @author: retemin
 * @create: 2019-11-20 11:59
 **/
@Api(tags="企业信息管理",description="管理企业信息信息接口")
@RestController
@RequestMapping(value="/sys/enterprise",produces = "application/json;charset=UTF-8")
public class EnterpriseController implements BaseRestfulController<Enterprise>{
    private static Logger logger= LoggerFactory.getLogger(EnterpriseController.class);

    @Autowired
    private KeyGenerator<String> keyGenerator;

    @Autowired
    private EnterpriseService service;

    @Override
    public EnterpriseService getService() {
        return service;
    }
    @Override
    public void checkKey(Enterprise data) {
        if(StringUtils.isBlank(data.getId())){
            data.setId(keyGenerator.getNext());
        }
    }
    @RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
    public ResponseMessage save(@PathVariable String id, String flag) {
        service.updateFlag(id, flag);
        return ResponseMessage.newOkInstance(id);
    }

}

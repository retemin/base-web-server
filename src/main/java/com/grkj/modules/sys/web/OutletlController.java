package com.grkj.modules.sys.web;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.common.base2.core.CurdService;
import com.grkj.common.base2.impl.controller.BaseCurdListController;
import com.grkj.lib.message.code.ResponseCode;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.page.entity.PageResponseMessage;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.entity.Outletl;
import com.grkj.modules.sys.service.OutletlService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import java.util.Map;

/**
 * @program: base-web-server
 * @description: 企业排口信息的控制层
 * @author: retemin
 * @create: 2019-11-25 14:11
 **/
@Api(tags = "企业排口管理",description="管理企业牌九信息信息接口")
@RestController
@RequestMapping(value = "/sys/outletl",produces = "application/json;charset=UTF-8")
public class OutletlController implements BaseRestfulController<Outletl> {
    private static Logger logger= LoggerFactory.getLogger(OutletlController.class);
    @Autowired
    private OutletlService outletlService;

    @Override
    public CurdService<Outletl> getService() {
        return outletlService;
    }
    //重写
    @ApiOperation("jqgrid格式列表分页查询")
    @GetMapping(value="/jqgrid",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public PageResponseMessage listJqgrid(PageRequestMessage pageParam, ServletRequest request) {
        Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
        return outletlService.getListPage(pageParam,param);
    }
    @RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
    public ResponseMessage save(@PathVariable String id, String flag) {
        outletlService.updateFlag(id, flag);
        return ResponseMessage.newOkInstance(id);
    }

    //重写获取指定id排口好
    @ApiOperation("根据业务id获取数据")
    @GetMapping(value="data/{id}", produces = "application/json;charset=UTF-8")
    @ResponseBody
    @Override
    public ResponseMessage getById(@ApiParam(value="业务主键") @PathVariable() String id) {
        System.out.println(id);
        String status = ResponseCode.STATUS_OK;
        String msg="获取成功";
        ResponseMessage res = new ResponseMessage(status,outletlService.getoutletlById(id),msg);
        return res;
    }

}

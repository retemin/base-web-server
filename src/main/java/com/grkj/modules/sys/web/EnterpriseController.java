package com.grkj.modules.sys.web;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.code.ResponseCode;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.service.EnterpriseService;
import io.swagger.annotations.Api;
import org.apache.jasper.tagplugins.jstl.core.Url;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

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
    //重写保存方法
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResponseMessage save(@RequestBody Enterprise enterprise) {
        if(StringUtils.isBlank(enterprise.getId())){
            enterprise.setId(keyGenerator.getNext());
        };
        service.updateTime(enterprise);
        return ResponseMessage.newOkInstance(enterprise.getId());
    }
    //获取信息
    @RequestMapping(value = "/location",method = RequestMethod.GET)
    @ResponseBody
    public ResponseMessage getLocation(String location) throws IOException {
        String urlStr = "http://api.map.baidu.com/geocoding/v3/?address="+location+"&output=json&ak=pTxRk6K3ykP2lXYEGfsCbpbUfZbKlliK";
        //打印对应的url
        System.out.println(urlStr);
        URL url = null;
        BufferedReader in = null;
        String result = "";
        try{
            url = new URL(urlStr);
        }catch(MalformedURLException e){
            e.printStackTrace();
        }
        //打开链接
        URLConnection connection = url.openConnection();
        connection.setRequestProperty("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
        connection.setRequestProperty("accept-language", "zh-CN,zh;q=0.9");
        connection.setRequestProperty("cache-control", "max-age=0");
        connection.setRequestProperty("connection", "Keep-Alive");
        connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setRequestProperty("user-agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/62.0.3202.89 Safari/537.36");
        connection.connect();

        // 定义 BufferedReader输入流来读取URL的响应
        in = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8"));

        String line;
        while ((line = in.readLine()) != null) {
            result += line;
        }
        //关流
        in.close();
        System.out.println(result);

        //返回结果类
        if(result.indexOf("无相关结果")>1){
            ResponseMessage responseMessage = ResponseMessage.newErrorInstance("无相关结果");
            return responseMessage;
        }else{
            String status = ResponseCode.STATUS_OK;
            String data = result;
            String Msg = "获取信息成功";
            ResponseMessage responseMessage = new ResponseMessage(status,data,Msg);
            return  responseMessage;
        }
    }
}

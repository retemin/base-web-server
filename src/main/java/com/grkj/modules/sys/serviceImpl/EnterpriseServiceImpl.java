package com.grkj.modules.sys.serviceImpl;

import com.google.common.collect.Lists;
import com.grkj.common.base2.impl.controller.BaseCurdListController;
import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.utils.MapRemoveNullUtil;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.entity.SysConfig;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.mapper.EnterpriseMapper;
import com.grkj.modules.sys.service.EnterpriseService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.grkj.common.base2.impl.controller.BaseWriterController.SaveType.insert;

/**
 * @program: base-web-server
 * @description: 企业信息管理service
 * @author: retemin
 * @create: 2019-11-20 15:18
 **/
@Service
public class EnterpriseServiceImpl implements BaseMapperCurdService<Enterprise>, EnterpriseService, InitializingBean {

    @Autowired
    private EnterpriseMapper mapper;

    @Override
    public void afterPropertiesSet() throws Exception {
    }

    //暂时只查询全部信息
    @Override
    public List<Enterprise> getList(Object param) {
        // TODO Auto-generated method stub
        @SuppressWarnings("unchecked")
        //Map<String,Object> paramMap=(Map<String,Object>)param;
        Example example=new Example(Enterprise.class);
        if(param!=null){
            //添加查询条件
            Example.Criteria cr = example.createCriteria();
            Map<String,Object> paramMap=(Map<String, Object>) param;
            String id=(String) paramMap.get("id");
            String name=(String) paramMap.get("name");
            String type=(String) paramMap.get("type");
            String area=(String) paramMap.get("area");
            String operation=(String) paramMap.get("operation");
            String importantLevel=(String) paramMap.get("importantLevel");
            if(!StringUtils.isBlank(id)){
                cr.andLike("id", "%"+id+"%");
            }
            //如果字段不为空
            if(!StringUtils.isBlank(name)){
                cr.andLike("name", "%"+name+"%");
            }
            if(!StringUtils.isBlank(operation)){
                cr.andLike("operation", "%"+operation+"%");
            }
            if(!StringUtils.isBlank(type)){
                cr.andLike("type", "%"+type+"%");
            }
            if(!StringUtils.isBlank(area)){
                cr.andEqualTo("area", area);
            }
            if(!StringUtils.isBlank(importantLevel)){
                cr.andEqualTo("importantLevel", importantLevel);
            }
        }
        return getMapper().selectByExample(example);
    }

    //继承实现方法，可以直接使用注解的mapper
    @Override
    public Mapper<Enterprise> getMapper() {
        return mapper;
    }

    //修改启用状态
    @Override
    public void updateFlag(String id, String flag) {
        // TODO Auto-generated method stub
        Enterprise enterprise=new Enterprise();
        enterprise.setId(id);
        enterprise.setFlag(flag);
        String string = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
        enterprise.setUpdateTime(string);
        updateSelective(enterprise);
    }

    @Override
    public void updateTime(Enterprise enterprise) {
        String string = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
        enterprise.setUpdateTime(string);
        insertOrUpdate(enterprise);
    }


}


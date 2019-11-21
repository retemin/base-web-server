package com.grkj.modules.sys.serviceImpl;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.utils.MapRemoveNullUtil;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.entity.SysConfig;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.mapper.EnterpriseMapper;
import com.grkj.modules.sys.service.EnterpriseService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;

import java.util.List;
import java.util.Map;

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
        //Example.Criteria cr = example.createCriteria();
        //String id=(String) paramMap.get("id");
        return mapper.selectByExample(example);
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
        updateSelective(enterprise);
    }
}


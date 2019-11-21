package com.grkj.modules.sys.serviceImpl;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.service.EnterpriseService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

/**
 * @program: base-web-server
 * @description: 企业信息管理service
 * @author: retemin
 * @create: 2019-11-20 15:18
 **/
@Service
public class EnterpriseServiceImpl implements BaseMapperCurdService<Enterprise>, EnterpriseService, InitializingBean {


    @Override
    public Mapper<Enterprise> getMapper() {
        return null;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}

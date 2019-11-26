package com.grkj.modules.sys.serviceImpl;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.page.entity.PageResponseMessage;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.entity.Outletl;
import com.grkj.modules.sys.mapper.OutletlMapper;
import com.grkj.modules.sys.service.EnterpriseService;
import com.grkj.modules.sys.service.OutletlService;
import javafx.fxml.Initializable;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.common.Mapper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @program: base-web-server
 * @description: 企业排口信息的业务层
 * @author: retemin
 * @create: 2019-11-25 13:59
 **/
@Service
public class OutletlServiceImpl implements BaseMapperCurdService<Outletl>,OutletlService, InitializingBean {

    @Autowired
    private OutletlMapper mapper;
    @Override
    public List<Outletl> getOutletList(Object param) {
        //传入查询条件param，进行查询
        List<Outletl> list = mapper.getOutletList((Map<String,String>)param);
        return list;
    }

    public PageResponseMessage getListPage(PageRequestMessage pageParam, Object param){
        MessagePageHelper.startPage(pageParam);
        //调用getOutLetList方法查询所有的排口数据，并进行分页封装，返回
        return MessagePageHelper.parseResult(getOutletList(param));
    }
    //设置是否启用
    @Override
    public void updateFlag(String id, String flag) {
        // TODO Auto-generated method stub
        Outletl outletl = new Outletl();
        outletl.setId(id);
        outletl.setFlag(flag);
        updateSelective(outletl);
        //更新时间
        String string = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
        mapper.updateTime(string,id);
    }

    @Override
    public Mapper<Outletl> getMapper() {
        return mapper;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}

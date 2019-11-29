package com.grkj.modules.sys.mapper;


import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.Outletl;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;

@DBMapper
public interface OutletlMapper extends Mapper<Outletl> {
    List<Outletl> getOutletList(Map<String,String> param);
   // Integer deleteOutletlById(String OutletlId);
    Integer updateTime(String time,String id);
    Outletl getOutletlById(String id);
    Integer insertOutletl(Outletl outletl);
    //根据排口id删除排口
    Integer deleteByOutletlId(String outletlid);
}

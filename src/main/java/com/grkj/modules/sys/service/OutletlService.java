package com.grkj.modules.sys.service;

import com.grkj.common.base2.core.CurdService;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.page.entity.PageResponseMessage;
import com.grkj.modules.sys.entity.Enterprise;
import com.grkj.modules.sys.entity.Outletl;
import edu.princeton.cs.algs4.Out;

import java.util.List;

public interface OutletlService  extends CurdService<Outletl> {
    Outletl getoutletlById(String id);
    List<Outletl>  getOutletList(Object param);
    PageResponseMessage getListPage(PageRequestMessage pageParam, Object param);
    void updateFlag(String id, String flag);
    void updateTime(String Time,String id);
    void insertOutletl(Outletl outletl);
    Integer deleteOutletlByid(String outletlid);
}

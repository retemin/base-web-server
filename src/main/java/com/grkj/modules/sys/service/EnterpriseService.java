package com.grkj.modules.sys.service;

import com.grkj.common.base2.core.CurdService;
import com.grkj.modules.sys.entity.Enterprise;


public interface EnterpriseService extends CurdService<Enterprise> {
    void updateFlag(String id, String flag);
}

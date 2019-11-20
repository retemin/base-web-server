package com.grkj.modules.sys.mapper;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.SysSetting;

import tk.mybatis.mapper.common.Mapper;

@DBMapper
public interface SettingMapper extends Mapper<SysSetting>{

}

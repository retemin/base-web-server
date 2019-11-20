package com.grkj.modules.sys.mapper;

import tk.mybatis.mapper.common.Mapper;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.Area;
/**
 * 系统区域管理 Mapper
 * @author jiabinl
 * @date  2017-02-17
 */
 @DBMapper
public interface AreaMapper extends Mapper<Area> {

}

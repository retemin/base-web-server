package com.grkj.modules.sys.mapper;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.Role;

import tk.mybatis.mapper.common.Mapper;

@DBMapper
public interface RoleMapper extends Mapper<Role>{
	
}

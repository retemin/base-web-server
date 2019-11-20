package com.grkj.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.Menu;

import tk.mybatis.mapper.common.Mapper;

@DBMapper
public interface MenuMapper extends Mapper<Menu>{
	
	List<Menu> getListByUserId(@Param("userId") String userId,@Param("type") String type,@Param("parentId") String parentId);
	
	List<Menu> getListByScopeAndUserId(@Param("scope") String scope, @Param("userId")String userId,@Param("type") String type,@Param("parentId") String parentId);
	
}

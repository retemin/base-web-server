package com.grkj.modules.sys.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.User;

import tk.mybatis.mapper.common.Mapper;

@DBMapper
public interface UserMapper extends Mapper<User>{
	
	/**
	 * 更新用户部门
	 * @param userIds
	 * @param officeId
	 */
	void updateUsersOffice(@Param("userIds")List<String> userIds, @Param("officeId")String officeId);

}

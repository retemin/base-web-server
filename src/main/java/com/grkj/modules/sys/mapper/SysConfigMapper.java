package com.grkj.modules.sys.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PathVariable;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.modules.sys.entity.SysConfig;

import tk.mybatis.mapper.common.Mapper;
/**
 *  Mapper
 * @author 
 * @date  2017-11-08
 */
 @DBMapper
public interface SysConfigMapper extends Mapper<SysConfig> {

	int deleteByPkid(@Param("pkid")String pkid);

	List<Map<String, Object>> getModuleList(@Param("type")String type,@Param("module") String module,@Param("parent") String parent,@Param("grandpa") String grandpa,@Param("remark") String remark);

	List<Map<String, Object>> getTypeList(@PathVariable("module")String module);
	
	List<SysConfig> getConfigList(@Param("type")String type,@Param("module") String module,@Param("parent") String parent,@Param("grandpa") String grandpa,@Param("remark") String remark);

	List<SysConfig> getConfigListByResful(Map<String, Object> param);
	
	List<String> getParentStringList(@Param("type")String type,@Param("module") String module,@Param("parent") String parent,@Param("grandpa") String grandpa,@Param("remark") String remark);

	List<Map<String, Object>> getWgLevelSelectData(Map<String, Object> paramMap);
	

}

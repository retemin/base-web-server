package com.grkj.modules.sys.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;
import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.utils.MapRemoveNullUtil;
import com.grkj.modules.sys.entity.SysConfig;
import com.grkj.modules.sys.mapper.SysConfigMapper;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

/**
 *  Service
 * @author 
 * @date  2017-11-08
 */
@Service
public class SysConfigService  implements BaseMapperCurdService<SysConfig>{
	
	@Autowired
	private SysConfigMapper mapper;
	
	@Override
	public List<SysConfig> getList(Object param) {
		// TODO Auto-generated method stub
		@SuppressWarnings("unchecked")
		Map<String,Object> paramMap=(Map<String,Object>)param;
		Example example=new Example(SysConfig.class);
		Criteria cr = example.createCriteria();
		if(StringUtils.isNotBlank((CharSequence)paramMap.get("type"))  ) {
			cr.andLike("type","%"+paramMap.get("type")+"%");
		}
		if(StringUtils.isNotBlank((CharSequence)paramMap.get("module"))  ) {
			cr.andLike("module","%"+paramMap.get("module")+"%");
		}
		if(StringUtils.isNotBlank((CharSequence)paramMap.get("deleteFlag"))  ) {
			cr.andEqualTo("deleteFlag", paramMap.get("deleteFlag"));
		}
		//除去空key和空value,但是不适合like
		MapRemoveNullUtil.removeNullEntry(paramMap);
		//特别处理需要模糊搜索的key
		for (String key : paramMap.keySet()) {
			if (key.indexOf("Name")>=0||key.indexOf("name")>=0) {
				cr.andLike(key, "%"+paramMap.get(key).toString()+"%");
			}
		}
		return mapper.selectByExample(example);
	}

	public void updateFlag(String id,String flag) {
		SysConfig config=new SysConfig();
		config.setId(id);
		config.setFlag(flag);
		updateSelective(config);
	}

	public List<Map<String,Object>> getModuleList(String type, String module, String parent, String grandpa, String remark) {
		return mapper.getModuleList(type,module,parent,grandpa,remark);
	}

	public List<Map<String,Object>> getTypeList(String module) {
		// TODO Auto-generated method stub
		return mapper.getTypeList(module);
	}
	
	public List<SysConfig> getByMoudle(String module){
		HashMap<String, Object> param = Maps.newHashMap();
		param.put("module", module);
		return getList(param);
	}
	
	public List<SysConfig> getByMoudleAndType(String module,String type){
		HashMap<String, Object> param = Maps.newHashMap();
		param.put("module", module);
		param.put("type", type);
		return getList(param);
	}
	
	public List<SysConfig> getConfigList(String type, String module, String parent, String grandpa, String remark){
		return mapper.getConfigList(type,module,parent,grandpa,remark);
	}
	
	public List<SysConfig> getConfigListByResful(Map<String, Object> param){
		return mapper.getConfigListByResful(param);
	}
	public List<String> getParentConfigList(String type, String module, String parent, String grandpa, String remark){
		return mapper.getParentStringList(type, module, parent, grandpa, remark);
	}

	public List<Map<String, Object>> getWgLevelSelectData(Map<String, Object> paramMap) {
		// TODO Auto-generated method stub
		return mapper.getWgLevelSelectData(paramMap);
	}

	@Override
	public Mapper<SysConfig> getMapper() {
		// TODO Auto-generated method stub
		return mapper;
	}

}

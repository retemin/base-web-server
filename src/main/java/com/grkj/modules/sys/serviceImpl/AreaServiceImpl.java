package com.grkj.modules.sys.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Area;
import com.grkj.modules.sys.mapper.AreaMapper;
import com.grkj.modules.sys.service.AreaService;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

/**
 * 系统区域管理 Service
 * @author jiabinl
 * @date  2017-02-17
 */
@Service
public class AreaServiceImpl implements BaseMapperCurdService<Area>, AreaService{
	
	@Autowired
	private AreaMapper mapper;
	
	@Override
	public AreaMapper getMapper() {
		// TODO Auto-generated method stub
		return mapper;
	}
	
	@Override
	public List<Area> getList(Object param) {
		// TODO Auto-generated method stub
		@SuppressWarnings("unchecked")
		Map<String,Object> paramMap=(Map<String,Object>)param;
		Example example=new Example(Area.class);
		Criteria cr = example.createCriteria();
		
		if(!StringUtils.isBlank((CharSequence) paramMap.get("name"))){
			cr.andLike("name", "%"+paramMap.get("name")+"%"); 
		}
		if(!StringUtils.isBlank((CharSequence) paramMap.get("type"))){
			cr.andEqualTo("type", paramMap.get("type"));
		}
		
		return mapper.selectByExample(example);
	}
	
	@Transactional
	@Override
	public void updateFlag(String id,Integer flag) {
		// TODO Auto-generated method stub
		Area area=new Area();
		area.setId(id);
		area.setFlag(flag);
		updateSelective(area);
	}


}

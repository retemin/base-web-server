package com.grkj.modules.sys.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Office;
import com.grkj.modules.sys.mapper.OfficeMapper;
import com.grkj.modules.sys.service.OfficeService;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class OfficeServiceImpl implements  BaseMapperCurdService<Office>,OfficeService{
	
	@Autowired
	private OfficeMapper mapper;
	
	@Override
	public OfficeMapper getMapper() {
		// TODO Auto-generated method stub
		return mapper;
	}

	@Override
	public List<Office> getList(Object param) {
		@SuppressWarnings("unchecked")
		Map<String,Object> paramMap= (Map<String, Object>) param;
		Example example=new Example(Office.class);
		Criteria cr = example.createCriteria();
		if(paramMap!=null){
			if(!StringUtils.isBlank((CharSequence) paramMap.get("flag"))){
				cr.andEqualTo("flag", paramMap.get("flag"));
			}
		}
		return getMapper().selectByExample(example);
	}

	@Override
	public void updateFlag(String id,String flag) {
		// TODO Auto-generated method stub
		Office office=new Office();
		office.setId(id);
		office.setFlag(flag);
		updateSelective(office);
	}
	
	/**
	 * 填充parentids 字段
	 * @param data
	 * @return
	 */
	protected Office fixParentIds(Office data) {
		if(!StringUtils.isBlank( data.getParentId())){
			Office parent = getById( data.getParentId());
			if(parent!=null&&!StringUtils.isBlank(parent.getParentIds())){
				data.setParentIds(parent.getParentIds()+parent.getId()+";");
			}else{
				data.setParentIds(data.getParentId()+";");
			}
		}
		return data;
	}

	@Override
	public boolean preInsert(Office data) {
		data=fixParentIds(data);
		return BaseMapperCurdService.super.preInsert(data);
	}
	

	@Override
	public boolean preUpdate(Office data) {
		data=fixParentIds(data);
		return BaseMapperCurdService.super.preUpdate(data);
	}
	
	
}

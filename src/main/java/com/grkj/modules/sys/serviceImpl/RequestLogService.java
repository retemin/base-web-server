package com.grkj.modules.sys.serviceImpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grkj.common.base2.impl.service.AbstractAsyncInsertBatchMapperCurdService;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.RequestLog;
import com.grkj.modules.sys.mapper.SysRequestLogMapper;

import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

@Service
public class RequestLogService extends  AbstractAsyncInsertBatchMapperCurdService<RequestLog>{
	
	public static String date_ = "";
	
	@Override
	public List<RequestLog> getList(Object param) {
		@SuppressWarnings("unchecked")
		Map<String,Object> paramMap=(Map<String,Object>)param;
		Example example=new Example(RequestLog.class);
		Criteria cr = example.createCriteria();
		
		if(!StringUtils.isBlank((CharSequence) paramMap.get("createBy"))){
			cr.andLike("createBy","%"+ paramMap.get("createBy")+"%");
		}
		if(!StringUtils.isBlank((CharSequence) paramMap.get("remoteAddr"))){
			cr.andLike("remoteAddr","%"+ paramMap.get("remoteAddr")+"%");
		}
		if(!StringUtils.isBlank((CharSequence) paramMap.get("params"))){
			cr.andLike("params","%"+ paramMap.get("params")+"%");
		}
		if(!StringUtils.isBlank((CharSequence) paramMap.get("requestUri"))){
			cr.andLike("requestUri","%"+ paramMap.get("requestUri")+"%");
		}
		
		return mapper.selectByExample(example);
	}

	 
	 

	@Transactional
	@Override
	public Integer executeInsertBatch(List<RequestLog> list) {
		// TODO Auto-generated method stub
		return getMapper().insertList(list);
	}


	@Autowired
	private SysRequestLogMapper mapper;

	@Override
	public SysRequestLogMapper getMapper() {
		// TODO Auto-generated method stub
		return mapper;
	}
	
}

package com.grkj.common.base;


import java.util.Map;

import javax.servlet.ServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.grkj.common.base2.impl.controller.BaseCurdListController;
import com.grkj.lib.message.annotation.ResponseMessageContorllerExceptionHandler;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.mybatis.page.MessagePageHelper;
import com.grkj.lib.page.entity.PageRequestMessage;
import com.grkj.lib.page.entity.PageResponseMessage;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@ResponseMessageContorllerExceptionHandler
public interface BaseRestfulController<T> extends BaseCurdListController<T> {
	
	@ApiOperation("列表查询")
	@GetMapping(value="/list",produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage list(ServletRequest request) {
		return BaseCurdListController.super.list(request);
	}

	@ApiOperation("列表分页查询")
	@GetMapping(value="/page",produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage listPage(PageRequestMessage pageParam, ServletRequest request) {
		return BaseCurdListController.super.listPage(pageParam, request);
	}
	
	@ApiOperation("jqgrid格式列表分页查询")
	@GetMapping(value="/jqgrid",produces = "application/json;charset=UTF-8")
	@ResponseBody
	default PageResponseMessage listJqgrid(PageRequestMessage pageParam, ServletRequest request) {
		Map<String, Object> param = MessagePageHelper.getNotPageParam(request);
		return getService().getListPage(pageParam,param);
	}
	
	@ApiOperation("保存数据，空数据会覆盖")
	@PostMapping(value="save",produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage save(@RequestBody T data) {
		return BaseCurdListController.super.save(data);
	}

	@ApiOperation("保存数据，忽略非空数据")
	@PostMapping(value="saveNotNull",produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage saveNotNull(@RequestBody T data) {
		return BaseCurdListController.super.saveNotNull(data);
	}
	
	@ApiOperation("根据业务id获取数据")
	@GetMapping(value="data/{id}", produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage getById(@ApiParam(value="业务主键") @PathVariable() String id) {
		return BaseCurdListController.super.getById(id);
	}
	
	@ApiOperation("根据业务id删除数据")
	@RequestMapping(value="delete/{id}",produces = "application/json;charset=UTF-8",method = {RequestMethod.DELETE,RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	@Override
	default ResponseMessage delete(@ApiParam(value="业务主键") @PathVariable()String id) {
		return BaseCurdListController.super.delete(id);
	}

	@ApiOperation("根据业务id增加数据")
	@PostMapping(value="insert",produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage insert (@ApiParam(value="数据") @RequestBody T data) {
		return BaseCurdListController.super.insert( data);
	}

	@ApiOperation("根据业务id更新数据")
	@PutMapping(value="update/{id}",produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	default ResponseMessage update(@ApiParam(value="业务主键") @PathVariable()String id,@ApiParam(value="数据") @RequestBody T data) {
		return BaseCurdListController.super.update(id, data);
	}

}

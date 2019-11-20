package com.grkj.modules.main.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
* 重写全局错误，清楚错误输出
* @author jiabinl
* @version 创建时间：2017年11月27日 下午2:06:51
*/
@RequestMapping("/error")
public class ClobalErrorController {
	
	@RequestMapping("/404")
	@ResponseBody
	public ResponseEntity<Object> notFoundPage(HttpServletResponse response){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@RequestMapping("/500")
	@ResponseBody
	public ResponseEntity<Object> exceptionPage(HttpServletResponse response){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	
}

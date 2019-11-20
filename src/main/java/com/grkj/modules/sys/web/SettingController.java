package com.grkj.modules.sys.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.common.base2.core.CurdService;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.modules.sys.entity.SysSetting;
import com.grkj.modules.sys.serviceImpl.SettingService;

import io.swagger.annotations.Api;

@Api(tags="系统配置管理",description="系统配置信息接口")
@Controller
@RequestMapping(value="/sys/setting")
public class SettingController implements BaseRestfulController<SysSetting>{
	
	@Autowired
	private SettingService settingService;

	@Override
	public CurdService<SysSetting> getService() {
		return settingService;
	}
	
	/**
	 * 系统配置展示界面
	 * @return
	 */
	@RequestMapping(value="",method = RequestMethod.GET)
	public String settingPage() {
		return "/modules/sys/settingList";
	}
	
	/**
	 * 系统配置信息
	 * @return
	 */
	@RequestMapping(value="/system",method = RequestMethod.GET)
	@ResponseBody
	public ResponseMessage getSystemConfigs(){
		return ResponseMessage.newOkInstance(settingService.getSystemConfigs());
	}
	
	/**
	 * 普通配置信息
	 * @return
	 */
	@RequestMapping(value="/base",method = RequestMethod.GET)
	@ResponseBody
	public ResponseMessage getBaseSettings() {
		return ResponseMessage.newOkInstance(settingService.getBaseSettings(null));
	}
}

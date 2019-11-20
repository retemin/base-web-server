package com.grkj.modules.sys.web;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.common.base2.core.CurdService;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.modules.sys.entity.SysConfig;
import com.grkj.modules.sys.serviceImpl.SysConfigService;

import io.swagger.annotations.Api;


/**
 *  Controller
 * @author 
 * @date  2017-11-08
 */
@Api(tags="参数管理",description="参数管理信息接口")
@Controller
@RequestMapping(value="/sys/config")
public class SysConfigController  implements BaseRestfulController<SysConfig>{
	private static Logger logger=LoggerFactory.getLogger(SysConfigController.class);
	
	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Autowired
	private SysConfigService service;
	
	@Override
	public void checkKey(SysConfig data) {
		// TODO Auto-generated method stub
		if(data.getId()==null || "".equals(data.getId())){
			data.setId(keyGenerator.getNext());
		}
	}
	@Override
	public CurdService<SysConfig> getService() {
		// TODO Auto-generated method stub
		return service;
	}
	@GetMapping(value="/list",params = "page")
	public String listPage() {
		return "modules/sys/configList";
	}
	
	@GetMapping("formPage")
	public String formPage() {
		return "/modules/sys/configForm";
	}

	@GetMapping("formPage/{id}")
	public String form(@PathVariable String id, Model model) {
		model.addAttribute("id",id);
		return "/modules/sys/configForm";
	}
	
	@RequestMapping(value="/getlistSelect",method=RequestMethod.GET)
	public String list(Model model,String pollutantType) throws Exception{
		model.addAttribute("names",pollutantType);
		return "/modules/sys/configListSelect";
	}
	
	@RequestMapping(value="/deleteByPkid/{pkid}",method=RequestMethod.POST)
	@ResponseBody
	public ResponseMessage deleteByPkid(@PathVariable String pkid) throws Exception{
		return ResponseMessage.newOkInstance(service.deleteById(pkid));
	}
	
	@RequestMapping(value = "/updateFlag/{id}", method = RequestMethod.POST)
	@ResponseBody
	public ResponseMessage updateFlag(@PathVariable String id, String flag) {
		service.updateFlag(id, flag);
		return ResponseMessage.newOkInstance(id);
	}
	
	/**
	 * 获得模块列表
	 * @return
	 */
	@RequestMapping(value = "/getModuleList")
	@ResponseBody
	public ResponseMessage moduleList(String type, String module, String parent, String grandpa, String remark){
		return ResponseMessage.newOkInstance(service.getModuleList(type,module,parent,grandpa,remark));
	}
	
	/**
	 * 获得模块列表
	 * @return
	 */
	@RequestMapping(value = "/type", method = RequestMethod.POST)
	@ResponseBody
	public ResponseMessage typeList(String module){
		return ResponseMessage.newOkInstance(service.getTypeList(module));
	}
	
	
	//下拉选择
	@RequestMapping("getSelectData")
	@ResponseBody
	public ResponseMessage getSelectData(String type, String module, String parent, String grandpa, String remark) {
		return ResponseMessage.newOkInstance(service.getConfigList(type,module,parent,grandpa,remark));
	}
	//下拉选择
	@RequestMapping("getWgLevelSelectData")
	@ResponseBody
	public ResponseMessage getWgLevelSelectData() {
		Map<String,Object> paramMap= new HashMap<String,Object>();
		return ResponseMessage.newOkInstance(service.getWgLevelSelectData(paramMap));
	}

	
	
}

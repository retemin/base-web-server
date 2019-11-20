package com.grkj.modules.sys.web;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.grkj.common.base.BaseRestfulController;
import com.grkj.common.base2.core.CurdService;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.modules.sys.entity.SysMobile;
import com.grkj.modules.sys.serviceImpl.SysMobileService;

/**
 * 移动端版本管理
 * @author wangq by 2019年9月27日
 *
 */
@Controller
@RequestMapping(value="/sys/mobile")
public class SysMobileController implements BaseRestfulController<SysMobile>{
	
	@Autowired
	private SysMobileService service;

	@Override
	public CurdService<SysMobile> getService() {
		return service;
	}
	
	/**
	 * 列表页面
	 * @return
	 */
	@GetMapping(value="/list",params = "page")
	public String listPage() {
		return "/modules/sys/mobileList";
	}
	
	/**
	 * 表单页面
	 * @return
	 */
	@GetMapping(value= "/form")
	public String mobileForm(Model model) {
		return "/modules/sys/mobileForm";
	}
	
	@GetMapping(value= "/form/{id}")
	public String mobileForm(@PathVariable(value = "id") String id,Model model) {
		model.addAttribute("id", id);
		return "/modules/sys/mobileForm";
	}
	
	/**
	 * 提交有附件的数据
	 * @param file
	 * @param mobile
	 * @return
	 */
	@PostMapping("/submit")
	@ResponseBody
	public ResponseMessage submitDatat(@RequestPart("file") MultipartFile file,SysMobile mobile) {
		return service.submitData(file,mobile);
	}
	
	/**
	 * 下载附件
	 * @param id
	 */
	@GetMapping("/download/{id}")
	public void download(@PathVariable(value="id") String id,HttpServletResponse response) {
		try {
			service.download(id,response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

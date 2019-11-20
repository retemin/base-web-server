package com.grkj.modules.sys.serviceImpl;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.utils.DateUtils;
import com.grkj.lib.utils.FileUtils;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.SysMobile;
import com.grkj.modules.sys.mapper.SysMobileMapper;

import tk.mybatis.mapper.common.Mapper;

@Service
public class SysMobileService implements BaseMapperCurdService<SysMobile>{
	
	@Autowired
	private SysMobileMapper mapper;
	

	@Autowired
	private KeyGenerator<String> keyGenerator;

	@Override
	public Mapper<SysMobile> getMapper() {
		return mapper;
	}

	/**
	 * 提交数据
	 * @param file
	 * @param mobile
	 * @return
	 */
	public ResponseMessage submitData(MultipartFile file, SysMobile mobile) {
		try {
			String savePath = saveFile(file);
			mobile.setSavePath(savePath);
			if(StringUtils.isBlank(mobile.getId())) {
				mobile.setId(keyGenerator.getNext());
			}
			this.insertOrUpdateSelective(mobile);
			return ResponseMessage.newOkInstance(null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseMessage.newErrorInstance(null);
		}
	}
	
	/**
	 * 保存文件到指定文件夹
	 * @param file
	 * @return
	 * @throws Exception
	 */
	private String saveFile(MultipartFile file) throws Exception {
		// 文件路径
		String fileUploadRoot = SettingService.getConfig("system.mobile.path");
		fileUploadRoot = fileUploadRoot + File.separator + DateUtils.getDate() + File.separator;
		// 判断文件夹是否存在
		File dir = new File(fileUploadRoot);
		if (!dir.exists()){
			dir.mkdirs();
		}
		// 生成新的附件名
		String suffixName = getSuffixName(file.getOriginalFilename());
		String pkid = keyGenerator.getNext();
		String newName = pkid + suffixName;
		String newPath = fileUploadRoot + newName;
		BufferedOutputStream out = null;
		out = new BufferedOutputStream(new FileOutputStream(new File(newPath)));
		FileUtils.transferStream(file.getInputStream(), out);
		return newPath;
	}
	
	/**
	 * 获得文件名的后缀名
	 * 
	 * @param filename
	 * @return
	 */
	private String getSuffixName(String filename) {
		if ((filename != null) && (filename.length() > 0)) {
			int dot = filename.lastIndexOf('.');
			if ((dot > -1) && (dot < (filename.length() - 1))) {
				return filename.substring(dot);
			}
		}
		return filename;
	}

	/**
	 * 下载文件
	 * @param id
	 * @param response
	 * @throws Exception
	 */
	public void download(String id, HttpServletResponse response) throws Exception {
		SysMobile mobile = this.getById(id);
		if(mobile!=null) {
			String savePath = mobile.getSavePath();
			File file = new File(savePath);
			if(file.exists()) {
				String fileName = mobile.getMobileName()+mobile.getVersion()+getSuffixName(mobile.getSavePath());
				response.setHeader("Content-Disposition", "SysAttachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
				response.addHeader("Content-Length", "" + file.length());
				response.addHeader("Cache-Control", "no-store" );
				response.addHeader("Pragma", "no-cache" );
				OutputStream output = null;
				FileChannel fc = null;
				FileInputStream inputStream = null;
				try{
					output = response.getOutputStream();
					inputStream = new FileInputStream(file);
					fc = inputStream.getChannel();
					//fileManger.download(SysAttachment.getSavePath(), SysAttachment.getSaveName(), output);
					fc.transferTo(0, fc.size(), Channels.newChannel(output) );
				}catch (Exception e) {
					e.printStackTrace();
				}finally {
					if(output!=null) {
						output.flush();
						output.close();
					}
					if(fc!=null) {
						fc.close();
					}
					if(inputStream!=null) {
						inputStream.close();
					}
				}
			}
		}
		throw new Exception("安装包不存在");
	}

}

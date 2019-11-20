package com.grkj.modules.sys.entity;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 移动端版本管理
 * @author wangq by 2019年9月27日
 *
 */
@Table(name="SYS_MOBILE")
public class SysMobile {

	@Id
	private String id;
	
	/** 移动端操作系统代码：IOS/Android */
	private String systemCode;
	
	/** 移动端名称 */
	private String mobileName;

	/** 版本号 */
	private String version;
	
	/** 上传更新时间 */
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date uploadTime;
	
	/** 上传更新人 */
	private String uploadUser;
	
	/** 安卓安装包存放路径/IOS最新版本APP Store路径 */
	private String savePath;
	
	/** 更新内容*/
	private String content;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSystemCode() {
		return systemCode;
	}

	public void setSystemCode(String systemCode) {
		this.systemCode = systemCode;
	}

	public String getMobileName() {
		return mobileName;
	}

	public void setMobileName(String mobileName) {
		this.mobileName = mobileName;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Date getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	public String getUploadUser() {
		return uploadUser;
	}

	public void setUploadUser(String uploadUser) {
		this.uploadUser = uploadUser;
	}

	public String getSavePath() {
		return savePath;
	}

	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}

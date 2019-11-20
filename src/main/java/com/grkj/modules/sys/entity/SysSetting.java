package com.grkj.modules.sys.entity;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="sys_setting")
public class SysSetting {
	
	@Id
	private String pkid;
	/** 配置作用域 */
	private String scope;
	/** 配置项 */
	private String config;
	/** 配置值 */
	private String value;
	/** 是否使用该配置项 1是0否 */
	private String flag;
	/** 备注 */
	private String remarks;
	/** 入库时间 */
	private Date insertTime;
	/** 更新时间 */
	private Date updateTime;
	/** 前一次的配置值 */
	private String oldValue;
	
	public String getPkid() {
		return pkid;
	}
	public void setPkid(String pkid) {
		this.pkid = pkid;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public String getConfig() {
		return config;
	}
	public void setConfig(String config) {
		this.config = config;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Date getInsertTime() {
		return insertTime;
	}
	public void setInsertTime(Date insertTime) {
		this.insertTime = insertTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getOldValue() {
		return oldValue;
	}
	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

}

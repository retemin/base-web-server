package com.grkj.modules.sys.entity;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.annotations.ApiModelProperty;


/**
 *用户管理entity
 *tableType:TABLE
 *tableInfo:GRLEARN2.SYS_USER(用户表)
 *@author jiabinl
 *@date 2018-06-14
 **/
@Table(name="SYS_USER")
public class User implements Serializable {
	public static final long serialVersionUID = 1L;

	/** 数据ID */
	@Id
	private String id;

	/** 登陆名 */
	@ApiModelProperty("登录名")
	private String loginName;

	/** 用户名 */
	private String name;

	/** 曾用名 */
	private String oldName;

	/** 性别 */
	private String sex;

	/** 密码（加盐的md5加密串） */
	private String password;

	/** 用户类型 */
	private String type;

	/** 手机 */
	private String mobile;

	/** 办公电话 */
	private String officePhone;

	/** 所属部门ID */
	private String officeId;

	/** 所属部门名称 */
	private String officeName;

	/** 职务 */
	private String duty;

	/** 排序号 */
	private Long sortid;

	/** 可用标志（1为可用，0为不可用） */
	private String flag;

	/** 备注 */
	private String remark;

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return this.id;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setOldName(String oldName) {
		this.oldName = oldName;
	}

	public String getOldName() {
		return this.oldName;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSex() {
		return this.sex;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return this.password;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return this.type;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getOfficePhone() {
		return this.officePhone;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public String getOfficeId() {
		return this.officeId;
	}

	public void setOfficeName(String officeName) {
		this.officeName = officeName;
	}

	public String getOfficeName() {
		return this.officeName;
	}

	public void setDuty(String duty) {
		this.duty = duty;
	}

	public String getDuty() {
		return this.duty;
	}

	public void setSortid(Long sortid) {
		this.sortid = sortid;
	}

	public Long getSortid() {
		return this.sortid;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getFlag() {
		return this.flag;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRemark() {
		return this.remark;
	}
}
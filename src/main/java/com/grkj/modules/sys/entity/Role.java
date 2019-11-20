package com.grkj.modules.sys.entity;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;


/**
*entity
*tableType:TABLE
*tableInfo:SYS_ROLE(系统角色表)
*@author 
*@date 2018-06-19
**/
@Table(name="SYS_ROLE")
public class Role implements Serializable {
    public static final long serialVersionUID = 1L;

    /** 主键 */
    @Id
    private String id;

    /** 名称 */
    private String name;

    /** 备注 */
    private String remark;

    /** 作用域 */
    private String scope;

    /** 类型 */
    private String type;

    /** 是可用标志（1为可用，0为不可用） */
    private String flag;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getRemark() {
        return this.remark;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getScope() {
        return this.scope;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getFlag() {
        return this.flag;
    }
}
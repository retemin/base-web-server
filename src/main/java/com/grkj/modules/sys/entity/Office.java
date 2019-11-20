package com.grkj.modules.sys.entity;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;


/**
*entity
*tableType:TABLE
*tableInfo:SYS_OFFICE(系统部门表)
*@author 
*@date 2018-06-19
**/
@Table(name="SYS_OFFICE")
public class Office implements Serializable {
    public static final long serialVersionUID = 1L;

    /** ID */
    @Id
    private String id;

    /** 名称 */
    private String name;

    /** 曾用名 */
    private String oldName;

    /** 部门类型 */
    private String type;

    /** 父节点ID */
    private String parentId;

    /** 所有父节点ID */
    private String parentIds;

    /** 所属区域代码 */
    private String areaId;

    /** 所属区域名称 */
    private String areaName;

    /** 排序号 */
    private Long sort;

    /** 备注 */
    private String remark;

    /** 可用标志（1为可用，0为不可用） */
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

    public void setOldName(String oldName) {
        this.oldName = oldName;
    }

    public String getOldName() {
        return this.oldName;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getParentId() {
        return this.parentId;
    }

    public void setParentIds(String parentIds) {
        this.parentIds = parentIds;
    }

    public String getParentIds() {
        return this.parentIds;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getAreaId() {
        return this.areaId;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getAreaName() {
        return this.areaName;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }

    public Long getSort() {
        return this.sort;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getRemark() {
        return this.remark;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getFlag() {
        return this.flag;
    }
}
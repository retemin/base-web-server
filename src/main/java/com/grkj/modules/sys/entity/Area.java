package com.grkj.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


/**
*系统区域管理entity
*tableType:TABLE
*tableInfo:GZEPI.SYS_AREA(系统区域表)
*@author jiabinl
*@date 2017-02-17
**/
@Table(name="SYS_AREA")
public class Area implements Serializable {
    public static final long serialVersionUID = 1L;

    /** 区域代码 */
    @Id
    private String id;

    /** 区域名称 */
    private String name;

    /** 曾用名 */
    private String oldName;

    /** 区域类型 */
    private String type;

    /** 父节点代码 */
    private String parentId;

    /** 所有父节点代码 */
    private String parentIds;

    /** 排序 */
    private Long sort;

    /** 备注 */
    private String remark;

    /** 可用标志 */
    private Integer flag;
    

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

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    public Integer getFlag() {
        return this.flag;
    }

}
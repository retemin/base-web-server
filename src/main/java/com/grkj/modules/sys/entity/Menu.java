package com.grkj.modules.sys.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


/**
*entity
*tableType:TABLE
*tableInfo:SYS_MENU(菜单表)
*@author 
*@date 2018-06-19
**/
@Table(name="SYS_MENU")
public class Menu implements Serializable {
    public static final long serialVersionUID = 1L;
    
    public static final String TYPE_WEB="1";
    public static final String TYPE_MOBILE="0";
    
    /** 主键 */
    @Id
    private String id;

    /** 父节点 */
    private String parentId;

    /** 所有父节点 */
    private String parentIds;

    /** 名称 */
    private String name;

    /** 路径 */
    private String href;

    /** 目标 */
    private String target;

    /** 图标 */
    private String icon;

    /** 图标url */
    private String iconUrl;

    /** 排序 */
    private Long sort;

    /** 是否显示 */
    private Long isShow;

    /** 权限标志 */
    private String permission;

    /** 控制标志(用于扩展特殊功能) */
    private String controlMark;

    /** 可用标志（1为可用，0为不可用） */
    private String flag;

    /** 菜单域（用于区分子系统菜单） */
    private String scope;

    
	@Transient
	private List<Menu> childList=new ArrayList<Menu>();

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
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

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getHref() {
        return this.href;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getTarget() {
        return this.target;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getIcon() {
        return this.icon;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getIconUrl() {
        return this.iconUrl;
    }

    public void setSort(Long sort) {
        this.sort = sort;
    }

    public Long getSort() {
        return this.sort;
    }

    public void setIsShow(Long isShow) {
        this.isShow = isShow;
    }

    public Long getIsShow() {
        return this.isShow;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return this.permission;
    }

    public void setControlMark(String controlMark) {
        this.controlMark = controlMark;
    }

    public String getControlMark() {
        return this.controlMark;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getFlag() {
        return this.flag;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getScope() {
        return this.scope;
    }

	public List<Menu> getChildList() {
		return childList;
	}

	public void setChildList(List<Menu> childList) {
		this.childList = childList;
	}
    
	public void addChild(Menu child){
		childList.add(child);
	}
    
}
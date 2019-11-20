package com.grkj.modules.sys.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Id;
import javax.persistence.Table;


/**
*访问日志entity
*tableType:TABLE
*tableInfo:GRLEARN2.SYS_REQUEST_LOG(访问日志表)
*@author jiabinl
*@date 2018-06-14
**/
@Table(name="SYS_REQUEST_LOG")
public class RequestLog implements Serializable {
    public static final long serialVersionUID = 1L;

    /** 数据ID */
    @Id
    private String id;

    /** 访问路径关联菜单id */
    private String menuId;

    /** 访问路径关联菜单名称 */
    private String menuName;

    /** 访问人 */
    private String createBy;

    /** 访问时间 */
    private String createDate;

    /** 客户端ip */
    private String remoteAddr;

    /** 请求的USERAGENT头 */
    private String userAgent;

    /** 访问路径 */
    private String requestUri;

    /** 访问方法 */
    private String method;

    /** 请求CONTENT_TYPE头 */
    private String contentType;

    /** 访问参数 */
    private String params;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getMenuId() {
        return this.menuId;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuName() {
        return this.menuName;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public String getCreateBy() {
        return this.createBy;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getCreateDate() {
        return this.createDate;
    }

    public void setRemoteAddr(String remoteAddr) {
        this.remoteAddr = remoteAddr;
    }

    public String getRemoteAddr() {
        return this.remoteAddr;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getUserAgent() {
        return this.userAgent;
    }

    public void setRequestUri(String requestUri) {
        this.requestUri = requestUri;
    }

    public String getRequestUri() {
        return this.requestUri;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getMethod() {
        return this.method;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getContentType() {
        return this.contentType;
    }

    public void setParams(String params) {
        this.params = params;
    }

    public String getParams() {
        return this.params;
    }
}
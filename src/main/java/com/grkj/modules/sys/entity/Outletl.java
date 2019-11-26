package com.grkj.modules.sys.entity;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.io.Serializable;

/**
 * @program: base-web-server
 * @description: 企业排口信息
 * @author: retemin
 * @create: 2019-11-25 11:50
 **/
@Table(name="SYS_OUTLETL")
public class Outletl implements Serializable {
    //企业编码
    @Id
    private String id;
    //排口类型
    private String type;

    private String outletlname;
    @Transient
    private String updateTime;
    //是否启用
    private String flag;
    private String instrumentid;
    private String instrumentpwd;
    private String monitorypoint;
    private String longitude;
    private String latitude;
    private String outletlid;
    @Transient
    private String ename;

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOutletlname() {
        return outletlname;
    }

    public void setOutletlname(String outletlname) {
        this.outletlname = outletlname;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getInstrumentid() {
        return instrumentid;
    }

    public void setInstrumentid(String instrumentid) {
        this.instrumentid = instrumentid;
    }

    public String getInstrumentpwd() {
        return instrumentpwd;
    }

    public void setInstrumentpwd(String instrumentpwd) {
        this.instrumentpwd = instrumentpwd;
    }

    public String getMonitorypoint() {
        return monitorypoint;
    }

    public void setMonitorypoint(String monitorypoint) {
        this.monitorypoint = monitorypoint;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getOutletlid() {
        return outletlid;
    }

    public void setOutletlid(String outletlid) {
        this.outletlid = outletlid;
    }

//

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }
}

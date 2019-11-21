package com.grkj.modules.sys.entity;
import javax.persistence.Id;
/**
* @Description:   企业基本信息的entity类
* @Author: retemin
* @Date: 2019/11/20
*/
public class Enterprise {

  /** 主键 */
  @Id
  private String id;
  //企业名称
  private String name;
  //行业类型
  private String type;
  //所属区域
  private String area;
  //重点级别
  private String importantLevel;
  //联系人
  private String contactor;
  //联系电话
  private String phone;
  //运维单位名称
  private String operation;
  //更新时间
  private String updateTime;
  //是否启用（1为可用，0为不可用）
  private String flag;
  //企业简称
  private String shortName;
  //社会信用码
  private String communityCode;
  //法定代表人
  private String representative;
  //企业地址
  private String location;
  //污染物级别
  private String pollutantLevel;
  //经度
  private String longitude;
  //纬度
  private String latitude;
  //2019重点排污单位
  private String keyPolluters;
  //电子邮箱
  private String email;
  //邮政编码

  private String postCode;
  //通讯地址
  private String mailAddress;
  //传真
  private String fax;


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }


  public String getArea() {
    return area;
  }

  public void setArea(String area) {
    this.area = area;
  }


  public String getImportantLevel() {
    return importantLevel;
  }

  public void setImportantLevel(String importantLevel) {
    this.importantLevel = importantLevel;
  }


  public String getContactor() {
    return contactor;
  }

  public void setContactor(String contactor) {
    this.contactor = contactor;
  }


  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }


  public String getOperation() {
    return operation;
  }

  public void setOperation(String operation) {
    this.operation = operation;
  }


  public String getUpdateTime() {
    return updateTime;
  }

  public void setUpdateTime(String updateTime) {
    this.updateTime = updateTime;
  }


  public String getFlag() {
    return flag;
  }

  public void setFlag(String flag) {
    this.flag = flag;
  }


  public String getShortName() {
    return shortName;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }


  public String getCommunityCode() {
    return communityCode;
  }

  public void setCommunityCode(String communityCode) {
    this.communityCode = communityCode;
  }


  public String getRepresentative() {
    return representative;
  }

  public void setRepresentative(String representative) {
    this.representative = representative;
  }


  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }


  public String getPollutantLevel() {
    return pollutantLevel;
  }

  public void setPollutantLevel(String pollutantLevel) {
    this.pollutantLevel = pollutantLevel;
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


  public String getKeyPolluters() {
    return keyPolluters;
  }

  public void setKeyPolluters(String keyPolluters) {
    this.keyPolluters = keyPolluters;
  }


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }


  public String getPostCode() {
    return postCode;
  }

  public void setPostCode(String postCode) {
    this.postCode = postCode;
  }


  public String getMailAddress() {
    return mailAddress;
  }

  public void setMailAddress(String mailAddress) {
    this.mailAddress = mailAddress;
  }


  public String getFax() {
    return fax;
  }

  public void setFax(String fax) {
    this.fax = fax;
  }

}

package com.grkj.modules.sys.entity;

import java.io.Serializable;

import javax.persistence.Table;
@Table(name="")
public class Weather implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String weatherconditions;//天气状况
	private String temperature;//当前温度
	private String airquality;//空气质量
	private String aqi;//AQI
	private String windscale;//风级
	private String relativehumidity;//相对湿度
	private String turnovertime;//更新时间
	private String primaryPollutantName;//首要污染物名称
	private Double primaryPollutantValue;//首要污染物值
	public String getWeatherconditions() {
		return weatherconditions;
	}
	public void setWeatherconditions(String weatherconditions) {
		this.weatherconditions = weatherconditions;
	}
	public String getTemperature() {
		return temperature;
	}
	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}
	public String getAirquality() {
		return airquality;
	}
	public void setAirquality(String airquality) {
		this.airquality = airquality;
	}
	public String getAqi() {
		return aqi;
	}
	public void setAqi(String aqi) {
		this.aqi = aqi;
	}
	public String getWindscale() {
		return windscale;
	}
	public void setWindscale(String windscale) {
		this.windscale = windscale;
	}
	public String getRelativehumidity() {
		return relativehumidity;
	}
	public void setRelativehumidity(String relativehumidity) {
		this.relativehumidity = relativehumidity;
	}
	public String getTurnovertime() {
		return turnovertime;
	}
	public void setTurnovertime(String turnovertime) {
		this.turnovertime = turnovertime;
	}
	public String getPrimaryPollutantName() {
		return primaryPollutantName;
	}
	public void setPrimaryPollutantName(String primaryPollutantName) {
		this.primaryPollutantName = primaryPollutantName;
	}
	public Double getPrimaryPollutantValue() {
		return primaryPollutantValue;
	}
	public void setPrimaryPollutantValue(Double primaryPollutantValue) {
		this.primaryPollutantValue = primaryPollutantValue;
	}
	
	
}

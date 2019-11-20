package com.grkj.modules.sys.serviceImpl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.PostConstruct;

import com.grkj.lib.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.grkj.common.base2.impl.service.BaseMapperCurdService;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.utils.PropertiesLoader;
import com.grkj.modules.sys.entity.SysSetting;
import com.grkj.modules.sys.mapper.SettingMapper;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

/**
 * 系统设置服务类
 * @author wangq by 2019年9月2日
 *
 */
@Service
public class SettingService implements BaseMapperCurdService<SysSetting>{
	
	public static List<SysSetting> baseSettings = Lists.newArrayList();
	
	@Autowired
	private Environment env;
	
	@Autowired
	private SettingMapper mapper;
	
	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Value("${app.scope}")
	private String scope;
	
	@Override
	public Mapper<SysSetting> getMapper() {
		return mapper;
	}
	
	/**
	 * 启动和定时5分钟加载配置信息
	 */
	@PostConstruct
	@Scheduled(fixedDelay = 5*60*1000)
	public void loadSettings() {
		synchronized (baseSettings) {
			baseSettings = getBaseSettings("1");
			List<Map<String, Object>> systemConfigs = getSystemConfigs();
			for(Map<String, Object> map : systemConfigs) {
				Object config = map.get("config");
				Object value = map.get("value");
				SysSetting setting = new SysSetting();
				setting.setConfig((String) config);
				setting.setValue((String) value);
				setting.setScope(scope);
				baseSettings.add(setting);
			}
		}
	}
	
	public static String getConfig(String config) {
		for(SysSetting setting : baseSettings) {
			if(setting.getConfig().equalsIgnoreCase(config)) {
				return setting.getValue();
			}
		}
		return null;
	}
	
	/**
	 * 搜索关键字
	 */
	@Override
	public List<SysSetting> getList(Object param) {
		Example example = new Example(SysSetting.class);
		Criteria cr = example.createCriteria();
		Map<String, Object> paramMap = (Map<String,Object>) param;
		if(StringUtils.isNotBlank((String)paramMap.get("scope"))) {
			cr.andEqualTo("scope",paramMap.get("scope"));
		}
		if(StringUtils.isNotBlank((String)paramMap.get("config"))) {
			cr.andLike("config","%"+paramMap.get("config")+"%");
		}
		if(StringUtils.isNotBlank((String)paramMap.get("flag"))) {
			cr.andEqualTo("flag",paramMap.get("flag"));
		}
		example.setOrderByClause("config");
		return mapper.selectByExample(example);
	}
	
	/**
	 * 获得系统参数
	 * @return
	 */
	public List<Map<String, Object>> getSystemConfigs() {
		String[] profiles = env.getActiveProfiles();
		if(profiles==null || profiles.length<=0)
			return null;
		Hashtable<String, Object> tmpConfig = new Hashtable<>();
		PropertiesLoader propertiesLoader=new PropertiesLoader("classpath:/config/application.properties");
		if(propertiesLoader!=null) {
			Properties props = propertiesLoader.getProperties();
			for(Object key:props.keySet()){
				Object temp = props.get(key);
				if(temp!=null){
					tmpConfig.put(key.toString(),temp.toString());
				}
			}
		}
		for(String item :profiles){
			PropertiesLoader profileLoader=new PropertiesLoader("classpath:/config/application-"+item+".properties");
			if(profileLoader!=null) {
				Properties props = profileLoader.getProperties();
				for(Object key:props.keySet()){
					Object temp = props.get(key);
					if(temp!=null){
						tmpConfig.put(key.toString(),temp.toString());
					}
				}
			}
		}
		ArrayList<String> list = Lists.newArrayList(tmpConfig.keySet());
		list.sort(new Comparator<String>() {
			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});
		List<Map<String,Object>> configs = Lists.newArrayList();
		for(String key : list) {
			Map<String,Object> config = new HashMap<String, Object>();
			config.put("config",key);
			config.put("value", tmpConfig.get(key));
			configs.add(config);
		}
		return configs;
	}

	/**
	 * 获得本作用域的参数
	 * @param flag
	 * @return
	 */
	public List<SysSetting> getBaseSettings(String flag) {
		Example example = new Example(SysSetting.class);
		Criteria criteria = example.createCriteria();
		if(StringUtils.isNotBlank(flag)) {
			criteria.andEqualTo("flag", flag);
		}
		if(StringUtils.isNotBlank(scope)) {
			criteria.andEqualTo("scope",scope);
		}
		return mapper.selectByExample(example);
	}
	
	/**
	 * 重写入库触发函数
	 */
	@Override
	public boolean preInsert(SysSetting data) {
		if(StringUtils.isBlank(data.getPkid())) {
			data.setPkid(keyGenerator.getNext());
		}
		if(StringUtils.isBlank(data.getFlag())) {
			data.setFlag("1");
		}
		if(data.getInsertTime()==null) {
			data.setInsertTime(new Date());
		}
		return BaseMapperCurdService.super.preInsert(data);
	}
	
	/**
	 * 重写更新前触发函数
	 */
	@Override
	public boolean preUpdate(SysSetting data) {
		if(StringUtils.isNotBlank(data.getPkid())) {
			SysSetting oldData = this.getById(data.getPkid());
			data.setOldValue(oldData.getValue());
		}
		data.setUpdateTime(new Date());
		return BaseMapperCurdService.super.preUpdate(data);
	}
	
	@Override
	public void afterDelete(Object id) {
		loadSettings();
		BaseMapperCurdService.super.afterDelete(id);
	}
	
	@Override
	public void afterUpdate(SysSetting data) {
		loadSettings();
		BaseMapperCurdService.super.afterUpdate(data);
	}
	
	@Override
	public void afterInsert(SysSetting data) {
		loadSettings();
		BaseMapperCurdService.super.afterInsert(data);
	}

}

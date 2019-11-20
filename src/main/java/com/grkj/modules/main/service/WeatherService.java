package com.grkj.modules.main.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import com.grkj.modules.sys.entity.Weather;

/**
 * 获取天气信息（可修改成传参形式）
* @ClassName: WeatherController  
* @Description: TODO(这里用一句话描述这个类的作用)  
* @author chenl  
* @date 2019年7月4日  
*
 */
@Service
public class WeatherService {

	public Weather getWeather(){
		Weather w = new Weather();
		try {
	    	String htmlByUrl = getHtmlByUrl("https://tianqi.moji.com/weather/china/shanxi/taiyuan");
	    	if(htmlByUrl!=null&&!"".equals(htmlByUrl)) {
	            //解析内容
	    		Document doc = Jsoup.parse(htmlByUrl);
	    		Elements select = doc.select(".left");
	    		Element element = select.get(0);
	    		w.setAqi(element.select(">div").get(0).select(">ul >li >a >em").text().split(" ")[0]);
	    		w.setAirquality(element.select(">div").get(0).select(">ul >li >a >em").text().split(" ")[1]);
	    		w.setTemperature(element.select(">div").get(1).select(">em").text()+"℃");
	    		w.setWeatherconditions(element.select(">div").get(1).select(">b").text());
	    		w.setRelativehumidity(element.select(">div").get(2).select(">span").text().substring(2).trim());
	    		w.setWindscale(element.select(">div").get(2).select(">em").text());
	    		String text = element.select(">div").get(1).select(">strong").text();
	    		int k = 0;
	    		for(int i=0;i<text.length();i++){
	    		        char a = text.charAt(i);
	    		        if(a>='0' && a<='9'){
	    		               k=i;
	    		                break;
	    		        }
	    		    }
	    		w.setTurnovertime(text.substring(k));
	        }
	    	String htmlByUrl1 = getHtmlByUrl("https://tianqi.moji.com/aqi/china/shanxi/taiyuan");
	    	if(htmlByUrl1!=null&&!"".equals(htmlByUrl1)) {
	    		Map<String,Double> map=new HashMap<>();
	    		Map<String,Double> map1=new HashMap<>();
	    		//解析内容
	    		Document doc = Jsoup.parse(htmlByUrl1);
	    		Elements select = doc.select(".aqi_info_item .clearfix >li");
	    		//System.out.println(select.size());
	    		Double d=0.0;
	    		for(int i=0;i<select.size();i++) {
	    			Element element = select.get(i);
	    			String em = element.select(">em").text();
	    			Double span = Double.valueOf(element.select(">span").text());
	    			//System.out.println(em+"====="+span);
	    			if(span>d) {
    	        		map.clear();
    	        		d=span;
    	        		map.put(em, span);
    	        	}
	    		}
	    		Set <String> set=map.keySet();
    	        for(String key:set){
    	        	Double value=map.get(key);
    	        	w.setPrimaryPollutantName(key);
    	        	w.setPrimaryPollutantValue(value);
    	        }
	    	}
	    	
    	}catch (Exception e) {
			e.printStackTrace();
		}
		return w;
	}
	/**
     * 根据URL获得所有的html信息
     * @param url
     * @return
	 * @throws IOException 
	 * @throws ClientProtocolException 
     */
	public String getHtmlByUrl(String url) throws ClientProtocolException, IOException{
        String html = null;
        //创建httpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        //以get方式请求该URL
        HttpGet httpget = new HttpGet(url);
        CloseableHttpResponse response = httpClient.execute(httpget);
        try {
            //得到responce对象
            //HttpResponse responce = httpClient.execute(httpget);
            //返回码
            int resStatu = response.getStatusLine().getStatusCode();
            if (resStatu==HttpStatus.SC_OK) {//200正常  其他就不对
                //获得输入流
                InputStream entity = response.getEntity().getContent();
                if (entity!=null) {
                    //通过输入流转为字符串获得html源代码  注：可以获得实体，然后通过 EntityUtils.toString方法获得html
                	//但是有可能出现乱码，因此在这里采用了这种方式
                    html=getStreamString(entity);
                    // System.out.println(html);
                }
            }
        } catch (Exception e) {
            //System.out.println("访问【"+url+"】出现异常!");
            e.printStackTrace();
        } finally {
            //httpClient.getConnectionManager().shutdown();
            response.close();
            try {
				httpClient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
        }
        return html;
    }
	
	 public String getStreamString(InputStream tInputStream){
	        if (tInputStream != null){
	        try{
		        BufferedReader tBufferedReader = new BufferedReader(new InputStreamReader(tInputStream,"utf-8"));
		        StringBuffer tStringBuffer = new StringBuffer();
		        String sTempOneLine = new String("");
	        while ((sTempOneLine = tBufferedReader.readLine()) != null){
	                tStringBuffer.append(sTempOneLine+"\n");
	        }
	            return tStringBuffer.toString();
	        }catch (Exception ex){
	            ex.printStackTrace();
	        }
	       }
	         return null;
	    }
}

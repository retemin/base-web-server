package com.grkj.modules.sys.filter;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ReadListener;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.modules.sys.entity.RequestLog;
import com.grkj.modules.sys.serviceImpl.RequestLogService;
import com.grkj.modules.sys.utils.UserUtils;

/**
 * 对有所操作进行拦截(在shiro之后),并记录信息
 * @author binzec
 */
public class OperateFilter implements Filter {
	
	private String contextPath=null;

	@Autowired
	private KeyGenerator<String> keyGenerator;
	
	@Autowired
	private RequestLogService menuLogService;
	
	
	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {
		//SysFilterLog filterLog = new SysFilterLog();
		// TODO Auto-generated method stub
		HttpServletRequest request = (HttpServletRequest) arg0;
		if(contextPath==null){
			contextPath=request.getContextPath();
		}
		String uri = request.getRequestURI();
		// 静态文件加载过滤掉
		if (!uri.startsWith(contextPath+"/WEB-INF") && !uri.startsWith(contextPath+"/static")) {
	        
	        RequestLog log=new RequestLog();
	        log.setId(keyGenerator.getNext());
	        String date_ = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
	        log.setId(keyGenerator.getNext());
	        //log.setTitle("系统访问日志");
	        log.setRequestUri( request.getRequestURI() );
			log.setCreateBy( UserUtils.getUser()!=null?UserUtils.getUser().getLoginName():"系统用户没有登录访问"  );
			log.setCreateDate( date_ );
			log.setMethod(request.getMethod());
			log.setUserAgent(request.getHeader("User-Agent").toLowerCase());
			if(!uri.toLowerCase().contains("upload")) {
				ByteRequestWrapper byteRequestWrapper = new ByteRequestWrapper(request);
		        String jsonRequestString = new String(byteRequestWrapper.getBody(),"UTF-8");
		        request=byteRequestWrapper;
				log.setParams(getQueryString(request)+"\r\n"+jsonRequestString);
			}else {
				log.setParams(getQueryString(request));
			}
			
			log.setRemoteAddr(getIpAddress(request));
			menuLogService.insert(log);
			
			arg2.doFilter(request, arg1);
		}else{
			arg2.doFilter(arg0, arg1);
		}
	}
	
	 public static String getIpAddress(HttpServletRequest request) {  
	        String ip = request.getHeader("X-Real-IP");  
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        	 ip = request.getRemoteAddr();  
	        }  
	        return ip;  
	}  
	 
	 private String getQueryString(HttpServletRequest request){
		 Enumeration<String> names = request.getParameterNames();
		 StringBuffer result=new StringBuffer();
		 while(names.hasMoreElements()){
			 String name=names.nextElement();
			 
			 result.append(name);
			 result.append("=");
			 String[] values = request.getParameterValues(name);
			 if(values.length==1){
				 result.append(values[0]);
			 }else if(values.length>1){
				 for(String value:values){
					 result.append(value);
					 result.append(",");
				 }
				 result.deleteCharAt(result.length()-1);
			 }
			 result.append("&");
		 }
		 if(result.length()>2){
			 result.deleteCharAt(result.length()-1);
		 }
		 return result.toString();
	 }
	 

	
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}
	
	@Override
	public void destroy() {
		
	}
	
	public static class ByteRequestWrapper extends HttpServletRequestWrapper {
		private byte[] body;
		public byte[] getBody() {
			return body;
		}
		public ByteRequestWrapper(HttpServletRequest request) {
			super(request);
			try {
				body = IOUtils.toByteArray(request.getInputStream());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		@Override  
	    public BufferedReader getReader() throws IOException {  
	        return new BufferedReader(new InputStreamReader(getInputStream()));  
	    }  
	    @Override  
	    public ServletInputStream getInputStream() throws IOException {  
	        final ByteArrayInputStream bais = new ByteArrayInputStream(body);  
	        return new ServletInputStream() {  
	            @Override  
	            public int read() throws IOException {  
	                return bais.read();  
	            }
				@Override
				public boolean isFinished() {
					return false;
				}
				@Override
				public boolean isReady() {
					return true;
				}
				@Override
				public void setReadListener(ReadListener listener) {}  
	        };  
	    } 
    }
}
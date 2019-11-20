package com.grkj.common.keyGenerator;

import java.util.Date;
import java.util.HashSet;

import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.utils.DateUtils;

/**
 * 22位的主键生成器 精确到毫秒的17位格式时间+3位全局循环递增顺序码+2位全局循环递减顺序码
 * @author jiabinl
 *
 */
public class Time22KeyGenerator implements KeyGenerator<String> {

	/**
	 * 全局循环顺序码，每次获取递增，超过999重新设置为0
	 */
	private static volatile int loopCount=0;
	/**
	 * 全局循环顺序码，每次获取递减，大于0重新设置为99
	 */
	private static volatile int loop2Count=99;
	
	public Time22KeyGenerator(){
	}
	

	@Override
	public String getNext(String type) {
		return DateUtils.formatDate(new Date(), "yyyyMMddHHmmssSSS")+
				String.format("%03d",loopCount>998?loopCount=0:++loopCount)+
				String.format("%02d",loop2Count>0?--loop2Count:(loop2Count=99));
	}
	
	@Override
	public String getNext() {
		return getNext(null);
	}
	

	
	public static void main(String[] args) {
		Time22KeyGenerator kg = new Time22KeyGenerator();
		HashSet<String> set=new HashSet<String> ();
		for(int i=0;i<100;i++) {
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					long j=1000000000L;
					while(j-->0) {
						String key = kg.getNext();
						//System.out.println(key);
						if(set.contains(key)) {
							System.err.println(key);
						}
					}
					
				}
			}).start();;
			
		}
//		int t=0;
//		for(int i=0;i<100;i++)
//			System.out.println(t>8?t=0:++t);
	}


}

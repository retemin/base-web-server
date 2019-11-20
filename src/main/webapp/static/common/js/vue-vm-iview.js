 	Vue.component('vm-table', {
		props: ['url','params','initSidx','initSord','pageSizeOpts','height','loadDataFunc'],
		inheritAttrs: false,
		template:'<div class="vm-table"> \
 				<i-Table border v-bind="$attrs" :height="tableHeight" :data="data.rows" @on-sort-change="sortCols"></i-Table> \
 	 			<div class="vm-table-page"> \
 				<Page   :total="data?data.records:0" :page-size-opts="displayOpts.pageSizeOpts" :page-size="pageParam.rows" placement="top" :current="pageParam.page" \
 	 				@on-page-size-change="onPageSizeChange" @on-change="onPageChange"	\
 	 				size="small" show-elevator show-sizer show-total ></Page> \
 	 			</div>\
			</div>',
		data:function(){
			return {
				data:[],
				pageParam:{
					page:1,
					rows:15,
					sidx:this.initSidx,
					sord:this.initSord
				},
				displayOpts:{
					pageSizeOpts:this.pageSizeOpts?this.pageSizeOpts:[1,10,15,30,60,100,500,1000]
				}
			}
		},
		methods:{
			'sortCols':function(sortParam){
				this.pageParam.sidx=sortParam.column.index;
				this.pageParam.sord=sortParam.order;
				this.loadData();
				
			},
			'loadData':function(){
				var _this=this;
				var req={};
				$.extend(req,this.pageParam,this.params);
				if(!this.loadDataFunc){
					$.ajax({
		        		url:_this.url,
		        		data:req,
		        		type:_this.requestType?_this.requestType:'get',
		        		dataType:'json',
		        		success:function(data, textStatus){
		        			_this.$emit('dataRelodCompleted',data);
			        		_this.data=data;	
		        		},error:function(XMLHttpRequest, textStatus, errorThrown){
		        			_this.$emit('dataReloadError',textStatus);
		        		}
		        	});
				}else{
					this.loadDataFunc(req,function(){
						_this.emit('dataReloadCompleted',data);
		        		_this.data=datea;
					},function(e){
						_this.emit('dataReloadError',XMLHttpRequest);
					});
				}
			},
			'onPageChange':function(page){
				this.pageParam.page=page;
				this.loadData();
			},
			'onPageSizeChange':function(pageSize){
				this.pageParam.rows=pageSize;
				this.loadData();
			}
		},mounted:function(){
			this.loadData({page:1,rows:15});
		},
		computed:{
			tableHeight:function(){
				return this.height?(this.height-36.2):0;
			}
		}
	}); 
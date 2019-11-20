/**
 * VUEJS 公司公用组件库
 * @author jiabinl
 * jianyud 修改
 * @date 2017-01-16
 * @version 0.1-beta
 * jiabinl 20171013 edited:增加 filters功能
 */


var _idCount=0;
Vue.mixin({
	data:{
		code:{
			yesOrNoCode : [ 
				{"name" : "是","value" : "1"},
				{"name" : "否","value" : "0"}
			]
		}
	},
	methods:{
		upperCaseFilter:function(value){
			if(value&&value.toUpperCase){
				return value.toUpperCase();
			}else{
				return value;
			}
		},
		lowerCaseFilter:function(value){
			if(value&&value.toUpperCase){
				return value.toLowerCase();
			}else{
				return value;
			}
		},
		_isDefined:function(obj){
			return obj!=null&&obj!=undefined;
		},
		_isNotEmpty:function(obj){
			if(typeof obj =='string'){
				return obj!=null&&obj!=undefined&&obj!='';
			}else if(typeof obj =='object'){
				return obj!=null&&obj!=undefined&&JSON.stringify(obj)!="{}";
			}else if(typeof obj =='array'){
				return obj!=null&&obj!=undefined&&obj.length>0;
			}else{
				return obj!=null&&obj!=undefined;
			}
		},
		_isNotEmptyArray:function(obj){
			return obj!=null&&obj!=undefined&&obj.length>0;
		},
		// 判断浏览器是Ie还是谷歌
		_getBrowserType:function (){
			var explorer =navigator.userAgent ;
			if (explorer.indexOf("MSIE") >= 0) {// IE浏览器
				  return "IE";
			}else if(explorer.indexOf("Chrome") >= 0){// 谷歌
				 return "Chrome";
			}else{
				 return "other";
			}
		}
	}
});
Vue.filter('upperCaseFilter', function (value) {
	if(value&&value.toUpperCase){
		return value.toUpperCase();
	}else{
		return value;
	}
});
Vue.filter('lowerCaseFilter', function (value) {
	if(value&&value.toUpperCase){
		return value.toLowerCase();
	}else{
		return value;
	}
});

/**
 * input组件 
 *  canEdit 是否可编辑
 */

Vue.component('vm-input', {
	props: ['value','name','readonly','canEdit','filters'],
	template:'<input v-if="canEdit!=\'false\'" ref="input"  class="form-control data-input input-sm" \
					:value="value" \
					:name="name" \
					:readonly="readonly" \
		  			@input="updateValue($event.target.value)"\
					@focus="handleFocus"\
					@click="handleClick" \
					@keyup="handlerKeyup"\
					@change="handlerChange"\
		     />\
		     <label v-else class="can-edit-label">{{value}}</label>',
	methods:{
		updateValue: function (value) {
		    this.$emit('input', this._filterValue(value));
		},
		handleFocus:function(event) {
			this.$emit('focus', event);
		},
		handleClick:function(event) {
			this.$emit('click', event);
		},
		handlerKeyup:function(event){
			this.$emit('keyup', event);
		},
		handlerChange:function(event){
			this.$emit('change', event);
		},
		_filterValue:function(value){
			if(this.filters){
				if(typeof this.filters =="function"){
					value=this.filters(value);
				}else if(typeof this.filters=='string'){
					var filterList=this.filters.split('|');
					for(var i in filterList){
						if(typeof this[filterList[i]]=='function'){
							value=this[filterList[i]](value);
						}
					}
				}
				return value;
			}else{
				return value;
			}
		}
	}
});

/**
 * 带label的input组件
 */
Vue.component('vm-label-input', {
	props: ['value','name','readonly','label','grid','labelGrid','itemGrid','canEdit'],
	template:'<div :class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label :class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-4\')">{{label}}</label>\
		<div  :class="(itemGrid?itemGrid:\'col-sm-8\')">\
			<vm-input \
					:value="value" \
					:name="name" \
					:readonly="readonly" \
					:can-edit="canEdit"\
		  			@input="updateValue($event)" >\
		     </vm-input>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
});

/**
 * 带搜索按钮的input组件
 * canEdit 是否可编辑
 * btnclass button的class
 * icon 按钮图标class
 * btntext 按钮名字
 * click 点击方法
 */
Vue.component('vm-btn-input', {
	props: ['value','name','readonly','canEdit','btnclass','icon','btntext','click'],
	template:'<div v-if="canEdit!=\'false\'" class="input-group">\
			<vm-input \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				@input="updateValue($event)" >\
			</vm-input>\
		<span class="input-group-btn">\
		<button :class="\'btn \'+(btnclass?btnclass:\'btn-outline btn-danger\')" type="button":onclick="click">\
		<i :class="\'fa \'+(icon?icon:\'fa-search\')"></i>&nbsp;{{(btntext?btntext:"搜索")}}</button></span> \
		</div>\
		<label v-else style="text-align:left;font-weight:normal;display:block;">{{value}}</label>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
});

/**
 * 带label和remark的input组件
 */
Vue.component('vm-label-remark-input', {
	props: ['value','name','readonly','label','remark','grid','labelGrid','itemGrid','remarkGrid','canEdit'],
	template:'<div v-if="canEdit!=\'false\'"  :class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label :class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-2\')">{{label}}</label>\
		<div :class="(itemGrid?itemGrid:\'col-sm-6\')">\
			<vm-input \
					:value="value" \
					:name="name" \
					:readonly="readonly" \
		  			@input="updateValue($event)" >\
		     </vm-input>\
		</div>\
		<div :class="(remarkGrid?remarkGrid:\'col-sm-4\')">\
			<p class="text-left">{{remark}}</p>\
		</div>\
	</div>\
	<div v-else :class="\'form-group  \'+(grid?grid:\'col-sm-12\')">\
		<label :class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-2\')">{{label}}</label>\
		<div :class="(itemGrid?itemGrid:\'col-sm-6\')">\
			<label style="text-align:left;font-weight:normal;display:block;">{{value}}</label>\
		</div>\
		<div :class="(remarkGrid?remarkGrid:\'col-sm-4\')">\
			<p class="text-left">{{remark}}</p>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
	
});

/**
 * select组件
 */
Vue.component('vm-select', {
	props: ['value','name','readonly','options','isSimpleOption','canEdit','initIndex','isFirstEmpty','emptyValue','defaultValue'],
	template:'<select v-if="canEdit!=\'false\'"  class="form-control data-select input-sm" \
					:value="value" \
					:name="name" \
				    :readonly="readonly" \
		  			@change="updateValue($event.target.value)"\
		     ><option v-if="isFirstEmpty!=\'false\'" value="">{{emptyValue?emptyValue:\'\'}}</option>\
				<template v-if="isSimpleOption!=\'true\'"> \
					<option v-for="item in options" :value="item.value">{{item.name}}</option> \
				</template> \
				<template v-else> \
					<option v-for="item in options" :value="item">{{item}}</option> \
				</template> \
			</select>\
		<label v-else style="font-weight:normal;display:block;">{{labelValue()}}</label>',
	methods:{
		updateValue: function (value) {
			if(typeof(this.options[0].value)=="boolean"){
				this.$emit('input',value=="true"?true:false);
				this.$emit('change', value=="true"?true:false);
			}else{
				this.$emit('input', value);
				this.$emit('change', value);
			}
		},
		labelValue:function(){
			var name="";
			for(var i=0;i<this.options.length;i++){
				if(this.value==this.options[i].value){
					name=this.options[i].name;
				}
			}
			return name;
		},
		updateOrInitOption:function(){
			//如果有旧值强制update，否则如果需要初始化值则初始化值
			this.$nextTick(function(){
				if(this.options&&this.options.length>0){
					var oldValueFlag=false;
					if(this._isDefined(this.value)){
						for(var i in this.options){
							if(this.isSimpleOption!='true'){
								if(this.options[i]['value']==this.value){
									oldValueFlag=true;
									break;
								}
							}else{
								if(this.options[i]==this.value){
									oldValueFlag=true;
									break;
								}
							}
						}
					}
					if(oldValueFlag){
						this.$forceUpdate();
					}else{
						if(this._isDefined(this.initIndex)&&this._isDefined(this.options[this.initIndex])){
							if(this.isSimpleOption!='true'){
								if(this.options[this.initIndex].value){
									this.updateValue(this.options[this.initIndex].value);
								}
							}else{
								this.updateValue(this.options[this.initIndex]);
							}
						}else{
							this.updateValue('');
						}
					}
				}
			});
		}
	},
	watch:{
		'options':function(value){
			this.updateOrInitOption();
			return value;
		}
	},
	mounted:function(){
		if(!this.value&&this.defaultValue){
			if(this.defaultValue=="_firstItem" && this.options){
				if(this.isSimpleOption!='true'){
					this.$emit('input', this.options[0].value);
				}else{
					this.$emit('input', this.options[0]);
				}
			}else{
				this.$emit('input', this.defaultValue);
			}
		}
	}
	
});



/**
 * 带label的select组件
 */
Vue.component('vm-label-select', {
	props: ['value','name','readonly','label','grid','options','isSimpleOption','labelGrid','itemGrid','canEdit'],
	template:'<div v-if="canEdit!=\'false\'" v-bind:class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label v-bind:class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-4\')">{{label}}</label>\
		<div v-bind:class="(itemGrid?itemGrid:\'col-sm-8\')">\
			<vm-select \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				:options="options" \
				:is-simple-option="isSimpleOption" \
				@input="updateValue($event)" >\
			</vm-select> \
		</div>\
	</div>\
	<div v-else v-bind:class="\'form-group  \'+(grid?grid:\'col-sm-12\')">\
		<label v-bind:class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-4\')">{{label}}</label>\
		<div v-bind:class="(itemGrid?itemGrid:\'col-sm-8\')">\
			<label  style="text-align:left;font-weight:normal;display:block;">{{labelValue()}}</label>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
			this.$emit('input', val);
		},
		labelValue:function(){
			
			//var n=parseInt(this.value);
			var name="";
			for(var i=0;i<this.options.length;i++){
				if(this.value==this.options[i].value){
					name=this.options[i].name;
				}
			}
			return name;
		}
	}
});

/**
 * 带label和remark的select组件
 */
Vue.component('vm-label-remark-select', {
	props: ['value','name','readonly','label','remark','grid','options','isSimpleOption','labelGrid','itemGrid','remarkGrid','canEdit'],
	template:'<div v-if="canEdit!=\'false\'" :class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label :class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-2\')">{{label}}</label>\
		<div :class="(itemGrid?itemGrid:\'col-sm-6\')">\
			<vm-select \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				:options="options" \
				:is-simple-option="isSimpleOption" \
				@input="updateValue($event)" >\
			</vm-select> \
		</div>\
		<div :class="(remarkGrid?remarkGrid:\'col-sm-4\')">\
			<p class="text-left">{{remark}}</p>\
		</div>\
	</div>\
	<div v-else :class="\'form-group  \'+(grid?grid:\'col-sm-12\')">\
		<label :class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-2\')">{{label}}</label>\
		<div :class="(itemGrid?itemGrid:\'col-sm-6\')">\
			<label  style="text-align:left;font-weight:normal;display:block;">{{labelValue()}}</label>\
		</div>\
		<div :class="(remarkGrid?remarkGrid:\'col-sm-4\')">\
		<p class="text-left">{{remark}}</p>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		},
		labelValue:function(){
			
			//var n=parseInt(this.value);
			var name="";
			for(var i=0;i<this.options.length;i++){
				if(this.value==this.options[i].value){
					name=this.options[i].name;
				}
			}
			return name;
		}
	}
	
});


/**
 * textarea组件
 */
Vue.component('vm-textarea', {
	props: ['value','name','readonly','rows','canEdit'],
	template:'<textarea v-if="canEdit!=\'false\'" ref="input"  class="form-control data-area input-sm" \
					:rows="(rows?rows:\'3\')"\
					:value="value" \
					:name="name" \
					:readonly="readonly" \
		  			@input="updateValue($event.target.value)"\
		     ></textarea>\
		<pre  v-else class="can-edit-pre">{{value}}</pre>',
	methods:{
		updateValue: function (value) {
		     this.$emit('input', value);
		}
	},
	computed:{
		isReadonly:function(){
			return this.readonly?true:false;
		}
	}
});

/**
 * 带label的textarea组件
 */
Vue.component('vm-label-textarea', {
	props: ['value','name','readonly','label','grid','labelGrid','itemGrid','rows','canEdit'],
	template:'<div  v-bind:class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label :class="\'control-label  \'+(labelGrid?labelGrid:\'col-sm-2\')">{{label}}</label>\
		<div :class="(itemGrid?itemGrid:\'col-sm-10\')">\
			<vm-textarea \
					:value="value" \
					:rows="rows" \
					:name="name" \
					:readonly="readonly" \
		  			@input="updateValue($event)" >\
		     </vm-textarea>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
});

/**
 * 带label和remark的textarea组件
 */
Vue.component('vm-label-remark-textarea', {
	props: ['value','name','readonly','label','remark','grid','labelGrid','itemGrid','remarkGrid','canEdit'],
	template:'<div  :class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label :class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-2\')">{{label}}</label>\
		<div :class="(itemGrid?itemGrid:\'col-sm-6\')">\
			<vm-textarea \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				@input="updateValue($event)" >\
			</vm-textarea>\
		</div>\
		<div :class="(remarkGrid?remarkGrid:\'col-sm-4\')">\
			<p class="text-left">{{remark}}</p>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
});



/**
 * singlecheck组件
 */
Vue.component('vm-singlecheck', {
	props: ['value','name','readonly','label','id','trueValue','falseValue','canEdit'],
	template:'<div class="magic-checkbox-frame"> \
				<input type="checkbox" \
					:id="domId" \
					:name="name" \
					:readonly="readonly" \
					:disabled="canEdit!=\'false\'?false:true" \
					:value="value" \
					v-model="modelValue" \
					class="magic-checkbox"\
					@change="onItemChange($event.target.value)" \
				/>\
				<label :for="domId">{{label}}</label >\
			  </div>',
	data:function(){
		var data= {
				realTrueValue:(this.trueValue?this.trueValue:"1"),
				realFalseValue:(this.falseValue?this.falseValue:"0"),
				domId:this.id?this.id:'vm-singlecheck_'+(_idCount++)
		}
		return data;
	},
	computed:{
		modelValue:{
			get:function() {
				return this.value==this.realTrueValue;
			},
			set:function(val) {
				if(val){
					this.$emit('input', this.realTrueValue);
				}else{
					this.$emit('input', this.realFalseValue);
				}
			}
		}
	},
	methods:{
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
		}
	}
});

/**
 * 带label的singlecheck组件
 */
Vue.component('vm-label-singlecheck', {
	props: ['value','name','readonly','label','grid','labelGrid','itemFrameGrid'],
	template:'<div v-bind:class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label v-bind:class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-4\')">{{label}}</label>\
		<div v-bind:class="(itemFrameGrid?itemFrameGrid:\'col-sm-8\')">\
			<vm-singlecheck \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				@input="updateValue($event)" >\
				@on-item-change="onItemChange($event)" \
			</vm-singlecheck> \
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
			this.$emit('input', val);
		},
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
		}
	}
});

/**
 * 多选组件
 */
Vue.component('vm-multicheck', {
	props: ['value','name','readonly','options','isSimpleOption','grid','itemGrid',"canEdit"],
	data:function(){
		return {
			domId:this.id?this.id:'vm-multicheck_'+(_idCount++)
		};
	},
	
	template:'<div :id="domId" :style="\'padding-left: 0px;\'"  :class="\'data-multicheck vm-multicheck-frame \'+ (grid?grid:\'col-sm-12\')" \
		     >\
				<template v-if="isSimpleOption!=\'true\'"> \
					<div :style="\'padding-left: 0px;\'" :class="\'magic-checkbox-frame  \'+(itemGrid?itemGrid:\'col-sm-3\')" v-for="(item,index) in options"> \
						<div v-if="canEdit!=\'false\'">\
							<input  type="checkbox" \
									:id="domId+\'item_\'+index"\
									:value="item.value" \
									:name="name" \
									readonly="readonly" \
									v-model="modelValue" \
									class="magic-checkbox" \
									@change="onItemChange($event.target.value)" \
							/> \
							<label :for="domId+\'item_\'+index" \>{{item.name}}</label >\
						</div>\
						<div v-else>\
							<input  type="checkbox" \
							:id="domId+\'item_\'+index"\
							:value="item.value" \
							:name="name" \
							readonly="readonly" \
							disabled\
							v-model="modelValue" \
							class="magic-checkbox" \
							@change="onItemChange($event.target.value)" \
							/> \
							<label disabled :for="domId+\'item_\'+index" \>{{item.name}}</label >\
						</div>\
					</div>\
				</template> \
				<template v-else> \
					<div :class="\'magic-checkbox-frame \'+ (itemGrid?itemGrid:\'col-sm-3\')" v-for="(item,index) in options"> \
						<div v-if="canEdit!=\'false\'">\
							<input type="checkbox" \
								:id="domId+\'item_\'+index"\
								:value="item" \
								:name="name" \
								:readonly="readonly" \
								v-model="modelValue" \
								class="magic-checkbox" \
								@change="onItemChange($event.target.value)" \
							/> \
							<label :for="domId+\'item_\'+index">{{item}}</label >\
						</div>\
						<div v-else>\
							<input type="checkbox" \
								:id="domId+\'item_\'+index"\
								:value="item" \
								:name="name" \
								:readonly="readonly" \
								disabled\
								v-model="modelValue" \
								class="magic-checkbox" \
								@change="onItemChange($event.target.value)" \
							/> \
							<label disabled\ :for="domId+\'item_\'+index">{{item}}</label >\
						</div>\
					</div>\
				</template> \
			</div>',
	computed:{
		modelValue:{
			get:function() {
		         return this.value;
		    },
		    set:function(val) {
		    	this.$emit('input', val);
		    }
		}
	},
	methods:{
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
		}
	}
});


/**
 * 不带label的multicheck组件
 * 传字符串和输出字符串
 */

Vue.component('vm-multicheck-stringval', {
	props: ['value','name','readonly','label','grid','options','isSimpleOption','itemGrid','separator',"canEdit"],
	template:'<vm-multicheck \
				  :value="realValue" \
				  :options="options" \
				  :readonly="readonly"\
				  :item-grid="itemGrid"\
				  :grid="grid"\
		          :is-simple-option="isSimpleOption" \
				  :can-edit="canEdit"\
		          @input="updateValue($event)" >\
		          @on-item-change="onItemChange($event)" \
		      </vm-multicheck>',
	methods:{
		  updateValue: function (val) {
		  		this.$emit('input', this.transferData(val));
		  },
		  onItemChange: function (val) {
		  		this.$emit('on-item-change', this.transferData(val));
		  },
		  transferData:function(newValue){
			  var a="";
			  if(this.separator){
				  for(var i in newValue){
					  a=a+this.separator+newValue[i];
				  }
				  
			  }else{
				  for(var i in newValue){
					  a=a+","+newValue[i];
				  }
			  }
			  a?a=a.substring(this.separator.length):'';
			  return a;
		  }
	},
	computed:{
		realValue : function(){
			if(this.separator){
				return this.value?this.value.split(this.separator):[];
			}else{
				
				return this.value?this.value.split(','):[];
			}
			
		}
	}
		      
});



/**
 * 带label的multicheck组件
 */
Vue.component('vm-label-multicheck', {
	props: ['value','name','readonly','label','grid','options','isSimpleOption','labelGrid','itemFrameGrid','itemGrid',"canEdit"],
	template:'<div v-bind:class="\'form-group \'+  (grid?grid:\'col-sm-12\')"> \
		<label v-bind:class="\'control-label \'+ (labelGrid?labelGrid:\'col-sm-3\')">{{label}}</label>\
		<div v-bind:class="(itemFrameGrid?itemFrameGrid:\'col-sm-9\')">\
			<vm-multicheck \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				:options="options" \
				:item-grid="itemGrid"\
				:label-grid="labelGrid"\
				:item-frame-grid=itemFrameGrid\
				:is-simple-option="isSimpleOption" \
				:can-edit="canEdit" \
				@input="updateValue($event)" >\
				@on-item-change="onItemChange($event)" \
			</vm-multicheck> \
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
			this.$emit('input', val);
		},
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
		}
	}
});

/**
 * 带label的multicheck组件
 * 传字符串和输出字符串
 */
Vue.component('vm-label-multicheck-stringval', {
	props: ['value','name','readonly','label','grid','options','isSimpleOption','labelGrid','itemFrameGrid','itemGrid','separator',"canEdit"],
	template:'<vm-label-multicheck \
				  :value="realValue" \
				  :label="label" \
				  :options="options" \
				  :item-grid="itemGrid"\
				  :label-grid="labelGrid"\
				  :readonly="readonly"\
				  :item-frame-grid=itemFrameGrid\
				  :can-edit="canEdit"\
				  :grid="grid"\
		          :is-simple-option="isSimpleOption" \
		          @input="updateValue($event)" >\
		          @on-item-change="onItemChange($event)" \
		      </vm-label-multicheck>',
	methods:{
		  updateValue: function (val) {
		  		this.$emit('input', this.transferData(val));
		  },
		  onItemChange: function (val) {
		  		this.$emit('on-item-change', this.transferData(val));
		  },
		  transferData:function(newValue){
			  var a="";
			  if(this.separator){
				  for(var i in newValue){
					  a=a+this.separator+newValue[i];
				  }
				  
			  }else{
				  for(var i in newValue){
					  a=a+","+newValue[i];
				  }
			  }
			  a?a=a.substring(this.separator.length):'';
			  return a;
		  }
	},
	computed:{
		realValue : function(){
			if(this.separator){
				return this.value?this.value.split(this.separator):[];
			}else{
				
				return this.value?this.value.split(','):[];
			}
			
		}
	}
		      
});


/**
 * radio组件
 */
Vue.component('vm-radio', {
	props: ['value','name','readonly','options','isSimpleOption','grid',"iconClass",'itemGrid','canEdit','defaultValue'],
	data:function(){
		return {
			domId:this.id?this.id:'vm-multicheck_'+(_idCount++)
		};
	},
	template:'<div :id="domId" v-if="canEdit!=\'false\'"  :class="\'data-radio vm-radio-frame \'+(grid?grid:\'col-sm-12\')" \
		     >\
				<template v-if="isSimpleOption!=\'true\'"> \
					<div :class="\'magic-radio-frame \'+(itemGrid?itemGrid:\'col-sm-3\')" v-for="(item,index) in options"> \
						<input type="radio" \
								:id="domId+\'item_\'+index"\
								:name="name" \
								:disabled="readonly" \
								:value="item.value" \
								v-model="modelValue" \
								:class="iconClass?iconClass:\'magic-radio\'" \
								@change="onItemChange($event.target.value)" \
						/> \
						<label :for="domId+\'item_\'+index">{{item.name}}</label >\
					</div>\
				</template> \
				<template v-else> \
					<div :class="\'magic-radio-frame \'+(itemGrid?itemGrid:\'col-sm-6\')" v-for="(item,index) in options"> \
						<input type="radio" \
							:id="domId+\'item_\'+index"\
							:name="name" \
							disabled="readonly" \
							:value="item" \
							v-model="modelValue" \
							:class="iconClass?iconClass:\'magic-radio\'" \
							@change="onItemChange($event.target.value)" \
						/> \
						<label :for="domId+\'item_\'+index">{{item}}</label >\
					</div>\
				</template> \
			</div>\
		 	<label v-else class="can-edit-label">{{nameValue}}</label>',
	computed:{
		modelValue:{
			get:function() {
		         return this.value;
		    },
		    set:function(val) {
		    	this.$emit('input', val);
		    }
		},
		nameValue:function(){
			for(var i in this.options){
				if(this.value==this.options[i].value){
					return this.options[i].name
				}
			}
			
		}
	},
	methods:{
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
			this.$emit('change', this.value);
		}
	},
	mounted:function(){
		if(!this.value&&this.defaultValue){
			if(this.defaultValue=="_firstItem" && this.options){
				if(this.isSimpleOption!='true'){
					this.$emit('input', this.options[0].value);
				}else{
					this.$emit('input', this.options[0]);
				}
			}else{
				this.$emit('input', this.defaultValue);
			}
		}
	}
});




/**
 * 带label的radio组件
 */
Vue.component('vm-label-radio', {
	props: ['value','name','readonly','label','grid','options','isSimpleOption','labelGrid','itemFrameGrid','itemGrid'],
	template:'<div v-bind:class="\'form-group  \'+(grid?grid:\'col-sm-12\')"> \
		<label v-bind:class="\'control-label \'+(labelGrid?labelGrid:\'col-sm-3\')">{{label}}</label>\
		<div v-bind:class="(itemFrameGrid?itemFrameGrid:\'col-sm-9\')">\
			<vm-radio \
				:value="value" \
				:name="name" \
				:readonly="readonly" \
				:options="options" \
				:item-grid="itemGrid"\
				:is-simple-option="isSimpleOption" \
				@input="updateValue($event)" >\
				@on-item-change="onItemChange($event)" \
			</vm-radio> \
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
			this.$emit('input', val);
		},
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
		}
	}
});

/**
 * 用户选择组件
 */
Vue.component('vm-user-input', {
	props: ['value','name','grid','readonly'],
	template:'<div class="input-group"> \
				<vm-input \
					:value="value.value" \
					:name="name" \
					:readonly="readonly" \
		 			>\
				</vm-input>\
				<vm-input \
					:value="value.name" \
					:readonly="readonly" \
				>\
				</vm-input>\
    			<span class="input-group-btn">\
    				<button class="btn btn-danger" type="button"  @click="selectUser">\
    					<i class="glyphicon glyphicon-user"></i>\
    				</button>\
    			</span>\
    		  </div>',
	
	methods:{
		updateValue: function (value) {
		    this.$emit('input', value);
		},
		updateNameValue: function (value) {
		    this.$emit('input', value);
			//this.nameValue=value;
		},
		selectUser:function(event){
			_this=this;
			$.CommonData.data.userSelect({
				'onConfirm':function(data){
					var userStr="";
					var userNameStr="";
					//_this.value=data;
					for(var i in data){
						if(!data[i].isParent){
							userStr+=data[i].id+";";
							userNameStr+=data[i].name+";";
						}
					}
					_this.$emit('input', {'value':userStr,'userNameStr':userNameStr});
				}
			});
		   
		}
	}
});

/**
 * 带label和remark的用户选择组件
 */
Vue.component('vm-user-label-remark-input', {
	props: ['value','name','readonly','label','remark','grid','labelGrid','itemGrid','remarkGrid'],
	template:'<div :class="\'form-group  col-sm-\'+(grid?grid:12)"> \
		<label :class="\'control-label col-xs-\'+(labelGrid?labelGrid:2) ">{{label}}</label>\
		<div :class="\'col-xs-\'+(itemGrid?item-grid:6)">\
		<vm-user-input \
			:value="value.value" \
			:name="value.name" \
			:readonly="readonly" \
			:grid="itemGrid?itemGrid:6" \
			@input="updateValue($event)" >\
		></vm-user-input>\
		</div>\
		<div :class="\'col-xs-\'+(remarkGrid?remarkGrid:4)">\
			<p class="text-left">{{remark}}</p>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
	
});


/**
 * select2组件
 * https://vuefe.cn/v2/examples/select2.html
 */
Vue.component('vm-select2', {
	  props: ['id','name','options', 'value','readonly','isSimpleOption','canEdit','tags'],
	  template: '<vm-select \
			:value="value" \
			:name="name" \
			:readonly="readonly" \
			:options="options" \
		  	:canEdit="canEdit" \
			:is-simple-option="isSimpleOption" \
		  > \
		</vm-select> ',
	 mounted: function () {
		 var vm = this;
		 $(this.$el)
		     .val(this.value)
		          // init select2
		     .select2({tags: this.tags})
		          // emit event on change.
		      .on('change', function () {
		            vm.$emit('input', this.value);
		      });
	},
	watch: {
		 value: function (value) {
		    // update value
			 if(this.tags&&value){
				 var valExistFlag=false;
				 this.options=this.options?this.options:[];
				 for(var i in this.options){
					 if((this.isSimpleOption!='true'&& this.options[i].value==value)
							 ||(this.isSimpleOption=='true'&& this.options[i]==value)){
						 valExistFlag=true;
						 break;
					 }
				 }
				 if(!valExistFlag){
					 if($(this.$el).find("option[value='"+value+"']").length==0){
						 $(this.$el).append("<option value='"+value+"'>"+value+"</option>").change();
					 }
					 
				 }
				 
			 }
			 $(this.$el).val(value).change();
		 }
	},
	destroyed: function () {
		 $(this.$el).off().select2('destroy');
	},
	methods:{
		updateValue: function (val) {
		    this.$emit('input', val);
		},
		transferOptionsFormat:function(options){
			var result=[];
			for(var i in options){
				if(this.isSimpleOption!='true'){
					result.push({
						id:options[i].value,
						text:options[i].name
					});
				}else{
					result.push({
						id:options[i],
						text:options[i]
					});
				}
			}
			return result;
		}
	}
});




Vue.component('vm-datepicker', {
	props: ['value','name','format','required','readonly','canEdit','pickerType'],
	template:'<input v-if="canEdit!=\'false\'"  ref="input" class="form-control data-input Wdate" \
					:value="realValue" \
					:readonly="readonly" \
					:name="name" \
		     ></input> \
		     <label v-else class="can-edit-label">{{realValue}}</label>',
    computed:{
    	realValue:function(){
    		return this.formatValue(this.value);
    	}
    },
    data:function(){
    	return {
    		initPickerType:this.pickerType,
    		initFormat:this.format,
    		layDateObj:null
    	}
    },
    created:function(){
    	this.transferParam();
    },
	methods:{
		formatValue:function(oldValue){
			var format=this.initFormat;
        	if(typeof oldValue=="Date" ){
        		return oldValue?oldValue.Format(format):"";
        	}else{
        		if( oldValue==null || oldValue=="" ){
        			return "";
        		}else{
        			return oldValue?(new Date(Date.parse(oldValue.replace(/-/g, "/")))).Format(format):'';		
        		}
        	}
		},
		transferParam:function(){
			var initPickerType=this.pickerType?this.pickerType:'date';
	    	var initFormat=this.format?this.format:'yyyy-MM-dd';
	    	
	    	//增加默认赋值逻辑
	    	if(this.format=='yyyy-MM-dd HH:mm:ss'&&!this.pickerType){
	    		initPickerType='datetime';
			}else if(this.pickerType=='datetime'&&!this.format){
				initFormat='yyyy-MM-dd HH:mm:ss';
			}
	    	this.initPickerType=initPickerType;
	    	this.initFormat=initFormat;
		}
	},
	watch:{
		'format':function(){
			this.transferParam();
			this.layDateObj.config.type=this.initPickerType;
			this.layDateObj.config.format=this.initFormat;
			
		},
		'pickerType':function(){
			this.transferParam();
			this.layDateObj.config.type=this.initPickerType;
			this.layDateObj.config.format=this.initFormat;
		}
	},
	mounted:function(){
		if(this.canEdit!="false"){
			var _this=this; 
			//this.transferParam();
			_this.layDateObj=laydate.render({ 
				elem:_this.$el,
				type:_this.initPickerType,
				format:_this.initFormat,
				done: function(value, date, endDate){
					_this.$emit('input',value);
				}
			});
		}
	}
});


/**
 * 带label的datepicker 日期组件
 */
Vue.component('vm-label-datepicker', {
	props: ['value','name','format','label','grid','labelGrid','itemGrid','required'],
	template:'<div :class="\'form-group  col-sm-\'+(grid?grid:12)"> \
		<label :class="\'control-label col-xs-\'+(labelGrid?labelGrid:3) ">{{label}}</label>\
		<div :class="\'col-xs-\'+(itemGrid?itemGrid:8)">\
			<vm-datepicker \
					:value="value" \
					:name="name" \
					:format="format" \
		  			@input="updateValue($event)" >\
		     </vm-datepicker>\
		</div>\
	</div>',
	methods:{
		updateValue: function (val) {
		     this.$emit('input', val);
		}
	}
});
/**
 * ueditor 组件
 * http://blog.csdn.net/billll/article/details/53448183
 * 
 */
Vue.component('ueditor', {
	  props: ['name', 'value', 'width', 'height'],
	  template: '<div ref="editor"></div>',
	  data:function() {
	      return {
	        id: generateRandonInteger(100000) + 'ueditorId',
	      };
	    },
	    props: {
	      value: {
	        type: String,
	        default: null,
	      },
	      config: {
	        type: Object,
	        default: {},
	      }
	    },
	    watch: {
	      value: function value(val, oldVal) {
	        this.editor = UE.getEditor(this.id, this.config);
	        if (val !== null) {
	          this.editor.setContent(val);
	        }
	      },
	    },
	    mounted:function() {
	      this.$nextTick(function() {
	        // 保证 this.$el 已经插入文档
	      	this.$refs.editor.id = this.id;
	        this.editor = UE.getEditor(this.id, this.config);
	        this.editor.ready(function() {
	          this.editor.setContent(this.value);
	          this.editor.addListener("contentChange", function () {
	            var wordCount = this.editor.getContentLength(true);
	            var content = this.editor.getContent();
	            var plainTxt = this.editor.getPlainTxt();
	            this.$emit('input', { 'wordCount': wordCount, 'content': content, 'plainTxt': plainTxt });
	          });

	          this.$emit('ready', this.editor);
	        });
	      });
	    }
	});
/**
 * vue表单验证组件
 * 
 */
Vue.component('vm-valid-form', {
    props: ['value','name','rules','messages'],
    template:'<form class="form form-horization" @submit.prevent="submit($event)"><slot></slot></form>',
    methods:{
        submit:function(e){
            if($(this.$el).valid()){
                this.$emit('submit',e);
            }else{
                this.$emit('valid-error',{});
                //layer.msg('数据验证不通过，请参照页面提示核对数据是否正确！', {icon: 2});
            }
        }
    },
    mounted:function(){
    	var _rule=this.rules;
        var _messages=this.messages?this.messages:{};
        $(this.$el).validate({
        	errorPlacement: function(error, element) {
        		if (element.is(":radio") || element.is(":checkbox")){
        			element.parent().focus();
        			layer.tips(error[0].innerHTML, element.parent(), {
            			  tips: [3, '#f8ac59'], //还可配置颜色
            			  tipsMore: true
            			});
        		}else{
        			element.focus();
        			layer.tips(error[0].innerHTML, element, {
          			  tips: [3, '#f8ac59'], //还可配置颜色
          			  tipsMore: true
          			});
        		}
        		
    		},
    		focusInvalid:true,
    		onkeyup: false,
    		onfocusout:false,
    		onclick:false,
            rules: _rule,
            ignore:":hidden",
            messages:_messages,
            submitHandler:function(form){
            	return false;
            }
        });
    }
});


/**
 * radio2组件
 */
Vue.component('vm-radio2', {
	props: ['value','name','readonly','options','isSimpleOption','grid','itemGrid','canEdit'],
	data:function(){
		return {
			domId:this.id?this.id:'vm-multicheck_'+(_idCount++)
		};
	},
	template:'<div :id="domId" v-if="canEdit!=\'false\'"  :class="\'data-radio vm-radio-frame \'+(grid?grid:\'col-sm-12\')" \
		     >\
				<template v-if="isSimpleOption!=\'true\'"> \
					<div :class="\'magic-radio-frame \'+(itemGrid?itemGrid:\'col-sm-2\')" v-for="(item,index) in options"> \
						<input type="radio" \
								:id="domId+\'item_\'+index"\
								:name="name" \
								:readonly="readonly" \
								:value="item.value" \
								v-model="modelValue" \
								class="magic-radio" \
								@change="onItemChange($event.target.value)" \
						/> \
						<label :for="domId+\'item_\'+index">{{item.name}}</label >\
					</div>\
				</template> \
				<template v-else> \
					<div :class="\'magic-radio-frame \'+(itemGrid?itemGrid:\'col-sm-6\')" v-for="(item,index) in options"> \
						<input type="radio" \
							:id="domId+\'item_\'+index"\
							:name="name" \
							:readonly="readonly" \
							:value="item" \
							v-model="modelValue" \
							class="magic-radio" \
							@change="onItemChange($event.target.value)" \
						/> \
						<label :for="domId+\'item_\'+index">{{item}}</label >\
					</div>\
				</template> \
			</div>\
		 	<label v-else class="can-edit-label">{{nameValue}}</label>',
	computed:{
		modelValue:{
			get:function() {
		         return this.value;
		    },
		    set:function(val) {
		    	this.$emit('input', val);
		    }
		},
		nameValue:function(){
			for(var i in this.options){
				if(this.value==this.options[i].value){
					return this.options[i].name
				}
			}
			
		}
	},
	methods:{
		onItemChange: function (val) {
			this.$emit('on-item-change', val);
		}
	}
});
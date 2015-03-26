define(function(require, exports, module){
		
	var $    =  require( '$' ),
		
	gridSort = {
		
		sort : function( tbody, idx, srt ){
			this.srt = srt || 'desc';
			this.idx = parseInt( idx );
			this.tbody = $( tbody );
			
			this.contrast();
		},
		
		contrast : function(){
			var This = this,
				trArr   = [],
				NumArr = [];
				
			this.tbody.find('tr').each(function(i, ele){
				trArr.push( ele );
				
				var curTd = $(ele).children().eq( This.idx );
				NumArr.push( curTd.text() );
				
			});
			
			NumArr.sort(function(a, b){
				a = parseFloat( This.filter(a) );
				b = parseFloat( This.filter(b) );
				if ( This.srt === 'asc' ){
					return  a < b ? -1 : 1;
				}else{
					return  a > b ? -1 : 1;
				}
				
			});
			
			
			var newTrObj = This.newsortobj( trArr, NumArr );
			This.tbody.empty();
			for( var i=0, l=newTrObj.length; i<l; i++ ){
				This.tbody.append( newTrObj[i] );
			}
			
		},
		
		filter: function( val ){
			return val.replace(/-|\/|:|\s|,/g,'');
		},
		
		newsortobj : function( trs, nums ){
			var This = this,
				resultObj = {"length":0};
			for(var i=0,l=nums.length; i<l; i++){
				
				var cnum = nums[i];
				for(var j=0,k=trs.length; j<k; j++){
					if ( $( trs[j] ).children().eq( This.idx ).text() == cnum ){
						resultObj[ resultObj.length ] = $( trs[j] );
						resultObj.length += 1;
					}
				}
				
			}
			
			return resultObj;
			
		}
	};
	
	module.exports = gridSort;
		
});
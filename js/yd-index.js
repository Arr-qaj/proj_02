//移动的函数
function move(obj,index,li_count){
    /*1.靠transform来实现 */
    clearInterval(obj.time);
    // debugger
    obj.time = setInterval(function(){
       
        obj.style.transition='all 0.5s';
        obj.style.transform='translateX('+index+'px)';
    
        // if(callback){
        //     callback();
          
        // }    clearInterval(obj.time);
    },15);
    obj.addEventListener('transitionend',function(){
    
        if( 0 == li_count){
          console.log('llll');
        //   clearInterval(obj.time);
  
            obj.style.transition='none';
            obj.style.transform='translateX('+0+'px)';

            clearInterval(obj.time);
        }
    })
   
    //监听过渡事件
    /*2.靠left绝对值定位 
    clearInterval(obj.time);
    obj.time = setInterval(function(){
        // debugger;
     var move_index =(index-obj.offsetLeft)/10;
     move_index= move_index>0?Math.ceil(move_index):Math.floor(move_index);
     if(obj.offsetLeft === index){
        clearInterval(obj.time);
        if(callback){
            callback;
        }
     }
     obj.style.left = obj.offsetLeft + move_index+'px';
    },15);*/
} 
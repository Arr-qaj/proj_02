//元素移动函数 obj 传入元素 index 移动距离 cllback 延时函数
function move(obj,index,callback){
    // console.log(index);
    //首先要清除当前元素之前的定时器
    clearInterval(obj.time);
    //当前传入函数调用定时器
   obj.time=setInterval(function(){
    //用要移动的距离减去现在的距离  让动画做先快后慢的效果
    var move_index = (index - obj.offsetLeft) / 10;
    // console.log('没有转化前'+move_index);
    //动画运行时可能要可能会出现小数所以要向上取整（Math.ceil）  也有可能会出现负数所以要向下取整()
    move_index = move_index>0?Math.ceil(move_index):Math.floor(move_index);
//   console.log('转化后'+move_index);
    //判断是否移动到指定位置
    if(obj.offsetLeft==index){
        //当移动到指定位置关闭定时器
        clearInterval(obj.time);
        // debugger;
        if(callback){//判读是否传入函数
            callback(obj);//执行函数
        }
    }
        obj.style.left = obj.offsetLeft+move_index+'px'; 
   }, 15);
}
//使页面滚动的函数
function move_xy(obj,index,callback){
    clearInterval(obj.time);
    obj.time = setInterval(function(){
        var t_index = window.pageYOffset;//获取现在距离顶部的高度
        t_index = (index-(t_index-0))/10;//每次的距离
        t_index=t_index>0?Math.ceil(t_index):Math.floor(t_index);
        if(window.pageYOffset === index){
            clearInterval(obj.time);
            if(callback)
            callback;
        }
       
        window.scroll(0,t_index+(window.pageYOffset-0));
    },15);
}
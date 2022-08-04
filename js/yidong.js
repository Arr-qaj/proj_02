window.addEventListener('load', function () {
    //获取放展示图片的盒子
    var big = this.document.querySelector('.big');
    //获取放图片的ul
    var nms = this.document.querySelector('.nms');
    //获取放下标的ul
    var nmb = this.document.querySelector('.nmb');
    //统计现在是哪个Li
    var li_count = 0;
    //定时器
    var time = '';
    //生成放下标的ul中的li

    for (let i = 0; i < nms.children.length; i++) {
        var li = this.document.createElement('li');
        li.setAttribute('index', i);
        //给每个li绑定事件
        if (i == 0)
            li.setAttribute('class', 'li_bian');
        li.addEventListener('click', function () {
            for (let j = 0; j < nmb.children.length; j++) {
                nmb.children[j].removeAttribute('class');
            }
            this.setAttribute('class', 'li_bian');
            li_count = this.getAttribute('index') - 0;
            move(nms, -li_count * big.offsetWidth);
        });
        nmb.appendChild(li);
    }
    //拷贝第一张图片和最后一张图片
    //第一张图片
    var newlis = nms.children[0].cloneNode(true);
    //console.log(newlis);
    nms.appendChild(newlis);
    //最后一张图片
    // console.log(nms.children[nmb.children.length-1]);
    var lastlis = nms.children[nmb.children.length - 1].cloneNode(true);
    nms.insertBefore(lastlis, nms.childNodes[0]);

    //定时器
    time = setInterval(bba, 3000);
    function bba() {
        li_count++;

        nms.style.transition = 'all 0.5s';
        nms.style.transform = 'translateX(' + -li_count * big.offsetWidth + 'px)';
        for (let j = 0; j < nmb.children.length; j++) {
            nmb.children[j].removeAttribute('class');

            if (nmb.children[j].getAttribute('index') == (li_count == nmb.childNodes.length ? nmb.childNodes.length : li_count)) {
                //debugger
                nmb.children[j].setAttribute('class', 'li_bian');
            }
        }

    }
    //监听过渡事件
    nms.addEventListener('transitionend', function () {
        //当li_count和下标的长度相等时,打开事件让图片归位
        if (nmb.children.length <= li_count) {
            li_count = 0;
            nms.style.transition = 'none';
            nms.style.transform = 'translateX(' + 0 + 'px)';
            nmb.children[li_count].setAttribute('class', 'li_bian');
        }else if(li_count<0){
            li_count = nmb.children.length-1;
            nms.style.transition = 'none';
            nms.style.transform = 'translateX(' + -li_count*big.offsetWidth + 'px)';
            nmb.children[li_count].setAttribute('class', 'li_bian');
        }
    })

    //手指滑动轮播图
    //c触摸元素 touchstart : 获取手指初始坐标
    var starX = 0 ;//初始位置 
    var moveX = 0 ;//移动位置 
    var fz= false;//判断是否移动
    nms.addEventListener('touchstart',function(e){
        starX = e.targetTouches[0].pageX;
        clearInterval(time);
        e.preventDefault();
    });
    //手指移动 touchmove : 计算手指的滑动距离 并且移动盒子
    nms.addEventListener('touchmove',function(e){
        moveX = e.targetTouches[0].pageX - starX;
       var lateXs = -li_count *big.offsetWidth;
       lateXs=lateXs+moveX;
       nms.style.transition='none';
       nms.style.transform='translateX('+lateXs+'px)';
       fz=true;
       e.preventDefault();
    });
    //手指离开 touchent : 根据距离判断上一张还是下一张
    nms.addEventListener('touchend',function(){
        //如果距离大于 50
        // console.log(moveX);
        if(fz){
            fz=false;
            if(Math.abs(moveX)>50){
                //向右滑动 是上一张 
                if(moveX>0){
                    li_count--;
                }else if(moveX<0){
                    //向右滑动 下一张
                    li_count++;
                }
                for (let j = 0; j < nmb.children.length; j++) {
                    nmb.children[j].removeAttribute('class');
                }
                console.log('li_count:'+li_count+'flga:'+!li_count<0);
                if(li_count>=0&&li_count<nmb.children.length){
                     nmb.children[li_count].setAttribute('class', 'li_bian');
                }
               
                nms.style.transition='all 0.5s';
                nms.style.transform='translateX('+-li_count*big.offsetWidth+'px)';
            }else{
                //如果小于50像素 让它回弹
                nms.style.transform='translateX('+li_count*big.offsetWidth+'px)';
            }
        }
        
    })
    //手指离开再次打开定时器
    nms.addEventListener('touchend',function(){
        clearInterval(time);
      time =setInterval(bba,3000);
    })
})
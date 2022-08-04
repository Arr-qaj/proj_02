window.addEventListener('load', function () {
    //获视口的盒子
    var big = this.document.querySelector('.big');
    //获取右边的盒子
    var big_r = this.document.querySelector('.big_r');
    //获取左边的盒子
    var big_l = this.document.querySelector('.big_l');
    //获取放图片的ul
    var nms = this.document.querySelector('.nms');
    //获取它有多少个li
    var nms_arr = nms.children;
    console.log(nms_arr);
    //获取放下标的ul
    var num = 0;
    var cnm = this.document.querySelector('.cnm');
    //定时器
    var times ='';
    //往放下标的ul里面放li
    for (var i = 0; i < nms_arr.length; i++) {

        //创建一个个的li
        var li = this.document.createElement('li');
        //给这些li设置一个自定义属性
        li.setAttribute('index', i);
        if (i == 0) {
            li.setAttribute('class', 'bian_se');
        }
        //把这些li放入ul中去
        cnm.appendChild(li);
        //把这些 小li绑定事件
        li.addEventListener('click', function () {
            //先把别人的特效清除 留下自己的
            for (var i = 0; i < cnm.children.length; i++) {
                cnm.children[i].removeAttribute('class');
            }
            //this是指当前调用这个函数的li 
            this.setAttribute('class', 'bian_se');
            //点击小li移动图片 移动的是ul
            //ul的移动距离 li索引号 乘以 图片的宽度 注意是负值
            //拿取视口的宽度
            var shikou_w = big.offsetWidth;
            //获取当前Li 的index索引号
            var li_index = this.getAttribute('index');
            //当点击了某个小LI就要使num和 小li的下标统一
            num = li_index;
            //    console.log(shikou_w);

            move(nms, -(shikou_w * li_index));
        });
    }

    //当鼠标移动到盒子上时 显示两边的盒子
    big.addEventListener('mouseenter', function () {
        big_l.style.display = 'block';
        big_r.style.display = 'block';
        //当鼠标移动到盒子上关闭定时器
        clearInterval(times);
    });
    //当鼠标移出盒子上时 隐藏两边的盒子
    big.addEventListener('mouseleave', function () {
        big_l.style.display = 'none';
        big_r.style.display = 'none';
        // debugger;
        times =   setInterval(ti, 3000);
    });
    //点击左边的盒子让图片自己滚动
    var flzg = true;//节流阀
    var first = nms.children[0].cloneNode(true);
    nms.appendChild(first);
    //   var li_in =document.querySelector('.bian_se');

    big_l.addEventListener('click', function () {
        if(flzg){
            flzg=false;
            for (let i = 0; i < cnm.children.length; i++) {
                cnm.children[i].removeAttribute('class');
            }
            num++;
            juli = num * big.offsetWidth;
    
           
            if (num == cnm.children.length) {
                num = 0;
                // debugger;
                move(nms, -juli, function (nms) {
                    nms.style.left = 0 + 'px';
                    flzg=true;
                });
            } else {
                move(nms, -juli,function(){
                    flzg=true;
                });
            }
    
    
            cnm.children[num].setAttribute('class', 'bian_se');
        }
        
        // console.log(juli);

    });
    //克隆第一张图片放到ul的最后面 

    // 点击右边的盒子让图片自己滚动
    big_r.addEventListener('click', function () {
        if(flzg){
            flzg=false;
            for (let i = 0; i < cnm.children.length; i++) {
                cnm.children[i].removeAttribute('class');
            }
            
            if (num == 0) {
                num = nms.children.length;
                nms.style.left = -((num -= 1) * big.offsetWidth) + 'px';
    
            }
            num--;
            juli = num * big.offsetWidth;
            cnm.children[num].setAttribute('class', 'bian_se');
    
            move(nms, -juli,function(){
                flzg=true;
            });
        }
       


    });
    //开启一个定时器
    

      times = setInterval(ti, 3000);
    function ti() {
        num++;
        let gop = num * big.offsetWidth;
        if (num == cnm.children.length) {
            move(nms, -gop, function () {
                nms.style.left = 0 + 'px';

            });
            num = 0;
        } else {
            move(nms, -gop);
        }
        for (let i = 0; i < cnm.children.length; i++) {
            cnm.children[i].removeAttribute('class');
        }
        cnm.children[num].setAttribute('class','bian_se');
    }
});
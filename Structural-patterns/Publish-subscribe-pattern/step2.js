// 1.把发布订阅模式封装成可复用的对象
// 2.加入删除订阅的方法

var myEvent = {
    clientList: {},
    listen: function(key,fn) {
        if(!this.clientList[key]){ 
            this.clientList[key] = []
        }
        
        this.clientList[key].push(fn)
    },
    trigger: function() {
        // arguments[0] 也可以？
        var key = Array.prototype.shift.call(arguments)
        fns = this.clientList[key]
    
        if(!fns || fns.length===0){
            return false
        }
    
        for(var i=0,fn;fn= fns[i++];){
            fn.apply(this,arguments) // 这里带上发布消息时候的参数
            // fn(arguments)也可以 
        }
    },
    remove:function(key, fn){
        var fns = this.clientList[key]
        
        if(!fns){
            return false
        }

        if(!fn){
            // 如果没有传入具体回调，就取消key对应消息的所有订阅
            fns && (fns.length = 0)
        } else {
            for(var l = fns.length -1;l >= 0;l--){
                var _fn = fns[l]
                if(_fn === fn){
                    fns.splice(l,1) // delete callback from subscriber
                }
            }
        }
    }
}

var installEvent = function(obj){
    for(var i in myEvent){
        obj[i] = myEvent[i]
    }
}

var salesOffices = {}

installEvent(salesOffices)

salesOffices.listen('squareMeter88', fn1 = function(price){
    console.log('我是小红')
    console.log('squareMeter88 价格=' + price)
})

// 只订阅自己感兴趣的事件
salesOffices.listen('squareMeter88', fn2 = function(price){
    console.log('我是小明')
    console.log('squareMeter88 价格=' + price)
})

salesOffices.remove('squareMeter88',fn2)

salesOffices.trigger('squareMeter88',2000000)

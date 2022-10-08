// 加入中介的角色，把发布者和订阅者联系起来
// 借助全局 Event 对象来实现

var MyEvent = (function(){
    var clientList = {},trigger,remove

    listen = function(key,fn){
        if(!clientList[key]){
            clientList[key] = []
        }

        clientList[key].push(fn)
    }

    trigger = function(){
        debugger
        var key = Array.prototype.shift.call(arguments)
        fns = clientList[key]

        if(!fns || fns.length === 0) {
            return false
        }

        for(var i=0,fn;fn = fns[i++];){
            debugger
            console.log(this)
            fn.apply(this,arguments)
        }
    }

    remove = function(key,fn){
        var fns = clientList[key]

        if(!fns){
            return false
        }
        if(!fn){
            fns && (fns.length = 0)
        }

        for(var l = fns.length-1;l>=0;l--){
            var _fn = fns[l]
            if(_fn === fn) {
                fns.splice(l,1)
            }
        }
    }

    return {
        listen,
        trigger,
        remove,
        clientList,
    }
})()

// MyEvent.listen('squareMeter88', function(price){
//     console.log('squareMeter88 价格=' + price)
// })


// MyEvent.trigger('squareMeter88',2000000)
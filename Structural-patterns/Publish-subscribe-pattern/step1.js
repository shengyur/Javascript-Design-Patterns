var  salesOffices = {}

// salesOffices.clientlist = [];
salesOffices.clientlist = {};

salesOffices.listen = function(key,fn) {
    if(!this.clientlist[key]){ 
        this.clientlist[key] = []
    }
    
    this.clientlist[key].push(fn)
}

salesOffices.trigger = function() {
    // arguments[0] 也可以？
    var key = Array.prototype.shift.call(arguments)
    fns = this.clientlist[key]

    if(!fns || fns.length===0){
        return false
    }

    for(var i=0,fn;fn= fns[i++];){
        fn.apply(this,arguments) // 这里带上发布消息时候的参数
    }
}

salesOffices.listen('squareMeter88', function(price){
    console.log('我是小红')
    console.log('squareMeter88 价格=' + price)
})

// 只订阅自己感兴趣的事件
salesOffices.listen('squareMeter110', function(price){
    console.log('我是小明')
    console.log('squareMeter110 价格=' + price)
})


salesOffices.trigger('squareMeter88',2000000)
salesOffices.trigger('squareMeter110', 3000000)
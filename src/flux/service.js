"use strict";

var corkyServiceSubscriptions=[];

var Service = function () {
    function Service() {
        this.actions = {};
        this.isContainer = false;
        this.isSubscribed=false;
        this.subscriptions=[];
    }
  
     Service.prototype.ensureSubscription = function (store) {
          if (this.selector !== undefined) {
            this.selectorData = this.selector(store.getState());
        }
         if(!this.isSubscribed)
         {
             var _this=this;
              if(corkyServiceSubscriptions.length == 0)
             {
                store.subscribe(function () {
                    for(var i=0; i<corkyServiceSubscriptions.length;i++)
                    {
                        corkyServiceSubscriptions[i]();
                    }
                });
             }
          
             corkyServiceSubscriptions.push(function () {
                   if (_this.selector !== undefined) {
                       _this.selectorData =  _this.selector(store.getState());
                   }                
             });
            
             this.isSubscribed=true;
         }
     }

       
    return Service;
}();
exports.Service = Service;
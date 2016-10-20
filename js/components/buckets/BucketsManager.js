var BucketsManager = function() {
    this.noOfBucket = 0;
    this.maxBuckets = 5;
    this.timer = null;
    this.init();
    this.initBucket();
};

BucketsManager.prototype.init = function() {
    var _this = this;
    if(this.timer === null) {
        this.timer = setInterval(function(){
            if(_this.noOfBucket >= _this.maxBuckets) {
                _this.reset();
            }else {
                _this.noOfBucket += 1;
                _this.initBucket();
            }
        }, 3000);
    }
};

BucketsManager.prototype.initBucket = function() {
    var bucket = new Bucket();
    BucketStores.buckets.push(bucket);

};

BucketsManager.prototype.draw = function() {
    var i, buckets = BucketStores.buckets;
    for(i=0; i<buckets.length; i++) {
        var bucket = buckets[i];
        bucket.draw();
    }
};

BucketsManager.prototype.reset = function() {
    var i, buckets = BucketStores.buckets;
    for(i=0; i<buckets.length; i++) {
        var bucket = buckets[i];
        if(bucket.isReset) {
            bucket.reset();
            break;
        }
    }
};


var BucketsManager = function() {
    this.noOfBucket = 0;
    this.maxBuckets = 10;
    this.isOutBucket = false;
    // this.timer = null;
    // this.initBucket();
};

BucketsManager.prototype.initBucket = function() {
    var bucket = new Bucket();
    BucketStores.buckets.push(bucket);
};

BucketsManager.prototype.draw = function() {
    if(DonkeyStores.isThrow && !this.isOutBucket) {
        if(this.noOfBucket >= this.maxBuckets) {
            this.reuse();
        }else {
            this.noOfBucket += 1;
            this.initBucket();
        }
        this.isOutBucket = true; //only one bucket throw each time, set isOutBucket true to avoid over-throwing
    }

    //restore
    if(!DonkeyStores.isThrow && this.isOutBucket) {
        this.isOutBucket = false;
    }

    var i, buckets = BucketStores.buckets;
    for(i=0; i<buckets.length; i++) {
        var bucket = buckets[i];
        if(bucket.isAlive) { //not draw when player beat the bucket
            bucket.draw();
        }

    }
};

BucketsManager.prototype.reuse = function() {
    var i, buckets = BucketStores.buckets;
    for(i=0; i<buckets.length; i++) {
        var bucket = buckets[i];
        if(bucket.isReset) {
            bucket.reset();
            break;
        }
    }
};

BucketsManager.prototype.reset = function() {
    this.noOfBucket = 0;
    this.isOutBucket = false;
    BucketStores.buckets = [];
};


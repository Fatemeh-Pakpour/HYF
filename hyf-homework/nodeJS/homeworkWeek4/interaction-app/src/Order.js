class Order {
    constructor(type, status, created, modified) {
                    
        this.type = type;
        this.status = status;
        this.created = created;
        this.modified = modified;
        console.log(this);
        // if(this.status !== status){
        //     this.modified = new Date();
        // }
    }
}


module.exports = Order;
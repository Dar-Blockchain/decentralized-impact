const PrHolder = require('../schema/project_holder');

module.exports = class projectHolder {
    constructor () {

    }
    async addHolder(_name,_email,_password,_address,_gouvernorat,_city,_walletPubKy,_walletPrivKey,_telephone){
        let holder = await PrHolder.findOne({email: _email});
        if(holder != null){
            return false;
        }
        else{
            var newPorteur = new holder();
            newPorteur.name = _name;
            newPorteur.email = _email;
            newPorteur.address = _address;
            newPorteur.password = _password;
            newPorteur.telephone = _telephone;
            newPorteur.Wallet = _wallet;
            newPorteur.status = false;
            newPorteur.setPassword(_password);
            newPorteur.save();
            return true;
        }
    }
    async getAllholder(){
        let holder = await PrHolder.find();
        console.log(holder);
        if(holder.length == 0){
            return false;
        }
        return holder;
    }
    async getholderById(_id){
        let holder = await PrHolder.findById(_id);
        if (holder === null ){
            return false;
        }
        return holder;
    }
    async getholderByEmail(_email){
        let holder = await PrHolder.findOne({email: _email});
        if (holder === null ){
            return false;
        }
        return holder;
    }
    async getPorteurByWallet(_wallet){
        let holder = await PrHolder.findOne({walletPubKey: _wallet});
        if(holder === null ){
            return false;
        }
        return true;
    }
    async deletePorteurById(_id){
        let holder = await PrHolder.deleteOne(PrHolder.findOne({_id: _id}));
        console.log(holder);
        if(holder.deletedCount == 0){
            return false;
        }
        return true;
    }
    async deletePorteurByEmail(_email){
        let holder = await PrHolder.deleteOne(PrHolder.findOne({email: _email}));
        if(holder.deletedCount == 0){
            return false;
        }
        return true;
    }
   async updateholderById(_id,_name,_email,_address,_gouvernorat,_city,_telephone){
        let holder = await holder.updateOne({_id: _id},{$set:{"name": _name,"email": _email,"address":_address,
        "gouvernorat": _gouvernorat,"city": _city,"telephone": _telephone}});
        if(!holder.acknowledged){
            return null;
        }
        else if (holder.modifiedCount == 0){
            return false
        }else {
            return true;
        }
    }
    async updateholderByEmail(_currentEmail,_name,_email,_address,_gouvernorat,_city,_telephone){
        let holder = await holder.updateOne({email: _currentEmail},{$set:{"name": _name,"email": _email,"address":_address,
        "gouvernorat": _gouvernorat,"city": _city,"telephone": _telephone}});
        console.log(holder);
        if(!holder.acknowledged){
            return null;
        }
        else if (holder.modifiedCount == 0){
            return false
        }else{
            return true;
        }
    }
    async resetPassword(_id, _password){
        const userExist = await holder.findOne({_id:_id});
        if(userExist != null){
        console.log(userExist);
            const result =await userExist.validPassword(_password);
            if(!result){
            
                userExist.setPassword(_password);
                userExist.save()
                return true;
            }
            else{
                return false;
            }
            }
        else{
            return null;
        }   
    }
    async validatePasswordByEmail(_email,_password){
        const adminExist = await holder.findOne({"email": _email});
        console.log(adminExist);
        if(adminExist === null){
            return null;
        }
        const result =  adminExist.validPassword(_password);
        return result;
    }
}
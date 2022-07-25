const Admin = require('../schema/admin');

module.exports = class admins{

    constructor(){

    }
    async addAdmin(_firstName,_lastName,_email,_password,_role){
        let adminExist = await Admin.findOne({email: _email});
        console.log(adminExist);
        if(adminExist != null){
            return false;
        }
        else{
            var newAdmin = new Admin();
            newAdmin.firstName = _name;
            newAdmin.lastName = _lastName;
            newAdmin.email = _email;
            newAdmin.password = _password;
            newAdmin.role = _role;
            newAdmin.setPassword(_password);
            newAdmin.save();
            return true;
        }
    }
    async getAllAdmins(){
        let result = await Admin.find();
        if(result === null){
            return false;
        }else{
            return result;
        }
    }
    async getAdminById(_id){
        let admin = await Admin.findById(_id);
        if(admin === null){
            return false;
        }
        return admin
    }
    async getAdminbyEmail(_email){
        let admin = await Admin.findOne({email: _email});
        if(admin === null){
            return false;
        }
        return admin;
    }
    async deleteById(_id){
        let  adminDelete = await Admin.deleteOne(Admin.findOne({"_id": _id}));
        console.log(adminDelete);
        if(adminDelete.deletedCount==0){
            return false;
        }
        else {
            return true;
        }
    }
    async deleteByEmail(_email){
        let  adminDelete =await Admin.deleteOne(Admin.findOne({'email': _email}));
        console.log(adminDelete);
        if (adminDelete.deletedCount==0){
            return false ;
        }
        else {
            return true;
        }
    }
    async updateById(_id,_name,_email,){
        let adminUpdate = await Admin.updateOne({_id: _id},{$set:{"name":_name,"email":_email}});
        console.log(adminUpdate);
        if(!adminUpdate.acknowledged){
            return null;
        }
        else if(adminUpdate.modifiedCount==0){
            return false;
        }
        else{
            return true
        }
    }
    async updateByEmail(_currendEmail,_name,_email,){
        let adminUpdate = await Admin.updateOne({email: _currendEmail},{$set:{"name":_name,"email":_email,}});
        console.log(adminUpdate);
        if(!adminUpdate.acknowledged){
            return null;
        }
        else if(adminUpdate.modifiedCount==0){
            return false;
        }
        else{
            return true
        }
    }
    async resetPasswordById(_id, _password){
        const userExist = await Admin.findOne({_id:_id});
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
        const adminExist = await Admin.findOne({"email": _email});
        console.log(adminExist);
        if(adminExist === null){
            return null;
        }
        const result =  adminExist.validPassword(_password);
        return result;
    }
}
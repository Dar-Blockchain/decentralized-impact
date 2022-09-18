const project = require("../schema/project.js")
module.exports = class Projects {
    constructor() {}

    async addProject(_title,_holder,_description,_category,_state,_photo){
        let proj = await project.findOne({titre: _title});
        let port = await holder.findById(_holder);
        if(proj != null && port != null ){
            return false;
        }else {
            var newProj = new project();
            newProj.title = _title;
            newProj.holder = _holder;
            newProj.description  = _description;
            newProj.state  = _state ;
            newProj.category = _category;
            newProj.photo = _photo
            newProj.save();
            return true;
        }
    }
    async addPhoto(_id,_photo){
        let proj = project.updateOne({"_id":_id},{$set:{"photo": _photo}});
        console.log(proj);
        if(!proj.acknowledged){
            return null;
        }else if (!proj){
            return false;
        }else {
            return true;
        }
    }
    async getAllprojects(){
        let proj = await project.find()
        if(proj.length == 0){
            return false ;
        }
        return proj;
    }
    async getProjectById(_id){
        let proj  = await project.findById(_id);
        if (proj=== null ){
            return false;
        }else {
            return proj;
        }
    }
    async getProjectByTitre(_title){
        let proj = await project.findOne({titre: _title});
        if(proj === null){
            return false;
        }else {
            return proj;
        }
    }
    async updateProject(_id,_title,_description,_holder,_photo,_state,_category){
        let proj = await project.updateOne({_id: _id},{$set:{"title": _title,"description": _description,"holder": _holder,"state" : _state,"photo": _photo,"category":_category}});
        console.log(proj)
        if(!proj.acknowledged){
            return null;
        }
        else if (proj.modifiedCount==0){
            return false;
        }
        else {
            return true;
        }
    }
    async deleteProjectById(_id){
        let proj = await project.deleteOne(project.findById(_id));
        if(proj.deletedCount == 0){
            return false;
        }else return true;
    }
    async deleteProjectByTitle(_title){
        let proj = await project.deleteOne(project.findByTitle(_title));
        if(proj.deletedCount == 0){
            return false;
        }else return true;
    }
}
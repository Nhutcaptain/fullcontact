const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = (req, res) => {
    res.send({massage: 'create handle.'});
} ;

exports.findAll = (req, res) => {
    res.send({massage: 'find all handle.'});
};

//exports module dùng để dùng ở bất cứ đâu khi được gọi tên

exports.findOne = (req, res) => {
    res.send({massgae: 'Find One handle.'});
};

exports.update = (req, res) => {
    res.send({massage: 'update handle.'});
};

exports.delete = (req, res) => {
    res.send({massage: 'delete handle.'});
};

exports.deleteAll = (req, res) => {
    res.send({massage: 'deleteAll handle.'});
};

exports.findAllFavorite = (req, res) => {
    res.send({massage: 'findAllFavorite handle.'});
}; 

exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name cannot empty"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.create(req.body);
        //console.log(documents);
        return res.send(documents);
        
    } catch(error) {
        console.log('An error found!',error)
        return next(
            new ApiError(500, "An error occured while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        
        const {name} = req.query;
        if(name) {
            documents = await contactService.findByName(name); 
          console.log(documents);
        } else {
            documents = await contactService.find({});
          
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")

        );
    }

    return res.send(documents);
}

//handle FindOne
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findById(req.params.id);
        console.log(documents);
        if(!documents) {
            return next(new ApiError(404, "Contact not found"));
        }
  
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500, "Error retrieving contact with id =" + req.params.id
            )
        );
    }
};

//Handle Update

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated succesfully "});
    } catch (error) {
        return next( new ApiError(500, "Error updating contact with id = " + req.params.id));
    }
};

//Cai dat handle delete

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, "Could not delete contact with id = " + req.params.id)
        );
    }
};

//cai dat handle findAllFavorite

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "An error occurred while retrieving favorite contacts"));
    }
};


exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send ({
            message: deleteCount + " contact were deleted successfully",
        });
    } catch (error) {
        return next(new ApiError (500, "An error occurred while removing all contacts"));
    }
};
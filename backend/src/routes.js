const express = require("express");
const OngController = require("./controllers/OngController");
const IncidentsController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");
const { celebrate, Joi, Segments } = require("celebrate");

const routes = express.Router();

/*                  Sessions
__________________________________________________*/

routes.post("/sessions", SessionController.create);



/*                  Ongs
__________________________________________________*/

routes.get("/ongs", OngController.getAll);

routes.post(
    "/ongs",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string()
                .required()
                .email(),
            whatsapp: Joi.string()
                .required()
                .min(10)
                .max(11),
            city: Joi.string().required(),
            uf: Joi.string()
                .required()
                .length(2)
        })
    }),
    OngController.create
);


/*                  Profile
__________________________________________________*/

routes.get(
    "/profile",
    celebrate({
        [Segments.HEADERS]: Joi.object()
            .keys({
                authorization: Joi.string().required()
            })
            .unknown()
    }),
    ProfileController.getIncidents
);


/*                  Incident
__________________________________________________*/

routes.get(
    "/incidents",
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }),
    IncidentsController.getAll
);

routes.post("/incidents", IncidentsController.create);

routes.delete(
    "/incidents/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
        [Segments.HEADERS]: Joi.object()
            .keys({
                authorization: Joi.string().required()
            })
            .unknown()
    }),
    IncidentsController.delete
);

routes.get("/");

module.exports = routes;

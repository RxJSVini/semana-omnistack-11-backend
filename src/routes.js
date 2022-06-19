const { Router } = require('express');
const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const { celebrate, Joi, Segments } = require('celebrate');

const routes = Router();

routes.get("/", (req, res) => {
    return res.json({
        message: "ok"
    });
});

routes.get("/ongs", OngsController.index);

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email:Joi.string().required(),
        whatsapp:Joi.string().required(),
        city:Joi.string().required(),
        uf:Joi.string().required(),

    })
}), OngsController.store);



routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.post("/incidents", celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.string().required()
    })
}), IncidentsController.store);



routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentsController.index);



routes.delete("/incidentes/:id", celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsController.delete);



routes.post("/session", SessionController.store);


module.exports = routes;
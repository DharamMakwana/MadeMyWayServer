import Joi from "joi";

export const create_openvpn_entry = {
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      cityname: Joi.string().required(),
      files: Joi.array().required(),
      category: Joi.string()
        .allow("GENEREL", "VIDEOS", "SPORTS", "GAMES", "SOCIAL-MEDIA")
        .required(),
      type: Joi.string().allow("FREE", "PREMIUM").required(),
    })
    .required(),
};

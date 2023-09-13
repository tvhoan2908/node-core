import Joi from "joi";

export type ILoginRequest = {
  username: string;
  password: string;
};
export const loginRequest = Joi.object<ILoginRequest>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

import botConfig from "../config/bot";

function isParam(param: string) {
  const paramRegex =
    botConfig.caractereParam +
    "([a-z]){3,}" +
    botConfig.separateParamCaractere +
    "(\\w){3,}";
  console.log(paramRegex);
  return param.match(new RegExp(paramRegex));
}

export default function getparams(bodyMessage: string) {
  const { caractereParam, separateParamCaractere } = botConfig;
  const params = bodyMessage
    .split(" ")
    .slice(1)
    .map((param) => {
      if (!isParam(param)) {
        throw new Error(
          `O parâmetro ${param} não é valido. Deve seguir a seguinte sintáxe: ${caractereParam}parametro${separateParamCaractere}valor`
        );
      }
      const paramArray = param
        .slice(caractereParam.length)
        .split(separateParamCaractere);
      console.log(paramArray);
      return { [paramArray[0]]: paramArray[1] };
    });

  let paramsObject = {};
  params.forEach((param) => {
    Object.keys(param).forEach((paramKey) => {
      paramsObject[paramKey] = param[paramKey];
    });
  });
  return paramsObject;
}

//--país:brazil

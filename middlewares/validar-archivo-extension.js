
const validarExtensionAchivo = (files,extensionesPermitidas=['jpg','PNG','png','JPG'])=>
{
  const {archivo} = files;
  const nombreCortado = archivo.name.split('.');
  const extension = nombreCortado[nombreCortado.length-1];
  if(!extensionesPermitidas.includes(extension))
  {
       throw new Error(`La extension ${extension} no es permitida ${extensionesPermitidas}`);
  }

  return true;
}

module.exports = {validarExtensionAchivo}
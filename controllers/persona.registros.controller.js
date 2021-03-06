PersonalShema = require('../Models/Personal.model');
paquete = require('../Models/Paquete.model');
siniestro = require('../Models/Siniestro.model');


exports.create = (req, res) => {
    if(!req.body.nombre){ res.status(400).send('el nombre ingrese')}


//añadir un nuevo un nuevo personal

const newPersonal = new PersonalShema({
  Nombre: req.body.nombre,
  Apellido: req.body.apellido,
  Telefono: req.body.telefono,
  Edad: req.body.edad,
  NSS: req.body.nss,
  Domicilio: req.body.domicilio,
  Correo: req.body.correo,
  Password: req.body.password,
  Tipo: req.body.tipo  
});
// verificacion si no existe uno previamente

PersonalShema.findOne({Correo: req.body.correo}, (err, correoExiste) =>{    
    if(correoExiste) return res.status(400).send('Ya  registrado');

    newPersonal.save((err, guardado) => {
        if(err) res.send({msg: 'no mames un error: '+  err});
        res.send(guardado);
       
    });
}); 
};

exports.paquete = (req, res) => {  // guardar un paquete que es para la poliza  
    if(!req.body.Tipo){res.status(400).send('ingrese el tipo')}

    const newPaquete = new paquete({
        Tipo: req.body.tipo,
        Cobertura: req.body.cobertura,
        Vigencia: req.body.vigencia,
        Costo: req.body.costo
    });
    //poner alguna validaion 

    newPaquete.save((err, guardar) => {
        if(err) res.send({msg: 'tenemos un problema al guardar los datos '+ err})
        res.json({msg: 'Save Ok'})        
    })

}

exports.siniestro = (req, res) => { //registar siniestro acontesido 
    if(!req.body.siniestro){res.status(400).send('ingrese los datos correctamente')};

    const newSiniestro = new siniestro({
        Agente: req.user.id,
        Siniestro: req.body.siniestro,
        Dato: req.body.dato,
        Resuelto: req.body.resuelto
    });

    newSiniestro.save((err, guardar) => {
        if(err) res.send({msg: 'tenemos un problema al guardar los datos '+ err});
        //res.send({msg: 'save susesful'})
        else{res.json({msg: 'save Ok'})}
        
    })
};


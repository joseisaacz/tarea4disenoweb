let select = document.getElementById('state');
let cantons = document.getElementById('cantons');
let district = document.getElementById('district');

const setOptionValue = (object, combo) => {
    let option = document.createElement('option');
    option.value = object.numero;
    option.text = object.nombre;
    combo.add(option);
}
const getProvinces = async () => {
    try {
        const { data } = await fetch('https://api.pruebayerror.com/locaciones/v1/provincias').then(resp => resp.json());
        console.log(data);
        data.forEach(element => {
            setOptionValue(element, select);
        });
    }
    catch(error) {
        console.log('Error al obtener las provincias.');
        throw error;
    }
}
const getCantons = async (province_number) => {
    try {
        const { data } = await fetch(`https://api.pruebayerror.com/locaciones/v1/provincia/${province_number}/cantones`).then(resp => resp.json());
        console.log(data);
        data.forEach(element => {
            setOptionValue(element, cantons);
        });
    }
    catch(error) {
        console.log('Error al obtener los cantones.');
        throw error;
    }
}
const getDistricts = async (province_number, canton_number) => {
    try{
        const { data } = await fetch(`https://api.pruebayerror.com/locaciones/v1/provincia/${province_number}/canton/${canton_number}/distritos`).then(resp => resp.json());
        console.log(data);
        data.forEach(element => {
            setOptionValue(element, district);
        });
    }
    catch(error) {
        console.log('Error al obtener los distritos');
        throw error;
    }
}

window.addEventListener('load', function(event) {
    getProvinces();
    getLawyerProvinces();
    setDesampaDistricts();
});

const removeComboOptions = (combo) => {
    let options = combo.options;
    for (i = (options.length)-1; i >= 0; i--) {
        if(options[i].value != 0) {
            options.remove(i);
        }
    }
}

select.addEventListener('change', function(event){
    removeComboOptions(cantons);
    removeComboOptions(district);
    getCantons(select.value);
});
cantons.addEventListener('change', function(event){
    removeComboOptions(district);
    getDistricts(select.value, cantons.value);
});


let lawyerstate = document.getElementById('lawyerstate');
let lawyercantons = document.getElementById('lawyercantons');
let lawyerdistrict = document.getElementById('lawyerdistrict');

const getLawyerProvinces = async () => {
    try {
        const { data } = await fetch('https://api.pruebayerror.com/locaciones/v1/provincias').then(resp => resp.json());
        data.forEach(element => {
            setOptionValue(element, lawyerstate);
        });
    }
    catch(error) {
        console.log('Error al obtener las provincias.');
        throw error;
    }
}

const getLawyerCantons = async (province_number) => {
    try {
        const { data } = await fetch(`https://api.pruebayerror.com/locaciones/v1/provincia/${province_number}/cantones`).then(resp => resp.json());
        data.forEach(element => {
            setOptionValue(element, lawyercantons);
        });
    }
    catch(error) {
        console.log('Error al obtener los cantones.');
        throw error;
    }
}

const getLawyerDistricts = async (province_number, canton_number) => {
    try{
        const { data } = await fetch(`https://api.pruebayerror.com/locaciones/v1/provincia/${province_number}/canton/${canton_number}/distritos`).then(resp => resp.json());
        data.forEach(element => {
            setOptionValue(element, lawyerdistrict);
        });
    }
    catch(error) {
        console.log('Error al obtener los distritos');
        throw error;
    }
}

lawyerstate.addEventListener('change', function(event){
    removeComboOptions(cantons);
    removeComboOptions(district);
    getLawyerCantons(lawyerstate.value);
});

lawyercantons.addEventListener('change', function(event){
    removeComboOptions(district);
    getLawyerDistricts(lawyerstate.value, lawyercantons.value);
});

let typeofid = document.getElementById('typeofid')
const setvisible = () => {
    let section = document.getElementById("legalStuff");
    if (typeofid.value === "juridica"){
        section.classList.remove('visually-hidden')
    }else{
        section.classList.add('visually-hidden')
    }
}

typeofid.addEventListener('change', function(event){setvisible();});

let propertydistrict = document.getElementById("propertydistrict");

const setDesampaDistricts = async () =>{
    try {
        const { data } = await fetch('https://api.pruebayerror.com/locaciones/v1/provincia/1/canton/3/distritos').then(resp => resp.json());
        data.forEach(element => {
            setOptionValue(element, propertydistrict);
        });
    }
    catch(error) {
        console.log('Error al obtener distritos de Desampapa.');
        throw error;
    }
}
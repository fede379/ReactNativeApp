import "isomorphic-fetch";

var locOrientaciones = "http://200.32.52.6:8082/api/localizacionesOrientaciones/?text="
var localizaciones = "http://200.32.52.6:8082/api/localizacion/";
var orientaciones = 'http://200.32.52.6:8082/api/localizacionesOrientaciones?orientaciones='
var orientacion = 'http://200.32.52.6:8082//api/orientacion'
var accentMap = { "ẚ": "a", "Á": "a", "á": "a", "À": "a", "à": "a", "Ă": "a", "ă": "a", "Ắ": "a", "ắ": "a", "Ằ": "a", "ằ": "a", "Ẵ": "a", "ẵ": "a", "Ẳ": "a", "ẳ": "a", "Â": "a", "â": "a", "Ấ": "a", "ấ": "a", "Ầ": "a", "ầ": "a", "Ẫ": "a", "ẫ": "a", "Ẩ": "a", "ẩ": "a", "Ǎ": "a", "ǎ": "a", "Å": "a", "å": "a", "Ǻ": "a", "ǻ": "a", "Ä": "a", "ä": "a", "Ǟ": "a", "ǟ": "a", "Ã": "a", "ã": "a", "Ȧ": "a", "ȧ": "a", "Ǡ": "a", "ǡ": "a", "Ą": "a", "ą": "a", "Ā": "a", "ā": "a", "Ả": "a", "ả": "a", "Ȁ": "a", "ȁ": "a", "Ȃ": "a", "ȃ": "a", "Ạ": "a", "ạ": "a", "Ặ": "a", "ặ": "a", "Ậ": "a", "ậ": "a", "Ḁ": "a", "ḁ": "a", "Ⱥ": "a", "ⱥ": "a", "Ǽ": "a", "ǽ": "a", "Ǣ": "a", "ǣ": "a", "Ḃ": "b", "ḃ": "b", "Ḅ": "b", "ḅ": "b", "Ḇ": "b", "ḇ": "b", "Ƀ": "b", "ƀ": "b", "ᵬ": "b", "Ɓ": "b", "ɓ": "b", "Ƃ": "b", "ƃ": "b", "Ć": "c", "ć": "c", "Ĉ": "c", "ĉ": "c", "Č": "c", "č": "c", "Ċ": "c", "ċ": "c", "Ç": "c", "ç": "c", "Ḉ": "c", "ḉ": "c", "Ȼ": "c", "ȼ": "c", "Ƈ": "c", "ƈ": "c", "ɕ": "c", "Ď": "d", "ď": "d", "Ḋ": "d", "ḋ": "d", "Ḑ": "d", "ḑ": "d", "Ḍ": "d", "ḍ": "d", "Ḓ": "d", "ḓ": "d", "Ḏ": "d", "ḏ": "d", "Đ": "d", "đ": "d", "ᵭ": "d", "Ɖ": "d", "ɖ": "d", "Ɗ": "d", "ɗ": "d", "Ƌ": "d", "ƌ": "d", "ȡ": "d", "ð": "d", "É": "e", "Ə": "e", "Ǝ": "e", "ǝ": "e", "é": "e", "È": "e", "è": "e", "Ĕ": "e", "ĕ": "e", "Ê": "e", "ê": "e", "Ế": "e", "ế": "e", "Ề": "e", "ề": "e", "Ễ": "e", "ễ": "e", "Ể": "e", "ể": "e", "Ě": "e", "ě": "e", "Ë": "e", "ë": "e", "Ẽ": "e", "ẽ": "e", "Ė": "e", "ė": "e", "Ȩ": "e", "ȩ": "e", "Ḝ": "e", "ḝ": "e", "Ę": "e", "ę": "e", "Ē": "e", "ē": "e", "Ḗ": "e", "ḗ": "e", "Ḕ": "e", "ḕ": "e", "Ẻ": "e", "ẻ": "e", "Ȅ": "e", "ȅ": "e", "Ȇ": "e", "ȇ": "e", "Ẹ": "e", "ẹ": "e", "Ệ": "e", "ệ": "e", "Ḙ": "e", "ḙ": "e", "Ḛ": "e", "ḛ": "e", "Ɇ": "e", "ɇ": "e", "ɚ": "e", "ɝ": "e", "Ḟ": "f", "ḟ": "f", "ᵮ": "f", "Ƒ": "f", "ƒ": "f", "Ǵ": "g", "ǵ": "g", "Ğ": "g", "ğ": "g", "Ĝ": "g", "ĝ": "g", "Ǧ": "g", "ǧ": "g", "Ġ": "g", "ġ": "g", "Ģ": "g", "ģ": "g", "Ḡ": "g", "ḡ": "g", "Ǥ": "g", "ǥ": "g", "Ɠ": "g", "ɠ": "g", "Ĥ": "h", "ĥ": "h", "Ȟ": "h", "ȟ": "h", "Ḧ": "h", "ḧ": "h", "Ḣ": "h", "ḣ": "h", "Ḩ": "h", "ḩ": "h", "Ḥ": "h", "ḥ": "h", "Ḫ": "h", "ḫ": "h", H: "h", "̱": "h", "ẖ": "h", "Ħ": "h", "ħ": "h", "Ⱨ": "h", "ⱨ": "h", "Í": "i", "í": "i", "Ì": "i", "ì": "i", "Ĭ": "i", "ĭ": "i", "Î": "i", "î": "i", "Ǐ": "i", "ǐ": "i", "Ï": "i", "ï": "i", "Ḯ": "i", "ḯ": "i", "Ĩ": "i", "ĩ": "i", "İ": "i", i: "i", "Į": "i", "ı": "i", "į": "i", "Ī": "i", "ī": "i", "Ỉ": "i", "ỉ": "i", "Ȉ": "i", "ȉ": "i", "Ȋ": "i", "ȋ": "i", "Ị": "i", "ị": "i", "Ḭ": "i", "ḭ": "i", I: "i", "ı": "i", "Ɨ": "i", "ɨ": "i", "Ĵ": "j", "ĵ": "j", J: "j", "̌": "j", "ǰ": "j", "ȷ": "j", "Ɉ": "j", "ɉ": "j", "ʝ": "j", "ɟ": "j", "ʄ": "j", "Ḱ": "k", "ḱ": "k", "Ǩ": "k", "ǩ": "k", "Ķ": "k", "ķ": "k", "Ḳ": "k", "ḳ": "k", "Ḵ": "k", "ḵ": "k", "Ƙ": "k", "ƙ": "k", "Ⱪ": "k", "ⱪ": "k", "Ĺ": "a", "ĺ": "l", "Ľ": "l", "ľ": "l", "Ļ": "l", "ļ": "l", "Ḷ": "l", "ḷ": "l", "Ḹ": "l", "ḹ": "l", "Ḽ": "l", "ḽ": "l", "Ḻ": "l", "ḻ": "l", "Ł": "l", "ł": "l", "Ł": "l", "̣": "l", "ł": "l", "̣": "l", "Ŀ": "l", "ŀ": "l", "Ƚ": "l", "ƚ": "l", "Ⱡ": "l", "ⱡ": "l", "Ɫ": "l", "ɫ": "l", "ɬ": "l", "ɭ": "l", "ȴ": "l", "Ḿ": "m", "ḿ": "m", "Ṁ": "m", "ṁ": "m", "Ṃ": "m", "ṃ": "m", "ɱ": "m", "Ń": "n", "ń": "n", "Ǹ": "n", "ǹ": "n", "Ň": "n", "ň": "n", "Ñ": "n", "ñ": "n", "Ṅ": "n", "ṅ": "n", "Ņ": "n", "ņ": "n", "Ṇ": "n", "ṇ": "n", "Ṋ": "n", "ṋ": "n", "Ṉ": "n", "ṉ": "n", "Ɲ": "n", "ɲ": "n", "Ƞ": "n", "ƞ": "n", "ɳ": "n", "ȵ": "n", N: "n", "̈": "n", n: "n", "̈": "n", "Ó": "o", "ó": "o", "Ò": "o", "ò": "o", "Ŏ": "o", "ŏ": "o", "Ô": "o", "ô": "o", "Ố": "o", "ố": "o", "Ồ": "o", "ồ": "o", "Ỗ": "o", "ỗ": "o", "Ổ": "o", "ổ": "o", "Ǒ": "o", "ǒ": "o", "Ö": "o", "ö": "o", "Ȫ": "o", "ȫ": "o", "Ő": "o", "ő": "o", "Õ": "o", "õ": "o", "Ṍ": "o", "ṍ": "o", "Ṏ": "o", "ṏ": "o", "Ȭ": "o", "ȭ": "o", "Ȯ": "o", "ȯ": "o", "Ȱ": "o", "ȱ": "o", "Ø": "o", "ø": "o", "Ǿ": "o", "ǿ": "o", "Ǫ": "o", "ǫ": "o", "Ǭ": "o", "ǭ": "o", "Ō": "o", "ō": "o", "Ṓ": "o", "ṓ": "o", "Ṑ": "o", "ṑ": "o", "Ỏ": "o", "ỏ": "o", "Ȍ": "o", "ȍ": "o", "Ȏ": "o", "ȏ": "o", "Ơ": "o", "ơ": "o", "Ớ": "o", "ớ": "o", "Ờ": "o", "ờ": "o", "Ỡ": "o", "ỡ": "o", "Ở": "o", "ở": "o", "Ợ": "o", "ợ": "o", "Ọ": "o", "ọ": "o", "Ộ": "o", "ộ": "o", "Ɵ": "o", "ɵ": "o", "Ṕ": "p", "ṕ": "p", "Ṗ": "p", "ṗ": "p", "Ᵽ": "p", "Ƥ": "p", "ƥ": "p", P: "p", "̃": "p", p: "p", "̃": "p", "ʠ": "q", "Ɋ": "q", "ɋ": "q", "Ŕ": "r", "ŕ": "r", "Ř": "r", "ř": "r", "Ṙ": "r", "ṙ": "r", "Ŗ": "r", "ŗ": "r", "Ȑ": "r", "ȑ": "r", "Ȓ": "r", "ȓ": "r", "Ṛ": "r", "ṛ": "r", "Ṝ": "r", "ṝ": "r", "Ṟ": "r", "ṟ": "r", "Ɍ": "r", "ɍ": "r", "ᵲ": "r", "ɼ": "r", "Ɽ": "r", "ɽ": "r", "ɾ": "r", "ᵳ": "r", "ß": "s", "Ś": "s", "ś": "s", "Ṥ": "s", "ṥ": "s", "Ŝ": "s", "ŝ": "s", "Š": "s", "š": "s", "Ṧ": "s", "ṧ": "s", "Ṡ": "s", "ṡ": "s", "ẛ": "s", "Ş": "s", "ş": "s", "Ṣ": "s", "ṣ": "s", "Ṩ": "s", "ṩ": "s", "Ș": "s", "ș": "s", "ʂ": "s", S: "s", "̩": "s", s: "s", "̩": "s", "Þ": "t", "þ": "t", "Ť": "t", "ť": "t", T: "t", "̈": "t", "ẗ": "t", "Ṫ": "t", "ṫ": "t", "Ţ": "t", "ţ": "t", "Ṭ": "t", "ṭ": "t", "Ț": "t", "ț": "t", "Ṱ": "t", "ṱ": "t", "Ṯ": "t", "ṯ": "t", "Ŧ": "t", "ŧ": "t", "Ⱦ": "t", "ⱦ": "t", "ᵵ": "t", "ƫ": "t", "Ƭ": "t", "ƭ": "t", "Ʈ": "t", "ʈ": "t", "ȶ": "t", "Ú": "u", "ú": "u", "Ù": "u", "ù": "u", "Ŭ": "u", "ŭ": "u", "Û": "u", "û": "u", "Ǔ": "u", "ǔ": "u", "Ů": "u", "ů": "u", "Ü": "u", "ü": "u", "Ǘ": "u", "ǘ": "u", "Ǜ": "u", "ǜ": "u", "Ǚ": "u", "ǚ": "u", "Ǖ": "u", "ǖ": "u", "Ű": "u", "ű": "u", "Ũ": "u", "ũ": "u", "Ṹ": "u", "ṹ": "u", "Ų": "u", "ų": "u", "Ū": "u", "ū": "u", "Ṻ": "u", "ṻ": "u", "Ủ": "u", "ủ": "u", "Ȕ": "u", "ȕ": "u", "Ȗ": "u", "ȗ": "u", "Ư": "u", "ư": "u", "Ứ": "u", "ứ": "u", "Ừ": "u", "ừ": "u", "Ữ": "u", "ữ": "u", "Ử": "u", "ử": "u", "Ự": "u", "ự": "u", "Ụ": "u", "ụ": "u", "Ṳ": "u", "ṳ": "u", "Ṷ": "u", "ṷ": "u", "Ṵ": "u", "ṵ": "u", "Ʉ": "u", "ʉ": "u", "Ṽ": "v", "ṽ": "v", "Ṿ": "v", "ṿ": "v", "Ʋ": "v", "ʋ": "v", "Ẃ": "w", "ẃ": "w", "Ẁ": "w", "ẁ": "w", "Ŵ": "w", "ŵ": "w", W: "w", "̊": "w", "ẘ": "w", "Ẅ": "w", "ẅ": "w", "Ẇ": "w", "ẇ": "w", "Ẉ": "w", "ẉ": "w", "Ẍ": "x", "ẍ": "x", "Ẋ": "x", "ẋ": "x", "Ý": "y", "ý": "y", "Ỳ": "y", "ỳ": "y", "Ŷ": "y", "ŷ": "y", Y: "y", "̊": "y", "ẙ": "y", "Ÿ": "y", "ÿ": "y", "Ỹ": "y", "ỹ": "y", "Ẏ": "y", "ẏ": "y", "Ȳ": "y", "ȳ": "y", "Ỷ": "y", "ỷ": "y", "Ỵ": "y", "ỵ": "y", "ʏ": "y", "Ɏ": "y", "ɏ": "y", "Ƴ": "y", "ƴ": "y", "Ź": "z", "ź": "z", "Ẑ": "z", "ẑ": "z", "Ž": "z", "ž": "z", "Ż": "z", "ż": "z", "Ẓ": "z", "ẓ": "z", "Ẕ": "z", "ẕ": "z", "Ƶ": "z", "ƶ": "z", "Ȥ": "z", "ȥ": "z", "ʐ": "z", "ʑ": "z", "Ⱬ": "z", "ⱬ": "z", "Ǯ": "z", "ǯ": "z", "ƺ": "z", "２": "2", "６": "6", "Ｂ": "B", "Ｆ": "F", "Ｊ": "J", "Ｎ": "N", "Ｒ": "R", "Ｖ": "V", "Ｚ": "Z", "ｂ": "b", "ｆ": "f", "ｊ": "j", "ｎ": "n", "ｒ": "r", "ｖ": "v", "ｚ": "z", "１": "1", "５": "5", "９": "9", "Ａ": "A", "Ｅ": "E", "Ｉ": "I", "Ｍ": "M", "Ｑ": "Q", "Ｕ": "U", "Ｙ": "Y", "ａ": "a", "ｅ": "e", "ｉ": "i", "ｍ": "m", "ｑ": "q", "ｕ": "u", "ｙ": "y", "０": "0", "４": "4", "８": "8", "Ｄ": "D", "Ｈ": "H", "Ｌ": "L", "Ｐ": "P", "Ｔ": "T", "Ｘ": "X", "ｄ": "d", "ｈ": "h", "ｌ": "l", "ｐ": "p", "ｔ": "t", "ｘ": "x", "３": "3", "７": "7", "Ｃ": "C", "Ｇ": "G", "Ｋ": "K", "Ｏ": "O", "Ｓ": "S", "Ｗ": "W", "ｃ": "c", "ｇ": "g", "ｋ": "k", "ｏ": "o", "ｓ": "s", "ｗ": "w" };
 
const normalize = ( term ) => {
    var ret = "";
    for ( var i = 0; i < term.length; i++ ) {ret += accentMap[ term.charAt(i) ] || term.charAt(i);}
    return ret.toLowerCase();
};

const getIdsOrientaciones = (result, palabra) => {
  palabra = normalize(palabra);
  let auxOrientacion=[];
  result.forEach(function(v, index, initial_array) {
    auxOrientacion.push(v.id)
      });
      console.log(auxOrientacion)
      return auxOrientacion;
}

const getIdsCueAnexos = (result) => {
    // palabra = normalize(palabra);
    let auxCueAnexos=[];
    result.forEach(function(v, index, initial_array) {
        auxCueAnexos.push(v.id)
        });
        console.log(auxCueAnexos)
        return auxCueAnexos;
  }

const clear = (palabras)=>{
    let aux = [];
    palabras.split(" ").forEach(unaPalabra => {if(unaPalabra.length>=4){aux.push(unaPalabra);}});
    return aux.join();
}

const mergearEscuelas = (localizacionesOrientaciones, localizaciones)=>{
    // let cueAnexos=stringCueAnexos(localizacionesOrientaciones);
    let all = [];
    localizacionesOrientaciones.forEach(locOri => {
        let auxLoc = {};
        localizaciones.forEach(localizacion=> {
            if(locOri.id==localizacion.id){
                auxLoc = localizacion;
                auxLoc.orientaciones = locOri.orientaciones;
                all.push(auxLoc);
            }
        });
    });
    return all;
}

const filtrarEntrada = (result, palabra) => {
    palabra = normalize(palabra).split(',').join('|')
    console.log(palabra)
    let auxEstab=[];
    result.forEach(function(v, index, initial_array) {
        let auxOrientacion=[];
        let flagEstab = false;
        v.orientaciones.forEach(function(o, index, initial_array) {
            if (new RegExp(palabra).test(normalize(o.nombre))) {
                //al menos una coincidencia
                flagEstab=true;auxOrientacion.push(o);
                console.log(auxOrientacion)
            }
    });
    if(flagEstab){v.orientaciones = auxOrientacion;auxEstab.push(v);}
    });
    console.log(auxEstab)
    return auxEstab;
}

const checkUrl = (url) => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (regex.test(url)) {
        var http = /^http?:\//
        var regexhttp = RegExp(http)
        var http2 = /^http?:\/\//
        var regexhttp2 = RegExp(http2)
        var https = /^https?:\/\//
        var regexhttps = RegExp(https)

        if(regexhttps.test(url)){
            url = url.replace(/^https?:\/\//,'')
            console.log('https://')
        }

        if(regexhttp2.test(url)){
            url = url.replace(/^http?:\/\//,'')
            console.log('http://')
        }

        if(regexhttp.test(url)){
            url = url.replace(/^http?:\//,'')
            console.log('http:/')
        }

        return url
    }
    return 'No disponible'
}


const buscar = (palabras) => {
    let terminos = clear(palabras)
    let uri = orientacion + '?regex=' + terminos//ej: prodesorado de musica => profesorado,musica
    //primera peticion
    fetch(
            uri
        )
    .then(response => response.json())
    .then(responseJson => {
        // console.log('resultado ' + JSON.stringify(responseJson, null, 2));
        //obtengo el id de las orientaciones
        let oriBuscadas = getIdsOrientaciones(responseJson, palabras);
        console.log("***********")
        // console.log(oriBuscadas)
        buscarCues(oriBuscadas)
    })
    .catch((error) => {
        console.log('error1...',error)
    })

    //segunda peticion
    //busco los id de cue-anexos
    const buscarCues = (oriBuscadas) => {
        // console.log(orientaciones+oriBuscadas.toString())
        fetch(
            orientaciones+oriBuscadas.toString()
         )
        .then(response => response.json())
        .then(newResponseJson => {
            // console.log("new response " + JSON.stringify(newResponseJson, null, 2))
            //ACA tengo que filtrar la respuestaJson y dejar solo las orientaciones buscadas
            var locSoloConOriBuscadas = filtrarEntrada(newResponseJson, terminos);
            // console.log(locSoloConOriBuscadas)
            let idCueAnexos = getIdsCueAnexos(newResponseJson)
            // console.log(idCueAnexos)
            buscarInfoCues(locSoloConOriBuscadas,idCueAnexos)
        })
        .catch((error) => {
            console.log('error2...',error)
        })
        
    }
    
    //tercera peticion
    const buscarInfoCues = (locSoloConOriBuscadas,idCueAnexos) => {
    // console.log(localizaciones+'?ids='+idCueAnexos)
        fetch(
            localizaciones+'?ids='+idCueAnexos
        )
        .then(response => response.json())
        .then(cueAnexosResponseJson => {
            // console.log(cueAnexosResponseJson)
            let allSchools = mergearEscuelas(locSoloConOriBuscadas, cueAnexosResponseJson);
            // console.log("all schools" + JSON.stringify(allSchools, null, 2))

            //busco establecimientos cercanos
            if(true){
                filtrarCercanos(allSchools, -58.0761744490859,-29.7841446644321, 70)
            }

            prepararSalida(allSchools)
        })
        .catch((error) => {
            console.log('error3...',error)
        }) 

    }

    const filtrarCercanos = (allSchools, long, lat, distancia) => {
        fetch(
            localizaciones+'near/'+long+','+lat+'/'+distancia
        )
        .then(response => response.json())
        .then(cercanos =>{
            // console.log("establecimientos cercanos" + JSON.stringify(cercanos.content, null, 2))
            let cercanosId = [];
            cercanos.content.forEach(function (v, index, initial_array) {
                // console.log(v.content.id)
                cercanosId.push(v.content.id)
            })
            // cercanosId = ['180039800', '180098400']
            // console.log(allSchools)
            // console.log(cercanosId)

            var filtrado = allSchools.filter(function(item) {
                // console.log(item.id)
                return cercanosId.indexOf(item.id) !== -1;
            });
            // console.log(filtrado)

        })
        .catch((error) => {
            console.log('error3...',error)
        }) 
    }

    //cargar listado escuela (armo un nuevo json con los datos a mostrar)
    const prepararSalida = (allSchools) => {
        let aux = []
        allSchools.forEach(function(escuela, indice, inicial){
            escuela.orientaciones.forEach(function(orientacion,ind,init){
                let item = {};
                item.id = escuela.id
                item.nombre = escuela.nombre
                item.orientacion = orientacion.nombre
                item.localidad = escuela.domicilio.localidad.nombre
                item.departamento = escuela.domicilio.localidad.departamento.nombre
                item.latitud = escuela.domicilio.position[1], // lat
                item.longitud = escuela.domicilio.position[0], // long
                item.sitioWeb = checkUrl(escuela.sitioWeb.toString()),
                item.calle = (escuela.domicilio.calle != '' ? escuela.domicilio.calle : 'No disponible') 
                            +' '+ (!!escuela.domicilio.nro ? escuela.domicilio.nro : '') //escuela.domicilio.nro,
                item.mail = escuela.email,
                item.telefono = escuela.telefonoCodArea + escuela.telefono,
                aux.push(item)            
            })
        })
    }
}

buscar('informatica')

// async function buscar(palabras) {
//     let terminos = clear(palabras)
//     let uri = orientacion+'?regex='+terminos//ej: prodesorado de musica => profesorado,musica
//     console.log(uri)
//     //primera peticion
//     try {
//         let response = await fetch(
//             uri         
//         );
//         let responseJson = await response.json();
//         console.log(responseJson)
//         //obtengo el id de las orientaciones
//         let oriBuscadas = getIdsOrientaciones(responseJson, palabras);
//         console.log(oriBuscadas)

//         //segunda peticion
//         //busco los id de cue-anexos
//         try{ 
//             console.log(orientaciones+oriBuscadas.toString())
//             let newResponse = await fetch(
//                 orientaciones+oriBuscadas.toString()
//             );
//             let newResponseJson = await newResponse.json();
//             console.log(newResponseJson)
            
//             //ACA tengo que filtrar la respuestaJson y dejar solo las orientaciones buscadas
//             var locSoloConOriBuscadas = filtrarEntrada(newResponseJson, terminos);
//             console.log(locSoloConOriBuscadas)
            
//             let idCueAnexos = getIdsCueAnexos(newResponseJson)
//             console.log(idCueAnexos)
//             //tercera peticion
//             try{
//                 console.log(localizaciones+'?ids='+idCueAnexos)
//                 let cueAnexosResponse = await fetch(
//                         localizaciones+'?ids='+idCueAnexos
//                     );
//                 let cueAnexosResponseJson = await cueAnexosResponse.json();
//                 console.log(cueAnexosResponseJson)
//                 let allSchools = mergearEscuelas(locSoloConOriBuscadas, cueAnexosResponseJson);
//                 console.log(allSchools)
//             } catch (error3){
//                 console.error(error3);
//             }
//         } catch (error2){
//             console.error(error2);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }


// *********************/

// function getMoviesFromApi(text) {
//     try {
//      fetch(
//           'http://200.32.52.6:8082/api/orientacion?regex='+text
//       ).then((response) => response.json())
//       .then((responseJson) => {
//         console.log(responseJson)
//       })
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getMoviesFromApi('lengua')


// fetch('http://200.32.52.6:8082/api/localizacion/superior/lengua').then(function(response) {
    //     if(response.ok) {
        //             console.log(response)
        //        } else {
            //       console.log('Network response was not ok.');
            //     }
            //   })
            //   .catch(function(error) {
                //     console.log('There has been a problem with your fetch operation: ' + error.message);
                //   });


Habilitar telefono


It's likely that the device is no longer authorized on ADB for whatever reason.

1. Check if authorized:

<ANDROID_SDK_HOME>\platform-tools>adb devices
List of devices attached
4df798d76f98cf6d        unauthorized
2. Revoke USB Debugging on phone

If the device is shown as unauthorized, go to the developer options on the phone and click "Revoke USB debugging authorization" (tested with JellyBean & Samsung GalaxyIII).

3. Restart ADB Server:

Then restarted adb server

adb kill-server
adb start-server
4. Reconnect the device

The device will ask if you are agree to connect the computer id. You need to confirm it.

5. Now Check the device

It is now authorized!

adb devices
<ANDROID_SDK_HOME>\platform-tools>adb devices
List of devices attached
4df798d76f98cf6d        device


si tira error:

This issue helped me resolve the problem in following steps.

(in project directory) mkdir android/app/src/main/assets

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

react-native run-android


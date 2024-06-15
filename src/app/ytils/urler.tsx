
const getValueFromUrl = (valKey) =>{
    var params = urlToParam()
    console.log(params)
   return  params[valKey]

}

const pathVars = ()=>{
    if (location.href.includes("?")){return location.href.split("?")[1]} 
    else{return ""}
}

const noVarsPath = () =>{
    if (location.href.includes("?")){return location.href.split("?")[0]} 
    else{return location.href}
}

const urlToParam = () =>{
    var pathv = pathVars()
    console.log(pathv)
    if (pathv.includes("=")){
    var data:Array<String> = pathv.split("&") 
    var param = {}
    for(const val of data){
     var values = val.split("=")
     param[values[0]] = values[1]
 }
 return param}
 else{return {}}
}

const paramToUrl = (params) => {
    var path = "?"
    var vars = []
    console.log(params)
    for(const  [k,v] of Object.entries(params) ) {
        vars.push(`${k}=${v}`)
    }
    return path + vars.join("&")

}

const setPathValue = (k,v) =>{
    var par = urlToParam()
    par[k] = v
    console.log(par)
    return paramToUrl(par)
}


export {getValueFromUrl,urlToParam,paramToUrl,setPathValue,pathVars,noVarsPath}
/**
 * @param {Nom de la zone de stockage: exemple ( name )} name 
 * @param {Valeur initial, si aucune n'est present c'est celle qui sera stocker de base (Array,number,string,object,...): exemple ( Jean-mich )} ini
 * @returns 
 */
export function Get(name, ini) {
    let data = localStorage.getItem(name);

    if (data !== null) {
        return JSON.parse(data);
    } else {
        localStorage.setItem(name, JSON.stringify(ini));
        return JSON.parse(localStorage.getItem(name));
    }
}

/**
 * @param {Nom de la zone de stockage: exemple ( name )} name 
 * @param {Valeur a stocker (Array,number,string,object,...): exemple ( Jean-mich )} value 
 * @returns 
 */
export function Set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
    return JSON.parse(localStorage.getItem(name));
}

//Created by Styloxis
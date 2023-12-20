import { EventProperty } from "./EventProperty";
export class EventState{


    public id:string
    public name:string
    public properties:EventProperty[]
    public difficulty:number
    // 0 : easy
    // 1 : medium
    // 2 : hard
    
    /**
     *
     */
    constructor(id:string, name:string, properties:EventProperty[], difficulty:number) {
        this.id = id
        this.name = name
        this.properties = properties
        this.difficulty = difficulty
    }

    public getValueOf(name:string):unknown{
        const property = this.properties.find(property => property.name === name)
        if(property){
            return property.value
        }
        throw Error("Property " + name +" not found")
    }

    public getProperty(name:string):EventProperty{
        const property = this.properties.find(property => property.name === name)
        if(property){
            return property
        }
        throw Error("Property " + name +" not found")
    }    
}
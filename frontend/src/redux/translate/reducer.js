import { arblanguage, englanguage } from "./type"

const initialstate={
    language:"en"
}
export const lanreducer=(state=initialstate,action)=>{

    switch(action.type){
        case englanguage:
            return {
                ...state,language:englanguage
            };
            case arblanguage:
                return{
              ...state,language:arblanguage
                }
                default:
                    return state
    }
}
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import es from "date-fns/locale/es";

export const getFormatDistanceToNow = (date:number) =>{

    const fromNow = formatDistanceToNow( date, { locale: es } )

    return fromNow
}
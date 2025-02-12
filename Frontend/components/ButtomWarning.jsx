import {Link} from "react-router-dom"

export function ButtonWarning({label,buttonText,to}){
    return <div className="text-sm py-4">
        <span>
        {label}
        </span>
        <Link className="cursor-pointer text-decoration-line: underline font-medium " to={to}>{buttonText}</Link>
    </div>
}
export function InputBox({label,placeholder,onChange ,value}){
return <div>
    <div  className="text-sm font-medium text-left py-2">{label}</div>
    <input value={value} onChange={onChange} placeholder={placeholder} id="info" className="w-full px-2 py-1 border rounded border-slate-200"/>
</div>
}
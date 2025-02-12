
export function SendMoneyName({firstname , lastname}){
  
     return  <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{firstname[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{firstname} {lastname} </h3>
                </div>
    </div>
}
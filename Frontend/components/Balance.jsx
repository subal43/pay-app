import React, { useState, useEffect } from "react";
import axios from "axios";

export function Balance() {
  const [amount, setAmount] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const Token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/api/v1/user/balance", {
          Token,
        });
        const FormatAmount = parseFloat(response.data.balance).toFixed(2);
        setAmount(FormatAmount); 
        setLoading(false); 
      } catch (err) {
        setError(err); 
        setLoading(false);
      }
    };

    fetchBalance();
  }, []); 

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-14 flex items-center">
        
            <div className="font-bold text-lg ml-6">
                Your balance
            </div>
            <div className="ml-4">
                Rs {amount}
            </div>
        
    </div>
  );
}

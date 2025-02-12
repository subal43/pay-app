import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Check() {
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            const Token = localStorage.getItem("token");

            try {
                const response = await axios.post("http://localhost:3000/api/v1/user/me", {
                    Token,
                });

                if (response.status === 200) {
                    navigate("/dashboard");
                } else {
                    navigate("/signin");
                }
            } catch (error) {
                console.error("Error during token validation:", error);
                navigate("/signin"); 
            }
        };

        validateToken();
    }, [navigate]);

    return null;
}

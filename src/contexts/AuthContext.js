import { useContext, createContext, useState } from 'react'

const AuthContext = createContext(null)

//   Custom hook - used to access Auth info
export function useAuth() {
  const value = useContext(AuthContext) // From value={} in AuthContext.Provider below
  return value;
}

export function AuthProvider(props){

  const [authenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider
            value={{ 
                // Sharing the 'authenticated' state and onAuth function with children
                authenticated,
                onAuthenticated: (auth, token) => {
                    setAuthenticated(auth);
                
                    // Only is authenticated, stores token in local storage so persists on page refresh
                    if (auth) {
                      localStorage.setItem("token", token);
                    } else {
                      localStorage.removeItem("token");
                    }
                  }
             }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}